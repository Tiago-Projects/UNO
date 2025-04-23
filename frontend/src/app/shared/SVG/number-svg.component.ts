import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-number-svg',
    standalone: true,
    template: `
    <svg viewBox="0 0 100 100" 
        [attr.width]="size"
        [attr.height]="size"
        overflow="visible">
        <text
            x="50%"
            y="60%"
            text-anchor="middle"
            dominant-baseline="middle"
            [attr.font-size]="fontSize"
            fill="white"
            filter="url(#shadow)">
                {{ number }}
        </text>
    </svg>
    `,
})
export class NumberSVGComponent {
    @Input() number!: number;
    @Input() size: number = 50;
    @Input() fontSize: number = 50;
}
