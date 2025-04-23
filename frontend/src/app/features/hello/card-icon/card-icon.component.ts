import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { NumberSVGComponent } from '../../../shared/SVG/number-svg.component';
import { SkipSVGComponent } from '../../../shared/SVG/skip-svg.component';

@Component({
  selector: 'app-card-icon',
  standalone: true,
  imports: [CommonModule, NumberSVGComponent, SkipSVGComponent],
  templateUrl: './component/card-icon.component.html',
  styleUrl: './component/card-icon.component.css'
})
export class CardIconComponent {
    @Input({ required: true}) type!: string;
    @Input({ required: true}) size: number = 50;
    @Input() fontSize: number = 50;
    
    constructor() {}
}
