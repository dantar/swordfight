import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
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

  constructor(
    private games: GamesCommonService,
    private audio: AudioPlayService,
    private tickers: TickersService,
    private swords: SwordsService,
    private shared: SharedDataService,
    private changes: ChangeDetectorRef,
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
    this.audio.setTheme('battle-01');
    this.newGame(0);
  }

  newGame(delta: number): void {
    this.sequence = [];
    this.audio.play(this.swords.sound('ready'));
    this.finishedSequence();
    this.hits = 20;
    this.totalScore = 0;
    this.score = this.shared.swingSpeedScore;
    this.swordState = 'rest';
    this.enemyState = 'rest';
  }

  enemyAttacks() {
    this.assignSwingSpeedBonus();
    this.enemyState = this.sequence[this.step];
    this.scoreStartCountDown();
    this.swordState = 'rest';
  }

  levelUp() {
    this.step = 0;
    if (this.shared.enemyMaxSequenceLength != null && this.sequence.length < this.shared.enemyMaxSequenceLength) {
      this.lastPicked = this.games.randomPick(this.buttons.filter(b => this.lastPicked ? b.name != this.lastPicked : true)).name;
      this.sequence.push(this.lastPicked);
    }
    this.assignSwingSpeedBonus();
    this.enemyState = this.sequence[this.step];
  }

  assignSwingSpeedBonus() {
    this.shared.enemySwingBonus = this.step === this.sequence.length -1 ? 300: 0;
  }

  sameLevel() {
    this.step = 0;
    this.assignSwingSpeedBonus();
    this.enemyState = this.sequence[this.step];
  }

  transform(button: ActionButton): string {
    return `translate(50 50) scale(0.5) rotate(${button.rotate})`;
  }

  style(button: ActionButton): string {
    return `opacity:${this.sequence[this.step] === button.name ? 0.1 : 0};`;
  }

  showButton(button: ActionButton): boolean {
    return (this.sequence[this.step] === button.name) && (
      this.shared.showAllSwingButtons || (this.shared.showLastSwingButtons && this.isLastStep()));
  }

  isLastStep(): boolean {
    return this.step === this.sequence.length-1;
  }

  showFatal(): boolean {
    return (this.enemyState === 'fatal') || (this.isLastStep());
  }

  clickAction(button: ActionButton) {
    if (this.enemyState === 'rest') {
      this.tickers.stop('rest');
      this.levelUp();
      this.scoreStartCountDown();
    }
    this.swordState = button.name;
  }

  swordDone(event: any) {
    if (event.toState === this.swordState) {
      this.checkAction();
      this.swordState = 'rest';
    }
    this.changes.detectChanges();
  }

  enemyDone(event: any) {
    if (event.toState === 'dead' && this.enemyState === 'dead') {
      // enemy is dead dead
    }
    if (event.toState === 'rest' && this.enemyState === 'rest' && this.swordState != 'dead') {
      this.tickers.once('rest', 800, () => {
        this.levelUp();
        this.scoreStartCountDown();
        this.changes.detectChanges();
      });
    }
    if (event.toState === 'fatal' && this.enemyState === 'fatal' && this.swordState != 'dead') {
      this.totalScore = 0;
      this.levelUp();
      this.scoreStartCountDown();
    }
    if (event.toState === this.enemyState && this.enemyState.startsWith('swing') && this.enemyState != this.swordState) {
      this.audio.play(this.swords.sound('grunt'));
      this.hitsStartCountUp(50);
    }
    this.changes.detectChanges();
  }

  checkAction() {
    if (this.swordState === 'fatal') {
      if (this.scaleFatal() > 0) {
        this.audio.play(this.swords.sound('fatal'));
        this.winMatch();
      } else {
        // play taunt "ah ah not yet jedi!"
        this.swordState = 'rest';
      }
    }
    if (this.swordState.startsWith('swing')) {
      this.checkSwing();
    }
  }

  hitsStartCountUp(update: number) {
    this.tickers.loop('hits', update, () => {
      this.hits --;
      if (this.hits < 0) {
        this.loseMatch();
        this.changes.detectChanges();
      }
    });
  }

  scoreStartCountDown() {
    this.tickers.loop('score', 200, () => {
      this.score = Math.max(0, this.score - 1);
      this.changes.detectChanges();
    });
  }

  checkSwing() {
    if (this.swordState === this.enemyState) {
      this.tickers.stop('hits');
      this.tickers.stop('score');
      this.totalScore = this.totalScore + this.score + this.shared.swingStepScore;
      this.score = this.shared.swingSpeedScore;
      this.audio.play(this.swords.sound(this.swordState));
      this.step++;
      if ((this.shared.enemyDefeatScore != null && this.totalScore > this.shared.enemyDefeatScore)
      || (this.shared.enemyMaxSequenceLength != null && this.step >= this.sequence.length && this.sequence.length >= this.shared.enemyMaxSequenceLength)
      ) {
        // hai sferrato un colpo vincente
        this.enemyIsDefeated();
      } else {
        // non hai sferrato un colpo vincente
        if (this.step >= this.sequence.length) {
          // hai sferrato l'ultimo colpo della sequenza (ma non hai vinto)
          this.finishedSequence()
        } else {
          // enemy attaks
          this.enemyAttacks();
        }
      }
    } else {
      // hai sbagliato colpo
      this.audio.play(this.swords.sound('missed'));
      this.swordState = 'rest';
    }
  }

  enemyIsDefeated() {
    this.swordState = 'rest';
    this.enemyState = 'fatal';
    this.tickers.stop('rest');
    this.tickers.stop('hits');
  }

  finishedSequence() {
    this.swordState = 'rest';
    this.enemyState = 'rest';
    this.tickers.stop('rest');
    this.tickers.stop('hits');
  }

  winMatch() {
    this.audio.stop('bs-study');
    this.audio.play(this.swords.sound('sheat'));
    this.tickers.stop('rest');
    this.tickers.stop('hits');
    this.enemyState = 'dead';
    this.swordState = 'won';
    this.shared.unlockNext();
  }

  loseMatch() {
    this.audio.stop('bs-study');
    this.audio.play(this.swords.sound('sheat'));
    this.tickers.stop('rest');
    this.tickers.stop('hits');
    this.enemyState = 'won';
    this.swordState = 'dead';
  }

  clickWin() {
    this.swordState = 'fatal';
  }

  scaleFatal(): number {
    return this.enemyState === 'fatal' ? 0.4: 0;
  }

  transformFatal() {
    return `translate(50 50) scale(${this.scaleFatal()}) translate(-50 -50)`;
  }

  backToMenu() {
    this.shared.dropEnemy();
    this.audio.setTheme('theme-01');
  }

  playAgain() {
    this.newGame(0);
  }

  playNext() {
    this.shared.fightNext();
    this.newGame(0);
  }

}
