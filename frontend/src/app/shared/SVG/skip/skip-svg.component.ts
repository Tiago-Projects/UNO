import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-skip-svg',
    standalone: true,
    imports: [],
    template: `
    <svg viewBox="0 0 100 100" 
        [attr.width]="size"
        [attr.height]="size"
        overflow="visible"
        preserveAspectRatio="xMidYMid meet">

        <g filter="url(#shadow)">
            <line 
                x1="20" y1="80" x2="80" y2="20" 
                stroke="white" 
                stroke-width="15"
            />
            <circle 
                cx="50" cy="50" r="40" 
                stroke="white"
                stroke-width="15"
                fill="none" 
            />
        </g>
    </svg>
    `,
})
export class SkipSVGComponent {
    @Input() size: number = 50;
}
