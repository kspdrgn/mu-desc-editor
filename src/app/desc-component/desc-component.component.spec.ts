import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DescComponentComponent } from './desc-component.component';

describe('DescComponentComponent', () => {
  let component: DescComponentComponent;
  let fixture: ComponentFixture<DescComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DescComponentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DescComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
