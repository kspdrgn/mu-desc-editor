import { FormBuilder, FormGroup } from '@angular/forms';

export function newDescBodyForm(fb: FormBuilder) {
  return fb.group({
    type: ['body'],
    text: [''],
    forceWrap: [false],
  });
}

export function newDescItemsSectionForm(fb: FormBuilder, section?: IItemsSection) {
  const itemsData = section?.items;
  const itemsControls: FormGroup[] = [];

  if (itemsData?.length) {
    const itemControls = itemsData.map(item => newDescItemsSectionItemForm(fb, item));
    itemsControls.push(...itemControls);
  } else {
    const itemControl = newDescItemsSectionItemForm(fb);
    itemsControls.push(itemControl);
  }
  return fb.group({
    type: ['list'],
    columns: [null],
    items: fb.array(itemsControls),
  });
}

export function newDescItemsSectionItemForm(fb: FormBuilder, item?: IItemsSectionItem) {
  return fb.group({
    name: [item?.name ?? ''],
    value: [item?.value ?? ''],
  });
}
