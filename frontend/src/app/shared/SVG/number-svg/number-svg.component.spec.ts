import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NumberSVGComponent } from './number-svg.component';

describe('NumberSVGComponent', () => {
  let component: NumberSVGComponent;
  let fixture: ComponentFixture<NumberSVGComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NumberSVGComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NumberSVGComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
