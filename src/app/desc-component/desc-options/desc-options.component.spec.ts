import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DescOptionsComponent } from './desc-options.component';

describe('DescOptionsComponent', () => {
  let component: DescOptionsComponent;
  let fixture: ComponentFixture<DescOptionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DescOptionsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DescOptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
