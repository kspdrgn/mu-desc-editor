import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, Output } from '@angular/core';
import { DescBodyComponent } from './desc-body/desc-body.component';
import { DescItemsSectionComponent } from './desc-items-section/desc-items-section.component';
import { CdkDrag, CdkDragDrop, CdkDragHandle, CdkDropList, moveItemInArray } from '@angular/cdk/drag-drop';
import { FormArray, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { newDescBodyForm, newDescItemsSectionForm } from '../formSectionBuilders';

@Component({
  selector: 'app-desc-sections',
  imports: [
    ReactiveFormsModule,
    DescBodyComponent,
    DescItemsSectionComponent,
    CdkDrag,
    CdkDragHandle,
    CdkDropList,
  ],
  templateUrl: './desc-sections.component.html',
  styleUrl: './desc-sections.component.css'
})
export class DescSectionsComponent {
  constructor(private readonly fb: FormBuilder, private readonly changeDetection: ChangeDetectorRef) {}

  @Input() form!: FormGroup;

  public get sections() {
    return this.form.get('sections') as FormArray<FormGroup>;
  }

  addBodySection() {
    const f = newDescBodyForm(this.fb);
    this.sections.push(f);
  }

  addItemsSection() {
    const f = newDescItemsSectionForm(this.fb);
    this.sections.push(f);
  }

  deleteSection(sectionIndex: number) {
    this.sections.removeAt(sectionIndex);
  }

  /** Section dragged and dropped into (maybe new) position. Powered by https://material.angular.io/cdk/drag-drop/overview */
  sectionDragDrop(event: CdkDragDrop<ISection[]>) {
    moveItemInArray(this.sections.controls, event.previousIndex, event.currentIndex);
    this.changeDetection.detectChanges();
  }
}
