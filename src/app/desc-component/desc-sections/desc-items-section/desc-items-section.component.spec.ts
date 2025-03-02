import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DescItemsSectionComponent } from './desc-items-section.component';

describe('DescSectionComponent', () => {
  let component: DescItemsSectionComponent;
  let fixture: ComponentFixture<DescItemsSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DescItemsSectionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DescItemsSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
