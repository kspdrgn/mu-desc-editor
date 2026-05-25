import { Injectable, signal, computed, inject } from '@angular/core';
import { defaultDesc } from '../data/descDefaults';

@Injectable({ providedIn: 'root' })
export class DescStateService {

  public desc = signal(defaultDesc);

  set(newDesc: IDesc) { this.desc.update(() => newDesc); }

}
