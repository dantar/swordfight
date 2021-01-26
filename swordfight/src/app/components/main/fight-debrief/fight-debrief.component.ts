import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-fight-debrief',
  templateUrl: './fight-debrief.component.html',
  styleUrls: ['./fight-debrief.component.scss']
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
