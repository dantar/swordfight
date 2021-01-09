import { Component, OnInit } from '@angular/core';
import { ActionButton } from 'src/app/models/game-model';

@Component({
  selector: 'app-duel-buttons',
  templateUrl: './duel-buttons.component.html',
  styleUrls: ['./duel-buttons.component.scss']
})
export class DuelButtonsComponent implements OnInit {

  constructor() { }

  buttons: ActionButton[]

  ngOnInit(): void {
    this.buttons = [
      {name: 'swingA', x: 0, y: 0, scale: 0.5, color: '#ffff00'},
      {name: 'swingB', x: 50, y: 0, scale: 0.5, color: '#00ff00'},
      {name: 'swingC', x: 0, y: 50, scale: 0.5, color: '#00ffff'},
      {name: 'swingD', x: 50, y: 50, scale: 0.5, color: '#ff00ff'},
    ];
  }

  transform(button: ActionButton): string {
    return `translate(${button.x} ${button.y}) scale(${button.scale})`;
  }

}
