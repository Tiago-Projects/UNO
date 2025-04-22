import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-skip-svg',
  standalone: true,
  imports: [],
  templateUrl: './skip-svg.component.svg',
  styleUrl: './skip-svg.component.css'
})
export class SkipSVGComponent {
    @Input() size: number = 50;
    @Input() color: string = 'white';
    @Input() strokeWidth: number = 15;   

    constructor() {}
}
