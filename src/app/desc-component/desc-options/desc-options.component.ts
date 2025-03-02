import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-desc-options',
  imports: [FormsModule],
  templateUrl: './desc-options.component.html',
  styleUrl: './desc-options.component.css'
})
export class DescOptionsComponent {
  @Input() desc: IDesc = {sections: []};

}
