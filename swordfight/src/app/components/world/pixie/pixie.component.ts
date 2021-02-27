import { Component, OnInit } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { TickersService } from 'src/app/services/tickers.service';
import { GamesCommonService } from 'src/app/services/games-common.service';

@Component({
  selector: '[app-pixie]',
  templateUrl: './pixie.component.html',
  styleUrls: ['./pixie.component.scss'],
  animations: [
    trigger('pulse', [
      // states
      state('growing', style({opacity: 1,})),
      state('fading', style({opacity: 0,})),
      // transitions
      transition('growing => fading', animate('2000ms')),
      transition('fading => growing', animate('2000ms')),
    ]),
  ],

})
export class PixieComponent implements OnInit {

  state: string;
  cx: number;
  cy: number;

  constructor(
    private tickers: TickersService,
    private games: GamesCommonService,
  ) { }

  ngOnInit(): void {
    this.state = 'fading';
    this.randomPulse();
  }
  randomPulse() {
    this.cx = this.games.randomInt(5, 95);
    this.cy = this.games.randomInt(5, 95);
    this.tickers.once(`enter-${new Date().getTime()}-${this.games.randomInt(0,99999)}`, this.games.randomInt(100, 2000), () => {
      this.state = 'growing';
    })
  }

  pulseDone(event: any) {
    switch (event.toState) {
      case 'fading':
        this.randomPulse();
        break;
      case 'growing':
        this.state = 'fading';
        break;
      default:
        break;
    }
  }

}
