import { Component, OnInit } from '@angular/core';
import { SharedDataService } from 'src/app/services/shared-data.service';

@Component({
  selector: 'app-game-options',
  templateUrl: './game-options.component.html',
  styleUrls: ['./game-options.component.scss']
})
export class GameOptionsComponent implements OnInit {

  constructor(public shared: SharedDataService) { }

  ngOnInit(): void {
  }

  allSwings(): boolean[] {
    return [
      this.shared.showAllSwingButtons,
      this.shared.showAllSwingButtons,
      this.shared.showAllSwingButtons,
      this.shared.showAllSwingButtons || this.shared.showLastSwingButtons,
    ];
  }

  allSpeeds(): {fill: string; shown: boolean}[] {
    return [
      {fill: '#00ff00', shown: this.shared.enemySwingDelay <= 1000},
      {fill: '#ffff00', shown: this.shared.enemySwingDelay <= 800},
      {fill: '#ff6600', shown: this.shared.enemySwingDelay <= 600},
      {fill: '#ff0000', shown: this.shared.enemySwingDelay <= 400},
    ];
  }

  clickEnemySwingHints() {
    let showAllSwingButtons = ! this.shared.showLastSwingButtons;
    let showLastSwingButtons = this.shared.showAllSwingButtons === this.shared.showLastSwingButtons;
    this.shared.showAllSwingButtons = showAllSwingButtons;
    this.shared.showLastSwingButtons = showLastSwingButtons;
  }

  clickEnemySwingDelay() {
    this.shared.enemySwingDelay = Math.max(400, (this.shared.enemySwingDelay + 200) % 1001);
  }

}
