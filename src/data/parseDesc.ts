import { attributionText } from './renderDesc';

export const parseDescLimits = [
  'Expects fixed width horizontal line at the top and bottom.',
  'Expects the same corner character in all corners.',
  'Body text lines should start with word characters and/or whitespace, or have a vertical seperator at the start and end.',
  'Supports vertical seperators, but expects the same one to be used for outer borders and column seperators.',
  'Expects only one table section.',
  'Expects \':\' to seperate labels from values in the table.',
  'Seperators cannot be letters/numbers.',
];

// WARNING: this file is all AI vibes and probably falls apart on wild data.
// TODO for desc parser:
// * hide UI (expandable)
// * automated testing?
// * more manual testing, find edge cases.
// * add more features.

/**
 * This attempts to parse formatted text description into the syntax used by this tool. The intent is so users can paste their full description and make quick changes.
 * @param totalText Input text in format similar to this tool or others.
 * @returns Fully parsed description sections.
 */
export function tryParseDesc(totalText: string): IDesc | undefined {
  if (!totalText || totalText.trim() === '') return undefined;

  const rawLines = totalText.split(/\r?\n/);
  // Remove trailing empty lines
  while (rawLines.length > 0 && rawLines[rawLines.length - 1].trim() === '') {
    rawLines.pop();
  }
  if (rawLines.length < 2) return undefined;

  const firstLine = rawLines[0];
  const width = firstLine.length;
  const corner = firstLine[0];
  const useBorderHorizontal = firstLine.length > 1 && firstLine[0] === firstLine[width - 1];

  // Extract horizontal pattern
  const middleH = firstLine.slice(1, -1);
  const borderPatternHorizontal = getRepeatingPattern(middleH);

  // Attribution check on last line
  const lastLine = rawLines[rawLines.length - 1];
  const includeAttribution = lastLine.includes(attributionText);

  // Vertical border detection
  let borderPatternVertical = '';
  let useBorderVertical = false;
  for (let i = 1; i < rawLines.length - 1; i++) {
    const l = rawLines[i];
    if (l.length === width && l[0] !== ' ' && l[0] === l[width - 1] && !isProbablyHBorder(l, corner)) {
      borderPatternVertical = l[0];
      useBorderVertical = true;
      break;
    }
  }

  const sections: (IBodySection | IItemsSection)[] = [];
  let currentBlock: string[] = [];

  for (let i = 1; i < rawLines.length; i++) {
    const line = rawLines[i];
    const isHBorder = line.length === width && line[0] === corner && line[width - 1] === corner && isProbablyHBorder(line, corner);

    if (isHBorder || i === rawLines.length - 1) {
      if (currentBlock.length > 0) {
        sections.push(parseBlock(currentBlock, useBorderVertical, borderPatternVertical));
        currentBlock = [];
      }
    } else {
      currentBlock.push(line);
    }
  }

  const output = {
    sections,
    width,
    borderPatternHorizontal,
    borderPatternCorner: corner,
    borderPatternVertical: borderPatternVertical || undefined,
    borderPatternColumn: borderPatternVertical || undefined,
    useBorderHorizontal,
    useBorderVertical,
    includeAttribution,
  };

  console.log(output);
  return output;
}

function getRepeatingPattern(s: string): string {
  if (!s) return '';
  for (let i = 1; i <= s.length; i++) {
    const pattern = s.slice(0, i);
    const repeated = pattern.repeat(Math.ceil(s.length / i)).slice(0, s.length);
    if (repeated === s) {
      return pattern;
    }
  }
  return s;
}

function isProbablyHBorder(line: string, corner: string): boolean {
  const content = line.slice(1, -1);
  if (content.length === 0) return true;
  if (line.includes(attributionText)) return true;
  const alphanumericCount = (content.match(/[a-z0-9]/gi) || []).length;
  return alphanumericCount < content.length * 0.1;
}

function parseBlock(block: string[], useBorderVertical: boolean, vSep: string): IBodySection | IItemsSection {
  const cleanedLines = block.map(line => {
    if (useBorderVertical && line.startsWith(vSep) && line.endsWith(vSep)) {
      return line.slice(vSep.length + 1, -vSep.length - 1);
    }
    return line;
  });

  const nonEmptyLines = cleanedLines.filter(l => l.trim() !== '');
  const colonLines = nonEmptyLines.filter(l => l.includes(':'));

  if (colonLines.length > 0 && colonLines.length >= nonEmptyLines.length * 0.8) {
    const items: IItemsSectionItem[] = [];
    let maxCols = 0;

    cleanedLines.forEach(line => {
      if (line.trim() === '') return;
      const sep = vSep ? ` ${vSep} ` : '  ';
      const parts = line.split(sep);
      maxCols = Math.max(maxCols, parts.length);

      parts.forEach(p => {
        const colonIdx = p.indexOf(':');
        if (colonIdx !== -1) {
          items.push({
            name: p.slice(0, colonIdx).trim(),
            value: p.slice(colonIdx + 1).trim(),
          });
        }
      });
    });

    return { type: 'section', columns: maxCols, items };
  } else {
    const text = cleanedLines.map(l => l.trimEnd()).join('\n').trim();
    return { type: 'body', text };
  }
}

/*
For reference, this is a rendered example desc using the defaults seen in `data/descDefaults.ts`:

*-~-~-._,-~-~-._,-~-~-._,-~-~-._,-~-~-._,-~-~-._,-~-~-._,-~-~-._,-~-~-._,-~-~-*
    This is a character description.  The first paragraph should probably mention important things like height and predominant coloring first so you know what you're looking at, but it can also include some overall notes on style and demeanor.

    The middle of the description might be a top to bottom tour of the character's physical or presenting appearance.  Clothes and a more detailed look at the shape of their figure is a great thing to include here.  Descriptions work best in two to four paragraphs, but it should fit within a 'page' overall.

    Indenting each paragraph can help readability.  Do not line-wrap the text manually, instead let each paragraph be its own line so the other user's client can wrap to their preferred width.

    The last paragraph is usually a bit of summary and almost always mentions the more luscious and alluring traits that often require similes like fruit and sports balls as size references.  Descriptions are fun!

    Pic links could go here if you have any!
*-~-~-._,-~-~-._,-~-~-._,-~-~-._,-~-~-._,-~-~-._,-~-~-._,-~-~-._,-~-~-._,-~-~-*
| NAME: Char        | SPECIES: Fox   | SEX : Femme                            |
| AGE : 26          | EYES   : Green | FUR : Blaze orange                     |
| HAIR: Natural fur | HEIGHT : 5'10" | TAIL: Swishy                           |
*-~-~-._,-~-~-._,-~-~-._,-~-~-._,-~-~-._,-~-~-._,-~-~-._,-~-~-._,-~-~-._,-~-~-*
| Shirt: Bright pink tank top.                                                |
| Pants: Cut-off jean shorts.                                                 |
| Shoes: Toeless digitigrade sneakers.                                        |
*-~-~-._,-~-~-._,-~-~-._,-~-~-._,-~-~-._,-[formatted at kspdrgn.github.io]~-~-*

*/
