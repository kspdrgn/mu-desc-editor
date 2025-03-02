import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DescTextPreviewComponent } from './desc-text-preview.component';

describe('DescTextPreviewComponent', () => {
  let component: DescTextPreviewComponent;
  let fixture: ComponentFixture<DescTextPreviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DescTextPreviewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DescTextPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
