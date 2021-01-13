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
import { TickersService } from 'src/app/services/tickers.service';

@Component({
  selector: 'app-duel-buttons',
  templateUrl: './duel-buttons.component.html',
  styleUrls: ['./duel-buttons.component.scss'],
  animations: [
    trigger('thesword', [
      // states
      state('mighty', style({
        transform: 'translate(50px,50px) scale(0.5) rotate(45deg)',
      })),
      state('won', style({
        transform: 'translate(50px,50px) scale(1) rotate(20deg)',
      })),
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
      transition('* => swingA', animate('200ms')),
      transition('* => swingB', animate('200ms')),
      transition('* => swingC', animate('200ms')),
      transition('* => swingD', animate('200ms')),
      transition('* => rest', animate('1000ms')),
      transition('* => won', animate('1000ms')),
      transition('* => mighty', animate('100ms')),
    ]),
    trigger('theenemy', [
      // states
      state('won', style({
        transform: 'translate(50px,50px) scale(1) rotate(20deg)',
      })),
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
      state('dead', style({
        transform: 'translate(-100px,-100px) scale(0.2) rotate(45deg)',
      })),
      // transitions
      transition('* => swingA', animate('{{delay}}ms')),
      transition('* => swingB', animate('{{delay}}ms')),
      transition('* => swingC', animate('{{delay}}ms')),
      transition('* => swingD', animate('{{delay}}ms')),
      transition('* => rest', animate('800ms')),
      transition('* => won', animate('1000ms')),
      transition('* => dead', animate('400ms')),
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
  totalScore: number;
  score: number;
  hits: number;

  enemyLevel: number;

  constructor(
    private games: GamesCommonService,
    private audio: AudioPlayService,
    private tickers: TickersService,
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
    this.audio.setTheme('battle1');
    this.enemyLevel = 5;
    this.newGame(0);
  }

  newGame(delta: number): void {
    this.sequence = [];
    this.audio.play('ls-ready');
    this.audio.loop('ls-study');
    this.finishedSequence();
    this.hits = 20;
    this.totalScore = 0;
    this.score = 10;
    this.enemyLevel = Math.max(0, this.enemyLevel + delta);
    this.swordState = 'rest';
    this.enemyState = 'rest';
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
    console.log(event);
    if (event.toState === 'mighty') {
      if (this.totalScore > 30) {
        this.audio.play('ls-block1');
        this.winMatch();
      } else {
        // play taunt "ah ah not yet jedi!"
        this.swordState = 'rest';
      }
    }
    if (this.currentAction && this.currentAction.name == event.toState) {
      this.checkAction();
      this.swordState = 'rest';
    }
  }

  enemyStateWithParameters() {
    return {value: this.enemyState, params: {delay: this.currentDelay()}}
  }
  currentDelay(): number {
    return 300 + 1000 *  3 / (1 + this.enemyLevel);
  }

  enemyDone(event: any) {
    if (event.toState === 'dead' && this.enemyState === 'dead') {
      // enemy is dead dead
    }
    if (event.toState === 'rest' && this.enemyState === 'rest' && this.swordState != 'dead') {
      this.tickers.once('rest', 800, () => {
        this.ready = true;
        this.levelUp();
        this.scoreStartCountDown();
      });
    }
    if (event.toState === this.enemyState && this.enemyState.startsWith('swing') && this.enemyState != this.swordState) {
      this.audio.play('grunt1');
      this.hitsStartCountUp(50);
    }
  }

  checkAction() {
    if (this.current(this.currentAction)) {
      this.tickers.stop('hits');
      this.tickers.stop('score');
      this.totalScore = this.totalScore + this.score;
      this.score = 10;
      this.audio.play(this.currentAction.sound);
      this.step++;
      if (this.step >= this.sequence.length) {
        if (this.totalScore > 200) {        
          this.winMatch();
        } else {
          this.finishedSequence()
        }
      } else {
        this.enemyState = this.sequence[this.step];
        this.scoreStartCountDown();
      }
    } else {
      this.audio.play(`miss${this.games.randomInt(1,2)}`);
    }
  }

  hitsStartCountUp(update: number) {
    this.tickers.loop('hits', update, () => {
      this.hits --;
      if (this.hits < 0) {
        this.loseMatch();
      }
    });
  }

  scoreStartCountDown() {
    this.tickers.loop('score', this.currentDelay() / 10, () => {
      this.score = Math.max(0, this.score - 1);
    });
  }

  finishedSequence() {
    this.swordState = 'rest';
    this.enemyState = 'rest';
    this.ready = false;
    this.tickers.stop('rest');
    this.tickers.stop('hits');
  }

  winMatch() {
    this.audio.stop('ls-study');
    this.audio.play('sheat');
    this.tickers.stop('rest');
    this.tickers.stop('hits');
    this.ready = false;
    this.enemyState = 'dead';
    this.swordState = 'won';
  }

  loseMatch() {
    this.audio.stop('ls-study');
    this.audio.play('sheat');
    this.tickers.stop('rest');
    this.tickers.stop('hits');
    this.ready = false;
    this.enemyState = 'won';
    this.swordState = 'dead';
  }

  clickWin() {
    this.swordState = 'mighty';
  }

  scaleFatal() {
    return `translate(50 50) scale(${Math.max(0, Math.min(0.5, this.totalScore / 15 - 2))}) translate(-50 -50)`;
  }

}
