import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-ellipse',
    standalone: true,
    imports: [],
    template: `
    <svg [attr.width]="cardWidth + 'px'" [attr.height]="cardHeight + 'px'" viewBox="0 0 100 100">
        <ellipse 
            cx="50" cy="50" 
            [attr.rx]="cardWidth/6" [attr.ry]="cardHeight/4.75" 
            [attr.fill]="color"
            [attr.stroke]="stroke"
            stroke-width="5px"
            transform="rotate(30 0 0)" 
            transform-origin="center center"
        />
    </svg>
    `,
})
export class EllipseComponent {
    @Input({ required: true }) cardWidth!: number;
    @Input({ required: true }) cardHeight!: number;
    @Input() color!: string;
    @Input() stroke!: string;
}
