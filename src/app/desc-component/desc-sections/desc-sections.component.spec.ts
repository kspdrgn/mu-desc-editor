import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DescSectionsComponent } from './desc-sections.component';

describe('DescSectionsComponent', () => {
  let component: DescSectionsComponent;
  let fixture: ComponentFixture<DescSectionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DescSectionsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DescSectionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
