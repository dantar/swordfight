import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { ActionButton } from 'src/app/models/game-model';
import { AudioPlayService } from 'src/app/services/audio-play.service';
import { GamesCommonService } from 'src/app/services/games-common.service';
import { SharedDataService } from 'src/app/services/shared-data.service';
import {
  trigger,
  state,
  style,
  animate,
  transition,
  // ...
} from '@angular/animations';

@Component({
  selector: 'app-duel-buttons',
  templateUrl: './duel-buttons.component.html',
  styleUrls: ['./duel-buttons.component.scss'],
  animations: [
    trigger('thesword', [
      // states
      state('rest', style({
        transform: 'translate(90px,80px) scale(1) rotate(15deg)',
      })),
      state('swingA', style({
        transform: 'translate(25px,25px) scale(0.5) rotate(-60deg)',
      })),
      state('swingB', style({
        transform: 'translate(75px,25px) scale(0.5) rotate(60deg)',
      })),
      state('swingC', style({
        transform: 'translate(25px,75px) scale(0.5) rotate(210deg)',
      })),
      state('swingD', style({
        transform: 'translate(75px,75px) scale(0.5) rotate(120deg)',
      })),
      // transitions
      transition('* => swingA', animate('250ms')),
      transition('* => swingB', animate('250ms')),
      transition('* => swingC', animate('250ms')),
      transition('* => swingD', animate('250ms')),
      transition('* => rest', animate('1000ms')),
    ]),
    trigger('theenemy', [
      // states
      state('rest', style({
        transform: 'translate(50px,20px) scale(0.3) rotate(-15deg)',
      })),
      state('swingA', style({
        transform: 'translate(25px,25px) scale(0.5) rotate(30deg)',
      })),
      state('swingB', style({
        transform: 'translate(75px,25px) scale(0.5) rotate(150deg)',
      })),
      state('swingC', style({
        transform: 'translate(25px,75px) scale(0.5) rotate(300deg)',
      })),
      state('swingD', style({
        transform: 'translate(75px,75px) scale(0.5) rotate(210deg)',
      })),
      // transitions
      transition('* => swingA', animate('800ms')),
      transition('* => swingB', animate('800ms')),
      transition('* => swingC', animate('800ms')),
      transition('* => swingD', animate('800ms')),
      transition('* => rest', animate('800ms')),
    ]),
  ],
})
export class DuelButtonsComponent implements OnInit, OnDestroy {

  ready: boolean;
  currentAction: ActionButton;
  buttons: ActionButton[]
  sequence: string[];
  step: number;
  level: number;
  lastPicked: string;
  swordState: string;
  enemyState: string;
  ticker: any;

  constructor(
    private games: GamesCommonService,
    private audio: AudioPlayService,
  ) { }

  ngOnDestroy(): void {
    this.audio.stop('ls-study');
  }

  ngOnInit(): void {
    this.buttons = [
      { name: 'swingA', x: 0, y: 0, scale: 0.5, color: '#ffff00', sound: 'ls-block1' },
      { name: 'swingB', x: 50, y: 0, scale: 0.5, color: '#00ff00', sound: 'ls-block2' },
      { name: 'swingC', x: 0, y: 50, scale: 0.5, color: '#00ffff', sound: 'ls-block3' },
      { name: 'swingD', x: 50, y: 50, scale: 0.5, color: '#ff00ff', sound: 'ls-block4' },
    ];
    this.sequence = [];
    this.audio.play('ls-ready');
    this.audio.loop('ls-study');
    this.audio.setTheme('battle1');
    this.finishedSequence(true);
  }

  levelUp() {
    this.step = 0;
    this.lastPicked = this.games.randomPick(this.buttons.filter(b => this.lastPicked ? b.name != this.lastPicked : true)).name;
    this.sequence.push(this.lastPicked);
    this.enemyState = this.sequence[this.step];
  }

  sameLevel() {
    this.step = 0;
    this.enemyState = this.sequence[this.step];
  }

  transform(button: ActionButton): string {
    return `translate(${button.x} ${button.y}) scale(${button.scale})`;
  }

  style(button: ActionButton): string {
    return `opacity:${this.current(button) ? 0.1 : 0};`;
  }

  current(button: ActionButton): boolean {
    return this.sequence[this.step] === button.name;
  }

  clickAction(button: ActionButton) {
    this.audio.play('action');
    if (this.ready) {
      this.currentAction = button;
      if (this.swordState == this.currentAction.name) {
        this.swordState = 'rest';
      } else {
        this.swordState = this.currentAction.name;
      }
    } else {
      this.ready = true;
      this.levelUp();
    }
  }

  swordDone(event: any) {
    if (this.currentAction && this.currentAction.name == event.toState) {
      this.checkAction();
      this.swordState = 'rest';
    }
  }

  enemyDone(event: any) {
    console.log(event, this.swordState, this.enemyState);
  }

  checkAction() {
    this.audio.play(this.currentAction.sound);
    if (this.current(this.currentAction)) {
      this.step++;
      if (this.step >= this.sequence.length) {
        this.finishedSequence(true)
      } else {
        this.enemyState = this.sequence[this.step];
      }
    } else {
      this.audio.play('grunt1');
      this.finishedSequence(false);
    }
  }
  finishedSequence(won: boolean) {
    this.swordState = 'rest';
    this.enemyState = 'rest';
    this.ready = false;
    this.ticker = setInterval(() => {
      clearInterval(this.ticker);
      this.ready = true;
      if (won) {
        this.levelUp()
      } else {
        this.sameLevel();
      };
    }, 2000);
  }

}
