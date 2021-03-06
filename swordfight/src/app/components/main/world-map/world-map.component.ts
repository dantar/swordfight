import { Component, OnInit } from '@angular/core';
import { WorldFeature, WorldHex, WorldOrc } from 'src/app/models/game-model';
import { SharedDataService } from 'src/app/services/shared-data.service';
import { WorldFeatureAdvancement, WorldFeaturesService } from 'src/app/services/world-features.service';

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

  innerWidth: number;
  innerHeight: number;

  currentFeature: WorldFeature;

  constructor(
    public shared: SharedDataService,
    public features: WorldFeaturesService,
    ) { }

  ngOnInit(): void {
    this.fightWon = null;
    this.translatex = 0;
    this.translatey = 0;
    this.panx = 0;
    this.pany = 0;
    this.innerWidth = window.innerWidth;
    this.innerHeight = window.innerHeight;
    this.currentFeature = null;
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
    let ratio = 100 / Math.min(this.innerWidth, this.innerHeight);
    this.panx = event.deltaX * ratio;
    this.pany = event.deltaY * ratio;
    if (event.isFinal) {
      this.translatex = this.translatex + this.panx;
      this.translatey = this.translatey + this.pany;
      this.panx = 0;
      this.pany = 0;
    }
  }

  transformMap(): string {
    return `translate(${this.translatex + this.panx} ${this.translatey + this.pany}) translate(40 40)`;
  }

  transformHex(hex: WorldHex): string {
    let scale = 0.2;
    return `translate(${(WorldHex.shift(hex) ? 50 * scale : 0) + hex.x * 100 * scale} ${hex.y * 100 * scale}) scale(${scale})`
  }

  clickFeature(feature: WorldFeature) {
    this.currentFeature = feature;
  }

  findAdvancements(): WorldFeatureAdvancement[] {
    if (this.features.items[this.currentFeature.code]) {
      return this.features.items[this.currentFeature.code].advancements(this.currentFeature, this.shared);
    }
    return [];
  }

  clickBuyAdvancement(advancement: WorldFeatureAdvancement) {
    if (advancement.affordable(this.currentFeature, this.shared)) {
      advancement.pay(this.currentFeature, this.shared);
      this.shared.updateWorldStats();
      this.shared.saveGame();
    }
  }

}

