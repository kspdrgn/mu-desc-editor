import { Component, Input } from '@angular/core';
import { DescSectionsComponent } from './desc-sections/desc-sections.component';
import { DescPreviewComponent } from './desc-preview/desc-preview.component';
import { DescOptionsComponent } from './desc-options/desc-options.component';
import { DescChooserComponent } from './desc-chooser/desc-chooser.component';

@Component({
  selector: 'app-desc-component',
  imports: [
    DescChooserComponent,
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
