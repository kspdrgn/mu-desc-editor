import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DescBodyComponent } from './desc-body.component';

describe('DescBodyComponent', () => {
  let component: DescBodyComponent;
  let fixture: ComponentFixture<DescBodyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DescBodyComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DescBodyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
