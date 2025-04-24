import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-draw-four-middle-svg',
    standalone: true,
    template: `
    <svg viewBox="0 0 100 100" 
        [attr.width]="size"
        [attr.height]="size"
        overflow="visible">
        <rect x="0" y="50" width="40" height="60" fill="green" filter="url(#shadow)" rx="5" ry="5"/>
        <rect x="30" y="10" width="40" height="60" fill="blue" filter="url(#shadow)" rx="5" ry="5"/>
        <rect x="70" y="-10" width="40" height="60" fill="yellow" filter="url(#shadow)" rx="5" ry="5"/>
        <rect x="50" y="35" width="40" height="60" fill="red" filter="url(#shadow)" rx="5" ry="5"/>
    </svg>
    `,
})
export class DrawFourMiddleSVGComponent {
    @Input() size: number = 50;
}
