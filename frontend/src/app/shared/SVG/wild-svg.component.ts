import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-wild-svg',
    standalone: true,
    template: `
    <svg viewBox="0 0 100 100" 
        [attr.width]="size"
        [attr.height]="size"
        overflow="visible"
        >
        
        <ellipse cx="0" cy="0" rx="125" ry="70" fill="white" transform="translate(50 50) rotate(-60 0 0)" />
        <clipPath id="ellipse-mask">
            <ellipse cx="0" cy="0" rx="120" ry="65" fill="trasparent" transform="translate(50 50) rotate(-60 0 0)" />
        </clipPath>

        <g clip-path="url(#ellipse-mask)">
            <rect x="-35" y="-100" width="100" height="150" fill="red" transform="skewX(-22)"/>
            <rect x="65" y="-100" width="100" height="150" fill="blue" transform="skewX(-22)"/>
            <rect x="-35" y="50" width="100" height="150" fill="yellow" transform="skewX(-22)"/>
            <rect x="65" y="50" width="100" height="150" fill="green" transform="skewX(-22)"/>
        </g> 

    </svg>
    `,
})
export class WildSVGComponent {
    @Input() size: number = 50;
}
