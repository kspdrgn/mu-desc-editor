import { Component, Input } from '@angular/core';
import { ControlContainer, FormGroup, FormGroupDirective, FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-desc-options',
  imports: [ReactiveFormsModule],
  //viewProviders: [{ provide: ControlContainer, useExisting: FormGroupDirective }],
  templateUrl: './desc-options.component.html',
  styleUrl: './desc-options.component.css',
  standalone: true,
})
export class DescOptionsComponent {
  //@Input() desc: IDesc = {sections: []};

  @Input() form: FormGroup | undefined;

}
