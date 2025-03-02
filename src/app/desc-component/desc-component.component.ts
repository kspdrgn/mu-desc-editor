import { Component, Input } from '@angular/core';
import { DescSectionsComponent } from './desc-sections/desc-sections.component';
import { DescPreviewComponent } from './desc-preview/desc-preview.component';
import { DescOptionsComponent } from './desc-options/desc-options.component';

@Component({
  selector: 'app-desc-component',
  imports: [
    DescSectionsComponent,
    DescOptionsComponent,
    DescPreviewComponent,
  ],
  templateUrl: './desc-component.component.html',
  styleUrl: './desc-component.component.css'
})
export class DescComponentComponent {
  @Input() desc: IDesc = {sections: []};

}
