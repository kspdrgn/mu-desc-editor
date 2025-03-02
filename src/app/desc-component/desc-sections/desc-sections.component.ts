import { Component, Input } from '@angular/core';
import { DescBodyComponent } from './desc-body/desc-body.component';
import { DescItemsSectionComponent } from './desc-items-section/desc-items-section.component';
import { CdkDrag, CdkDragDrop, CdkDragHandle, CdkDropList, moveItemInArray } from '@angular/cdk/drag-drop';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-desc-sections',
  imports: [
    FormsModule,
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
  @Input() desc: IDesc = {sections: []};

  addBodySection() {
    this.desc.sections.push({type: 'body', text: ''});
  }

  addItemsSection() {
    this.desc.sections.push({type: 'section', items: [{name: '', value: ''}]});
  }

  /** Section dragged and dropped into (maybe new) position. Powered by https://material.angular.io/cdk/drag-drop/overview */
  drop(event: CdkDragDrop<ISection[]>) {
    moveItemInArray(this.desc.sections, event.previousIndex, event.currentIndex);
  }
}
