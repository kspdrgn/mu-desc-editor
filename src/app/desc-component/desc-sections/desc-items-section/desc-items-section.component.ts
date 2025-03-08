import { CdkDrag, CdkDragDrop, CdkDragHandle, CdkDropList, moveItemInArray } from '@angular/cdk/drag-drop';
import { ChangeDetectorRef, Component, EventEmitter, Input, Output } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { newDescItemsSectionItemForm } from '../../formSectionBuilders';

@Component({
  selector: 'app-desc-items-section',
  imports: [
    ReactiveFormsModule,
    CdkDrag,
    CdkDragHandle,
    CdkDropList,
    MatFormFieldModule,
    MatInputModule,
  ],
  templateUrl: './desc-items-section.component.html',
  styleUrl: './desc-items-section.component.css'
})
export class DescItemsSectionComponent {
  constructor(
    private readonly fb: FormBuilder,
    private readonly changeDetection: ChangeDetectorRef) { }

  @Input() sectionForm!: FormGroup;
  @Input() sectionIndex!: number;
  @Output() deleteSection: EventEmitter<number> = new EventEmitter();

  public get items() {
    return this.sectionForm.get('items') as FormArray<FormGroup>;
  }

  addItem() {
    const fg = newDescItemsSectionItemForm(this.fb);
    this.items.push(fg);
  }

  removeItem(index: number) {
    // note: using .splice() won't update validity correctly: https://stackoverflow.com/a/68406075
    this.items.removeAt(index);
  }

  /** Item dragged and dropped into (maybe new) position. Powered by https://material.angular.io/cdk/drag-drop/overview */
  itemDragDrop(event: CdkDragDrop<IItemsSectionItem[]>) {
    moveItemInArray(this.items.controls, event.previousIndex, event.currentIndex);
    // note: must update validity after changing array: https://stackoverflow.com/a/68406075
    this.items.controls.map(control => {
      control.updateValueAndValidity({ onlySelf: false, emitEvent: false });
    });
  }
}
