import { Component, Input, OnInit } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';

let animationParameters = {
  swordSwingScale: 1.2,
}

@Component({
  selector: '[app-enemy-orc]',
  templateUrl: './enemy-orc.component.html',
  styleUrls: ['./enemy-orc.component.scss'],
  animations: [
    trigger('orcSword', [
      // states
      state('won', style({
        transform: 'translate(30px,5px) scale(1) rotate(80deg)',
      }), {params: animationParameters}),
      state('rest', style({
        transform: 'translate(15px,20px) scale(1) rotate(-20deg)',
      }), {params: animationParameters}),
      state('swingA', style({
        transform: 'translate(20px,25px) scale({{swordSwingScale}}) rotate(10deg)',
      }), {params: animationParameters}),
      state('swingB', style({
        transform: 'translate(50px,20px) scale({{swordSwingScale}}) rotate(80deg)',
      }), {params: animationParameters}),
      state('swingC', style({
        transform: 'translate(25px,60px) scale({{swordSwingScale}}) rotate(160deg)',
      }), {params: animationParameters}),
      state('swingD', style({
        transform: 'translate(75px,75px) scale({{swordSwingScale}}) rotate(120deg)',
      }), {params: animationParameters}),
      state('dead', style({
        transform: 'translate(15px,25px) scale(1) rotate(-20deg)',
      }), {params: animationParameters}),
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
export class EnemyOrcComponent implements OnInit {

  @Input() enemyState: string;
  @Input() enemyLevel: number;

  swordSwingScale: 1.2;

  constructor() { }

  ngOnInit(): void {
  }

  enemyStateWithParameters() {
    return {value: this.enemyState, params: {delay: this.currentDelay(), swordSwingScale: 1.2}}
  }

  currentDelay(): number {
    return 300 + 1000 *  3 / (1 + this.enemyLevel);
  }

}
