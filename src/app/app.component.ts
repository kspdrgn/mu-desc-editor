import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DescComponentComponent } from './desc-component/desc-component.component';
import { defaultDesc } from '../data/descDefaults';
import { DescStateService } from './desc-state.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, DescComponentComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'mu-desc-editor';

  // TODO load saved desc here.
  descService = inject(DescStateService);

}
