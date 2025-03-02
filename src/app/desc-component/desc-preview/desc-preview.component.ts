import { Component, Input } from '@angular/core';
import { renderDesc } from '../../../data/renderDesc';
import { DescTextPreviewComponent } from './desc-text-preview/desc-text-preview.component';

@Component({
  selector: 'app-desc-preview',
  imports: [DescTextPreviewComponent],
  templateUrl: './desc-preview.component.html',
  styleUrl: './desc-preview.component.css'
})
export class DescPreviewComponent {
  @Input() desc: IDesc = {sections: []};

  renderDesc = renderDesc;
}
