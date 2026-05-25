import { Component } from '@angular/core';
import { DescParserComponent } from './desc-parser/desc-parser.component';

@Component({
  selector: 'app-desc-chooser',
  imports: [DescParserComponent],
  templateUrl: './desc-chooser.component.html',
  styleUrl: './desc-chooser.component.css'
})
export class DescChooserComponent {

}
