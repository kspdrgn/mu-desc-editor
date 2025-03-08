import { ChangeDetectorRef, Component, NgModule, Output, SimpleChanges } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DescComponentComponent } from './desc-component/desc-component.component';
import { defaultDesc } from '../data/descDefaults';
import { defaultDesc2 } from '../data/descDefaults2';
import { FormsModule } from '@angular/forms';
import { DataService } from './current-character.service';
import { defaultDesc3 } from '../data/descDefaults3';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    DescComponentComponent,
    FormsModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  constructor(private dataService: DataService, private readonly changeDetection: ChangeDetectorRef) { }

  ngOnInit() {
    this.dataService.data$.subscribe(data => {
      console.debug('data changed?', data)
    })
  }

  title = 'mu-desc-editor';

  characters = [
    defaultDesc,
    defaultDesc2,
    defaultDesc3,
  ];
  selectedCharacterIndex = 0;
  char = this.characters[this.selectedCharacterIndex];

  charChanged(event: Event) {
    this.char = this.characters[this.selectedCharacterIndex];
  }

  forceChangeDetection() {
    this.changeDetection.detectChanges();
  }
}
