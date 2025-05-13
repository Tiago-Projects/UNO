import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-default-user',
    standalone: true,
    template: `
        <svg [attr.width]="cardWidth + 'px'" [attr.height]="cardHeight + 'px'" viewBox="0 0 100 100">
            <g fill="white">
                <circle cx="50" cy="40" r="20" />
                <circle cx="50" cy="100" r="40" />
            </g>   
        </svg>
    `
})
export class DefaultUserComponent {
    @Input({ required: true }) cardWidth!: number;
    @Input({ required: true }) cardHeight!: number;
}
