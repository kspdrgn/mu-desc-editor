export const defaultDesc: IDesc = {
  sections: [{
    type: 'body',
    text: '    This is a character description.  The first paragraph should probably mention important things like height and predominant coloring first so you know what you\'re looking at, but it can also include some overall notes on style and demeanor.\n\n    The middle of the description might be a top to bottom tour of the character\'s physical or presenting appearance.  Clothes and a more detailed look at the shape of their figure is a great thing to include here.  Descriptions work best in two to four paragraphs, but it should fit within a \'page\' overall.\n\n    Indenting each paragraph can help readability.  Do not line-wrap the text manually, instead let each paragraph be its own line so the other user\'s client can wrap to their preferred width.\n\n    The last paragraph is usually a bit of summary and almost always mentions the more luscious and alluring traits that often require similes like fruit and sports balls as size references.  Descriptions are fun!\n\n    Pic links could go here if you have any!',
  }, {
    type: 'section',
    columns: 3,
    items: [{
      name: 'NAME',
      value: 'Char',
    }, {
      name: 'SPECIES',
      value: 'Fox',
    }, {
      name: 'SEX',
      value: 'Femme',
    }, {
      name: 'AGE',
      value: '26',
    }, {
      name: 'EYES',
      value: 'Green',
    }, {
      name: 'FUR',
      value: 'Blaze orange',
    }, {
      name: 'HAIR',
      value: 'Natural fur',
    }, {
      name: 'HEIGHT',
      value: '5\'10"',
    }, {
      name: 'TAIL',
      value: 'Swishy',
    }],
  }, {
    type: 'section',
    items: [{
      name: 'Shirt',
      value: 'Bright pink tank top.',
    }, {
      name: 'Pants',
      value: 'Cut-off jean shorts.',
    }, {
      name: 'Shoes',
      value: 'Toeless digitigrade sneakers.',
    }]
  }],
  width: 79,
  useBorderHorizontal: true,
  useBorderVertical: true,
  borderPatternHorizontal: '-~-~-._,',
  borderPatternVertical: '|',
  borderPatternCorner: '*',
  borderPatternColumn: '|',
  includeAttribution: true,
};
