import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EllipseComponent } from '../../shared/SVG/ellipse.component';
import { DefaultUserComponent } from '../../shared/SVG/default-user.component';
import { PlayerEntity } from '../../core/Model/player-entity';

@Component({
  selector: 'app-player-slot',
  standalone: true,
  imports: [CommonModule, EllipseComponent, DefaultUserComponent],
  templateUrl: './player-slot.component.html',
  styleUrl: './player-slot.component.css'
})
export class PlayerSlotComponent {
    @Input({required: true}) player!: (PlayerEntity | null);
    @Input({required: true}) index!: number;

    public getColor(): string {
        return this.player == null ? "empty" : "player";
    }
}
