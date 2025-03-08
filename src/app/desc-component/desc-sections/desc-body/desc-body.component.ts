import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-desc-body',
  imports: [ReactiveFormsModule],
  templateUrl: './desc-body.component.html',
  styleUrl: './desc-body.component.css'
})
export class DescBodyComponent {
  @Input() sectionForm!: FormGroup;
  @Input() sectionIndex!: number;
  @Output() deleteSection: EventEmitter<number> = new EventEmitter();
}
