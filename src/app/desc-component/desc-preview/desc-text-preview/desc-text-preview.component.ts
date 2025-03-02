import { Component, Input } from '@angular/core';
import { renderDesc } from '../../../../data/renderDesc';

@Component({
  selector: 'app-desc-text-preview',
  imports: [],
  templateUrl: './desc-text-preview.component.html',
  styleUrl: './desc-text-preview.component.css'
})
export class DescTextPreviewComponent {
  @Input() desc: IDesc = {sections: []};

  renderDesc = renderDesc;

  copyToClipboard() {
    const descText = this.renderDesc(this.desc);
    navigator.clipboard.writeText(descText);
  }
}
