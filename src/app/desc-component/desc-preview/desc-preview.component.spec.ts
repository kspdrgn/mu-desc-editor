import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DescPreviewComponent } from './desc-preview.component';

describe('DescPreviewComponent', () => {
  let component: DescPreviewComponent;
  let fixture: ComponentFixture<DescPreviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DescPreviewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DescPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
