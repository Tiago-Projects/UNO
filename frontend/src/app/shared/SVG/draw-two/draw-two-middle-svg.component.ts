import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-draw-two-middle-svg',
    standalone: true,
    template: `
    <svg viewBox="0 0 100 100" 
        [attr.width]="size"
        [attr.height]="size"
        overflow="visible">
        <g filter="url(#shadow)">
            <rect x="40" y="10" width="40" height="60" fill="white" filter="url(#border)" rx="5" ry="5"/>
            <rect x="20" y="30" width="40" height="60" fill="white" filter="url(#border)" rx="5" ry="5"/>
        </g>
    </svg>
    `,
})
export class DrawTwoMiddleSVGComponent {
    @Input() size: number = 50;
}
