import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DescParserComponent } from './desc-parser.component';

describe('DescParserComponent', () => {
  let component: DescParserComponent;
  let fixture: ComponentFixture<DescParserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DescParserComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DescParserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
