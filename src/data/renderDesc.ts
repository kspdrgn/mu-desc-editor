const defaultWidth = 79;
const attributionText = '[created by mu-desc-editor]';

/** Render description into text. */
export function renderDesc(desc: IDesc): string {
  let s = '';
  s += renderBorderHorizontal(desc);
  for (let i = 0; i < desc.sections.length; i++) {
    const section = desc.sections[i];
    if (section.type === 'body')
      s += renderBodySection(desc, section);
    if (section.type === 'section')
      s += renderItemsSection(desc, section);
    const isLastSection = i === desc.sections.length - 1;
    s += renderBorderHorizontal(desc, isLastSection);
  }
  return s;
}

/** Render a body section, single paragraph (may contain its own lines). No columns. Maybe borders. */
function renderBodySection(desc: IDesc, section: IBodySection) {
  // no wrap.
  if (!section.forceWrap || !section.text?.length)
    return section.text + '\n';

  // wrap body within vertical border.
  const borderWidth = desc.useBorderVertical
    ? (desc.borderPatternVertical?.length ?? 0) + 1
    : 0;
  const bodyWidth = (desc.width ?? defaultWidth) - borderWidth * 2;
  const border = desc.useBorderVertical && desc.borderPatternVertical?.length
    ? desc.borderPatternVertical
    : undefined;

  return wrapMultipleLinesOfTextOnWordsMaybeWithBordersToo(section.text, bodyWidth, border);
}

function renderItemsSection(desc: IDesc, section: IItemsSection) {
  const numColumns = +(section.columns ?? 1);
  const columnSepWidth = desc.borderPatternColumn?.length ?? 0;
  const useColumnSep = columnSepWidth > 0;

  // Compute width of labels to put the ':' separator vertically aligned per column.
  const columnLabelWidth = getColumnPadWidth(section, i => i.name);

  // Compute width of values to figure out where to put the separator per column. Separators occur ASAP after content, they are not using fixed/ideal width.
  const columnValueWidth = getColumnPadWidth(section, i => i.value);

  // Render each row one at a time. Items are drawn from left to right, and padded with spaces to fit the column width.
  let result = '';
  for (let i = 0; i < section.items.length; i += numColumns) {
    let line = '';

    if (desc.useBorderVertical)
      line += desc.borderPatternVertical + ' ';

    for (let col = 0; col < numColumns; col++) {
      const item = section.items[i + col];
      if (!item)
        continue;

      const labelWidth = columnLabelWidth[col];
      const valueWidth = columnValueWidth[col];
      const itemText = `${item.name.padEnd(labelWidth)}: ${item.value.padEnd(valueWidth)}`;

      line += itemText;
      line += useColumnSep && col < numColumns - 1
        ? ` ${desc.borderPatternColumn} `
        : '';
    }

    // TODO: pad right border out to width, and ignore if already past width.
    if (desc.useBorderVertical && desc.borderPatternVertical?.length) {
      const w = desc.width ?? defaultWidth;
      const b = desc.borderPatternVertical.length + 1;
      if (line.length < w - b)
        line = line.padEnd(w - b) + ' ' + desc.borderPatternVertical;
    }

    line += '\n';
    result += line;

  }
  return result;
}

/** Compute max width of a single column. Can target label or value of the section item. For aligning the ':' seperator. */
function getColumnPadWidth(section: IItemsSection, valueSelector: (item: IItemsSectionItem) => string) {
  const widths: number[] = [];
  const numColumns = +(section.columns ?? 1);
  for (let col = 0; col < numColumns; col++) {
    let width = 0;
    for (let j = col; j < section.items.length; j += numColumns) {
      const item = section.items[j];
      const value = valueSelector(item);
      const len = value.length;
      if (len > width)
        width = len;
    }
    widths.push(width);
  }
  return widths;
}

/** Draw a horizontal border with optional corner decoration. */
function renderBorderHorizontal(desc: IDesc, isLastLine = false) {
  if (!desc.useBorderHorizontal || !desc.borderPatternHorizontal?.length)
    return '';
  const corner = desc.borderPatternCorner ?? '';
  const pattern = desc.borderPatternHorizontal ?? '-';
  const width = desc.width ?? defaultWidth;
  const fillWidth = width - (2 * corner.length);
  let middle = repeatStringToWidth(pattern, fillWidth);

  // attribution.
  const attributionDistFromRight = 4;
  if (isLastLine && desc.includeAttribution && attributionText?.length && middle.length > attributionText.length + attributionDistFromRight) {
    //middle = insertStringInString(middle, attributionText, fillWidth, distFromRight);
    const startIndex = middle.length - attributionText.length - attributionDistFromRight;
    middle = middle.slice(0, startIndex) + attributionText + middle.slice(startIndex + attributionText.length);
  }

  return corner + middle + corner + '\n';
}

/** Fill target width with the given string, chopping leftovers. */
function repeatStringToWidth(s: string, fillWidth: number) {
  let result = '';
  let len = 0;
  while (len < fillWidth) {
    const add = s.length <= fillWidth - len
      ? s
      : s.substring(0, fillWidth - len);
    result += add;
    len += add.length;
  }
  return result;
}

/** Wrap text to a target width and sandwich between vertical borders. This handles multiple lines (body text). */
function wrapMultipleLinesOfTextOnWordsMaybeWithBordersToo(text: string, targetWidth: number, borderPatternVertical?: string) {
  // Since the other function only works on single lines, just use it on each line seperately.
  const lines = text.split('\n');
  let result = '';
  for (const line of lines) {
    result += wrapTextOnWordsMaybeWithBordersToo(line, targetWidth, borderPatternVertical);
  }
  return result;
}

/** Wrap text to a target width and sandwich between vertical borders. This only works on single lines, not multi-line text. */
function wrapTextOnWordsMaybeWithBordersToo(text: string, targetWidth: number, borderPatternVertical?: string) {
  // Break input text on word boundaries.
  const wordBoundaryRegEx = /\b/;
  const words = text.split(wordBoundaryRegEx);
  const lines = [''];
  for (const word of words) {
    const latestLine = lines[lines.length - 1];
    const width = latestLine.length + word.length;
    if (width > targetWidth) {
      lines.push('');
    }
    lines[lines.length - 1] += word;
  }

  // Build output with optional border sandwich.
  let result = '';
  for (const lineText of lines) {
    let outputLine = '';

    // Left border.
    if (borderPatternVertical?.length)
      outputLine += borderPatternVertical + ' ';

    outputLine += lineText;

    // Right border, pad to target width.
    if (borderPatternVertical?.length) {
      const padTo = targetWidth + borderPatternVertical.length + 1;
      outputLine = outputLine.padEnd(padTo) + ' ' + borderPatternVertical;
    }

    result += outputLine + '\n';
  }
  return result;
}
