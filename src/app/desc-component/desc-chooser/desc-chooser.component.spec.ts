import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DescChooserComponent } from './desc-chooser.component';

describe('DescChooserComponent', () => {
  let component: DescChooserComponent;
  let fixture: ComponentFixture<DescChooserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DescChooserComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DescChooserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
