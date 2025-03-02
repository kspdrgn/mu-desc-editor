import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DescComponentComponent } from './desc-component/desc-component.component';
import { defaultDesc } from '../data/descDefaults';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, DescComponentComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'mu-desc-editor';

  // TODO load saved desc here.
  desc = defaultDesc;
}
