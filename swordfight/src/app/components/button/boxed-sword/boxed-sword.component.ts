import { Component, Input, OnInit } from '@angular/core';
import { ActionButton } from 'src/app/models/game-model';

@Component({
  selector: '[app-boxed-sword]',
  templateUrl: './boxed-sword.component.html',
  styleUrls: ['./boxed-sword.component.scss']
})
export class BoxedSwordComponent implements OnInit {

  @Input() color: string;

  constructor() { }

  ngOnInit(): void {
  }

}
