import { Component, OnInit } from '@angular/core';
import { ActionButton } from 'src/app/models/game-model';
import { AudioPlayService } from 'src/app/services/audio-play.service';
import { GamesCommonService } from 'src/app/services/games-common.service';

@Component({
  selector: 'app-duel-buttons',
  templateUrl: './duel-buttons.component.html',
  styleUrls: ['./duel-buttons.component.scss']
})
export class DuelButtonsComponent implements OnInit {

  constructor(
    private games: GamesCommonService,
    private audio: AudioPlayService,
    ) { }

  buttons: ActionButton[]
  sequence: string[];
  step: number;
  level: number;

  ngOnInit(): void {
    this.buttons = [
      {name: 'swingA', x: 0, y: 0, scale: 0.5, color: '#ffff00'},
      {name: 'swingB', x: 50, y: 0, scale: 0.5, color: '#00ff00'},
      {name: 'swingC', x: 0, y: 50, scale: 0.5, color: '#00ffff'},
      {name: 'swingD', x: 50, y: 50, scale: 0.5, color: '#ff00ff'},
    ];
    this.sequence = [];
    this.level = 0;
    this.levelUp();
  }

  levelUp() {
    this.step = 0;
    this.level++;
    this.sequence.push(this.games.randomPick(this.buttons).name);
    console.log(this.step, this.sequence);
  }

  transform(button: ActionButton): string {
    return `translate(${button.x} ${button.y}) scale(${button.scale})`;
  }

  style(button: ActionButton): string {
    return `opacity:${this.current(button) ? 1 : 0.5};`;
  }

  current(button: ActionButton): boolean {
    return this.sequence[this.step] === button.name;
  }

  clickAction(button: ActionButton) {
    this.audio.play('action');
    if (this.current(button)) {
      this.step ++;
      if (this.step >= this.sequence.length) {
        this.levelUp();
      }
    } else {
      this.step = 0;
      console.log("Nooooooooooooo!");
    }
  }

}
