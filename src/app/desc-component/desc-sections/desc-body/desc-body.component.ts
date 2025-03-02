import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-desc-body',
  imports: [FormsModule],
  templateUrl: './desc-body.component.html',
  styleUrl: './desc-body.component.css'
})
export class DescBodyComponent {
  @Input() desc: IDesc = {sections: []};
  @Input() section: IBodySection = {type: 'body', text: ''};

  deleteSection() {
    this.desc.sections.splice(this.desc.sections.indexOf(this.section), 1);
  }
}
