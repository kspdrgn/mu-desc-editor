interface IDesc {
  name?: string;
  sections: (IBodySection | IItemsSection)[];
  options?: IOptions;
}

interface ISection {
  type: 'body' | 'list';
}

interface IBodySection implements ISection {
  type: 'body';
  text: string;
  forceWrap?: boolean;
}

interface IItemsSection implements ISection {
  type: 'list';
  columns?: number;
  items: IItemsSectionItem[];
}

interface IItemsSectionItem {
  name: string;
  value: string;
}

interface IOptions {
  width?: number;
  borderPatternHorizontal?: string;
  borderPatternVertical?: string;
  borderPatternCorner?: string;
  borderPatternColumn?: string;
  useBorderHorizontal?: boolean;
  useBorderVertical?: boolean;
  includeAttribution?: boolean;
}
