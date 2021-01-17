import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActionButton } from 'src/app/models/game-model';
import { AudioPlayService } from 'src/app/services/audio-play.service';
import { GamesCommonService } from 'src/app/services/games-common.service';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { TickersService } from 'src/app/services/tickers.service';
import { SwordsService } from 'src/app/swords.service';
import { SharedDataService } from 'src/app/services/shared-data.service';

@Component({
  selector: 'app-duel-buttons',
  templateUrl: './duel-buttons.component.html',
  styleUrls: ['./duel-buttons.component.scss'],
  animations: [
    trigger('thesword', [
      // states
      state('fatal', style({
        transform: 'translate(50px,50px) scale(1.1) rotate(45deg)',
      })),
      state('won', style({
        transform: 'translate(90px,90px) scale(1.5) rotate(20deg)',
      })),
      state('rest', style({
        transform: 'translate(95px,80px) scale(1.5) rotate(20deg)',
      })),
      state('swingA', style({
        transform: 'translate(25px,20px) scale(1.1) rotate(-45deg)',
      })),
      state('swingB', style({
        transform: 'translate(75px,25px) scale(1.1) rotate(-20deg)',
      })),
      state('swingC', style({
        transform: 'translate(25px,75px) scale(1.1) rotate(-90deg)',
      })),
      state('swingD', style({
        transform: 'translate(75px,75px) scale(1.1) rotate(-15deg)',
      })),
      // transitions
      transition('* => swingA', animate('200ms')),
      transition('* => swingB', animate('200ms')),
      transition('* => swingC', animate('200ms')),
      transition('* => swingD', animate('200ms')),
      transition('* => rest', animate('1000ms')),
      transition('* => won', animate('1000ms')),
      transition('* => fatal', animate('100ms')),
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
    private swords: SwordsService,
    private shared: SharedDataService,
  ) { }

  ngOnDestroy(): void {
    this.audio.stop('bs-study');
  }

  ngOnInit(): void {
    this.buttons = [
      { name: 'swingA', rotate: 180, color: '#ffff00', sound: 'block1' },
      { name: 'swingB', rotate: -90, color: '#00ff00', sound: 'block2' },
      { name: 'swingC', rotate: 90, color: '#00ffff', sound: 'block3' },
      { name: 'swingD', rotate: 0, color: '#ff00ff', sound: 'block4' },
    ];
    this.audio.setTheme('battle1');
    this.enemyLevel = 5;
    this.newGame(0);
  }

  newGame(delta: number): void {
    this.sequence = [];
    this.audio.play(this.swords.sound('ready'));
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
    return `translate(50 50) scale(0.5) rotate(${button.rotate})`;
  }

  style(button: ActionButton): string {
    return `opacity:${this.current(button) ? 0.1 : 0};`;
  }

  showButton(button: ActionButton): boolean {
    return (this.sequence[this.step] === button.name) && (
      this.shared.showAllSwingButtons || (this.shared.showLastSwingButtons && this.isLastStep()));
  }

  isLastStep(): boolean {
    return this.step === this.sequence.length-1;
  }

  showFatal(): boolean {
    return this.ready && this.isLastStep();
  }

  current(button: ActionButton): boolean {
    return this.sequence[this.step] === button.name;
  }

  clickAction(button: ActionButton) {
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
    if (event.toState === 'fatal') {
      if (this.scaleFatal() > 0) {
        this.audio.play(this.swords.sound('fatal'));
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
      this.audio.play(this.swords.sound(this.currentAction.name));
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
      this.audio.play(this.swords.sound('missed'));
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
    this.audio.stop('bs-study');
    this.audio.play(this.swords.sound('sheat'));
    this.tickers.stop('rest');
    this.tickers.stop('hits');
    this.ready = false;
    this.enemyState = 'dead';
    this.swordState = 'won';
  }

  loseMatch() {
    this.audio.stop('bs-study');
    this.audio.play(this.swords.sound('sheat'));
    this.tickers.stop('rest');
    this.tickers.stop('hits');
    this.ready = false;
    this.enemyState = 'won';
    this.swordState = 'dead';
  }

  clickWin() {
    this.swordState = 'fatal';
  }

  scaleFatal(): number {
    return Math.max(0, Math.min(0.4, this.totalScore / 10 - 2));
  }

  transformFatal() {
    return `translate(50 50) scale(${this.scaleFatal()}) translate(-50 -50)`;
  }

}
