import { Component, OnInit } from '@angular/core';
import { ActionButton } from 'src/app/models/game-model';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss']
})
export class LandingPageComponent implements OnInit {

  fight: boolean;
  button: ActionButton;

  constructor() { }

  ngOnInit(): void {
    this.fight = false;
    this.button = {
      name: 'new',
      x: 0,
      y: 0,
      color: '#ff0000',
      scale: 1.0,
    }
  }

  clickButton(button: ActionButton) {
    this.fight = true;
  };

}
