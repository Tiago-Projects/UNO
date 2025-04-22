import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SkipSVGComponent } from './skip-svg.component';

describe('SkipSVGComponent', () => {
  let component: SkipSVGComponent;
  let fixture: ComponentFixture<SkipSVGComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SkipSVGComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SkipSVGComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
