import { Component, Input, Output, OnInit, EventEmitter } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { SharedDataService } from 'src/app/services/shared-data.service';

let animationParameters = {
  swordSwingScale: 0.4,
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
        transform: 'translate(45px,50px) scale(1) rotate(70deg)',
      }), {params: animationParameters}),
      state('fatal', style({
        transform: 'translate(50px,90px) scale(1) rotate(90deg)',
      }), {params: animationParameters}),
      state('swingA', style({
        transform: 'translate(20px,25px) scale(1.8) rotate(10deg)',
      }), {params: animationParameters}),
      state('swingB', style({
        transform: 'translate(70px,30px) scale(1.8) rotate(30deg)',
      }), {params: animationParameters}),
      state('swingC', style({
        transform: 'translate(25px,60px) scale(1.8) rotate(190deg)',
      }), {params: animationParameters}),
      state('swingD', style({
        transform: 'translate(70px,75px) scale(1.8) rotate(120deg)',
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
      transition('* => fatal', animate('1000ms')),
    ]),

    trigger('orcShield', [
      // states
      state('won', style({
        transform: 'translate(5px,5px)',
      }), {params: animationParameters}),
      state('rest', style({
        transform: 'scale(1)',
      }), {params: animationParameters}),
      state('fatal', style({
        transform: 'translate(20px,10px)',
      }), {params: animationParameters}),
      state('swingA', style({
        transform: 'translate(5px,5px)',
      }), {params: animationParameters}),
      state('swingB', style({
        transform: 'translate(-5px,-5px)',
      }), {params: animationParameters}),
      state('swingC', style({
        transform: 'translate(5px,-5px)',
      }), {params: animationParameters}),
      state('swingD', style({
        transform: 'translate(5px,-5px)',
      }), {params: animationParameters}),
      state('dead', style({
        transform: 'translate(15px,25px)',
      }), {params: animationParameters}),
      // transitions
      transition('* => swingA', animate('{{delay}}ms')),
      transition('* => swingB', animate('{{delay}}ms')),
      transition('* => swingC', animate('{{delay}}ms')),
      transition('* => swingD', animate('{{delay}}ms')),
      transition('* => rest', animate('800ms')),
      transition('* => won', animate('1000ms')),
      transition('* => dead', animate('400ms')),
      transition('* => fatal', animate('1000ms')),
    ]),

  ],
})
export class EnemyOrcComponent implements OnInit {

  @Input() enemyState: string;
  @Output() enemyDone = new EventEmitter();

  swordSwingScale: 1.2;

  constructor(private shared: SharedDataService) { }

  ngOnInit(): void {
  }

  enemyStateWithParameters() {
    return {value: this.enemyState, params: {delay: this.shared.enemySwingDelay, swordSwingScale: 1.2}}
  }

}
