import { Component, inject, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { tryParseDesc, parseDescLimits } from '../../../../data/parseDesc';
import { DescStateService } from '../../../desc-state.service';

@Component({
  selector: 'app-desc-parser',
  imports: [FormsModule],
  templateUrl: './desc-parser.component.html',
  styleUrl: './desc-parser.component.css'
})
export class DescParserComponent {

  public parseText: string = '';
  public parseDescLimits = parseDescLimits;
  descService = inject(DescStateService);

  public parseClick() {
    const result = tryParseDesc(this.parseText);
    if (result) {
      this.descService.set(result);
    }
  }

}
