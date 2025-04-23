import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-draw-two-middle-svg',
    standalone: true,
    template: `
    <svg viewBox="0 0 100 100" 
        [attr.width]="size"
        [attr.height]="size"
        overflow="visible">
        <rect x="40" y="10" width="40" height="60" fill="white" filter="url(#shadow)" rx="5" ry="5"/>
        <rect x="20" y="30" width="40" height="60" fill="white" filter="url(#shadow)" rx="5" ry="5"/>
    </svg>
    `,
})
export class DrawTwoMiddleSVGComponent {
    @Input() size: number = 50;
}
