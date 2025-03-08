import { Component, Input } from '@angular/core';
import { DescSectionsComponent } from './desc-sections/desc-sections.component';
import { DescPreviewComponent } from './desc-preview/desc-preview.component';
import { DescOptionsComponent } from './desc-options/desc-options.component';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { newDescBodyForm, newDescItemsSectionForm, newDescItemsSectionItemForm } from './formSectionBuilders';

@Component({
  selector: 'app-desc-component',
  imports: [
    ReactiveFormsModule,
    DescSectionsComponent,
    DescOptionsComponent,
    DescPreviewComponent,
  ],
  templateUrl: './desc-component.component.html',
  styleUrl: './desc-component.component.css'
})
export class DescComponentComponent {
  constructor(private readonly fb: FormBuilder) {
    this.descForm = this.createForm();
  }

  public get desc() { return this._desc; }

  @Input()
  public set desc(desc: IDesc) {
    this._desc = desc;
    this.descForm = this.createForm();
    this.fillForm(desc);
  }

  private _desc: IDesc = {sections: []};

  public descForm: FormGroup;

  private createForm() {
    return this.fb.group({
      name: [''],
      //sections: this.fb.array([]),
      sections: this.fb.array([]),
      options: this.fb.group({
        width: [''],
        useBorderHorizontal: [''],
        useBorderVertical: [''],
        borderPatternHorizontal: [''],
        borderPatternVertical: [''],
        borderPatternCorner: [''],
        borderPatternColumn: [''],
        includeAttribution: [''],
      }),
    });
  }

  private fillForm(desc: IDesc) {
    this.descForm.patchValue(desc);
    for (const section of desc.sections) {
      const fg = newSectionForm(this.fb, section);
      const sections = this.descForm.get('sections') as FormArray<FormGroup>;
      sections.push(fg);
    }
  }

}

function newSectionForm(fb: FormBuilder, section: ISection) {
  let fg: FormGroup;
  switch (section?.type) {
    case 'body':
      fg = newDescBodyForm(fb);
      break;
    case 'list':
      fg = newDescItemsSectionForm(fb, section as IItemsSection);
      break;
    default:
      throw 'bad section def';
  }
  fg.patchValue(section);
  return fg;
}
