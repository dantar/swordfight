import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActionButton } from 'src/app/models/game-model';
import { AudioPlayService } from 'src/app/services/audio-play.service';
import { GamesCommonService } from 'src/app/services/games-common.service';
import { SharedDataService } from 'src/app/services/shared-data.service';

@Component({
  selector: 'app-duel-buttons',
  templateUrl: './duel-buttons.component.html',
  styleUrls: ['./duel-buttons.component.scss']
})
export class DuelButtonsComponent implements OnInit, OnDestroy {

  constructor(
    private games: GamesCommonService,
    private audio: AudioPlayService,
    private shared: SharedDataService,
    ) { }

  ngOnDestroy(): void {
    this.audio.stop('ls-study');
  }

  buttons: ActionButton[]
  sequence: string[];
  step: number;
  level: number;
  lastPicked: string;

  ngOnInit(): void {
    this.buttons = [
      {name: 'swingA', x: 0, y: 0, scale: 0.5, color: '#ffff00', sound: 'ls-block1'},
      {name: 'swingB', x: 50, y: 0, scale: 0.5, color: '#00ff00', sound: 'ls-block2'},
      {name: 'swingC', x: 0, y: 50, scale: 0.5, color: '#00ffff', sound: 'ls-block3'},
      {name: 'swingD', x: 50, y: 50, scale: 0.5, color: '#ff00ff', sound: 'ls-block4'},
    ];
    this.sequence = [];
    this.level = 0;
    this.levelUp();
    this.audio.play('ls-ready');
    this.audio.loop('ls-study');
    this.audio.setTheme('battle1');
  }

  levelUp() {
    this.step = 0;
    this.level++;
    this.lastPicked = this.games.randomPick(this.buttons.filter(b => this.lastPicked ? b.name != this.lastPicked : true)).name;
    this.sequence.push(this.lastPicked);
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
    this.audio.play(button.sound);
    if (this.current(button)) {
      this.step ++;
      if (this.step >= this.sequence.length) {
        this.levelUp();
      }
    } else {
      this.audio.play('grunt1');
      this.step = 0;
      console.log("Nooooooooooooo!");
    }
  }

}
