import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-reverse-svg',
    standalone: true,
    template: `
    <svg viewBox="0 0 100 100" 
        [attr.width]="size"
        [attr.height]="size"
        overflow="visible"
        filter="url(#shadow)" 
        >
        <g transform="translate(-25 50) rotate(-45 0 0)">
            <path
                d="M80,30 v-15 l25,25 l-25,25 v-15 h-50 q0,-20 20,-20 h50"  
                fill="white"/>
            <path
                d="M20,55 h50 q0,20 -20,20 h-30 v15 l-25,-25 l25,-25 v15"  
                fill="white"/>
        </g>
    </svg>
    `,
})
export class ReverseSVGComponent {
    @Input() size: number = 50;
}
