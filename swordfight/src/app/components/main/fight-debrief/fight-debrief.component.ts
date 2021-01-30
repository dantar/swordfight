import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';

@Component({
  selector: 'app-fight-debrief',
  templateUrl: './fight-debrief.component.html',
  styleUrls: ['./fight-debrief.component.scss'],
  animations: [
    trigger('enterBottom', [
      transition(':enter', [
        style({opacity: 0, transform: 'translateY(100px)'}), 
        animate('1000ms'),
        style({opacity: 1}),
      ]),
    ]),
    trigger('enterRight', [
      transition(':enter', [
        style({opacity: 0, transform: 'translateX(100px)'}), 
        animate('1000ms'),
        style({opacity: 1}),
      ]),
    ]),
    trigger('enterLeft', [
      transition(':enter', [
        style({opacity: 0, transform: 'translateX(-100px)'}), 
        animate('1000ms'),
        style({opacity: 1}),
      ]),
    ]),

  ],
})
export class FightDebriefComponent implements OnInit {

  @Input() enableNext: boolean;
  @Output() playNext = new EventEmitter();
  @Output() playAgain = new EventEmitter();
  @Output() backToMenu = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

}
