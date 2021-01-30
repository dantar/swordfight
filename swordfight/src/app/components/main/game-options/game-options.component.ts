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
