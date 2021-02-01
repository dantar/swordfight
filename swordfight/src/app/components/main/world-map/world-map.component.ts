import { Component, OnInit } from '@angular/core';
import { WorldOrc } from 'src/app/models/game-model';
import { SharedDataService } from 'src/app/services/shared-data.service';

@Component({
  selector: 'app-world-map',
  templateUrl: './world-map.component.html',
  styleUrls: ['./world-map.component.scss']
})
export class WorldMapComponent implements OnInit {

  orc: WorldOrc;

  constructor(public shared: SharedDataService) { }

  ngOnInit(): void {
  }

  clickOrc(orc: WorldOrc) {
    this.orc = orc;
    this.shared.fightEnemy({
      maxSequenceLength: orc.swings,
      locked: false,
    });
  }

  youWin(won: boolean) {
    if (won) {
      this.shared.dropEnemy();
      this.shared.world.orcs.splice(this.shared.world.orcs.indexOf(this.orc), 1);
      this.shared.saveGame();
    }
  }

}