interface IDesc {
  sections: (IBodySection | IItemsSection)[];
  width?: number;
  borderPatternHorizontal?: string;
  borderPatternVertical?: string;
  borderPatternCorner?: string;
  borderPatternColumn?: string;
  useBorderHorizontal?: boolean;
  useBorderVertical?: boolean;
  includeAttribution?: boolean;
}

interface ISection {
  type: 'body' | 'section';
}

interface IBodySection implements ISection {
  type: 'body';
  text: string;
  forceWrap?: boolean;
}

interface IItemsSection implements ISection {
  type: 'section';
  columns?: number;
  items: IItemsSectionItem[];
}

interface IItemsSectionItem {
  name: string;
  value: string;
}
