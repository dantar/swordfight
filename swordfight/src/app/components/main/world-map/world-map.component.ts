import { Component, OnInit } from '@angular/core';
import { WorldFeature, WorldHex, WorldOrc } from 'src/app/models/game-model';
import { SharedDataService } from 'src/app/services/shared-data.service';

@Component({
  selector: 'app-world-map',
  templateUrl: './world-map.component.html',
  styleUrls: ['./world-map.component.scss']
})
export class WorldMapComponent implements OnInit {

  panx: number;
  pany: number;
  translatex: number;
  translatey: number;

  orc: WorldOrc;
  fightWon: boolean;

  constructor(public shared: SharedDataService) { }

  ngOnInit(): void {
    this.fightWon = null;
    this.translatex = 0;
    this.translatey = 0;
    this.panx = 0;
    this.pany = 0;
  }

  clickOrc(orc: WorldOrc) {
    if (this.shared.world.life > 0) {
      this.startFight(orc);
    }
  }
  startFight(orc: WorldOrc) {
    this.orc = orc;
    this.shared.fightEnemy({
      maxSequenceLength: orc.swings,
      locked: false,
    });
    this.shared.yourMaxLife = this.shared.world.maxLife;
    this.shared.yourLife = this.shared.world.life;
  }

  clickAckWin() {
    this.shared.world.life = this.shared.yourLife;
    this.fightWon = null;    
    this.shared.dropEnemy();
    this.shared.world.orcs.splice(this.shared.world.orcs.indexOf(this.orc), 1);
    this.shared.world.last = new Date().getTime();
    this.shared.findNextEvent();
    this.shared.saveGame();
  }

  clickAckLose() {
    this.shared.world.life = this.shared.yourLife;
    this.fightWon = null;    
    this.shared.dropEnemy();
    this.shared.saveGame();
  }

  onPan(event: any) {
    console.log('pan', event);
    this.panx = event.deltaX;
    this.pany = event.deltaY;
    if (event.isFinal) {
      this.translatex = this.translatex + this.panx;
      this.translatey = this.translatey + this.pany;
      this.panx = 0;
      this.pany = 0;
      console.log('FINAL pan', event);
    }
  }

  transformMap(): string {
    return `translate(${this.translatex + this.panx} ${this.translatey + this.pany}) translate(40 40)`;
  }

  transformOrc(orc: WorldOrc): string {
    return this.transformHex({x: orc.x, y: orc.y});
  }

  transformHex(hex: WorldHex): string {
    let scale = 0.2;
    return `translate(${(WorldHex.shift(hex) ? 50 * scale : 0) + hex.x * 100 * scale} ${hex.y * 100 * scale}) scale(${scale})`
  }

  clickFeature(feature: WorldFeature) {
    console.log(feature);
  }

}
