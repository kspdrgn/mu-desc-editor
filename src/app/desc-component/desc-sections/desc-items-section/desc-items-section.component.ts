import { CdkDrag, CdkDragDrop, CdkDragHandle, CdkDropList, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-desc-items-section',
  imports: [
    FormsModule,
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
  @Input() desc: IDesc = {sections: []};
  @Input() section: IItemsSection = {type: 'section', items: []};

  addItem() {
    this.section.items.push({name: '', value: ''});
  }

  removeItem(index: number) {
    this.section.items.splice(index, 1);
  }

  deleteSection() {
    this.desc.sections.splice(this.desc.sections.indexOf(this.section), 1);
  }

  /** Section dragged and dropped into (maybe new) position. Powered by https://material.angular.io/cdk/drag-drop/overview */
  drop(event: CdkDragDrop<IItemsSectionItem[]>) {
    moveItemInArray(this.section.items, event.previousIndex, event.currentIndex);
  }
}
