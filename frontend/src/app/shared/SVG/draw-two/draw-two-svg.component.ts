import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-draw-two-svg',
    standalone: true,
    template: `
    <svg viewBox="0 0 100 100" 
        [attr.width]="size"
        [attr.height]="size"
        overflow="visible">
        <text
            x="20%"
            y="60%"
            text-anchor="middle"
            dominant-baseline="middle"
            [attr.font-size]="fontSize*2/3"
            fill="white"
            filter="url(#shadow)">
                +
        </text>
        <text
            x="70%"
            y="60%"
            text-anchor="middle"
            dominant-baseline="middle"
            [attr.font-size]="fontSize*0.9"
            fill="white"
            filter="url(#shadow)">
                2
        </text>

    </svg>
    `,
})
export class DrawTwoSVGComponent {
    @Input() size: number = 50;
    @Input() fontSize: number = 50;
}
