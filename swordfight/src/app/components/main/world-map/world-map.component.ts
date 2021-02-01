import { Component, OnInit } from '@angular/core';
import { WorldOrc } from 'src/app/models/game-model';
import { SharedDataService } from 'src/app/services/shared-data.service';

@Component({
  selector: 'app-world-map',
  templateUrl: './world-map.component.html',
  styleUrls: ['./world-map.component.scss']
})
export class WorldMapComponent implements OnInit {

  constructor(public shared: SharedDataService) { }

  ngOnInit(): void {
  }

  clickOrc(orc: WorldOrc) {
    this.shared.fightEnemy({
      maxSequenceLength: orc.swings,
      locked: false,
    });
  }

}
