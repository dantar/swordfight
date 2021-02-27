import { Injectable } from '@angular/core';
import { WorldEvent, WorldFeature, WorldHex, WorldMapStats, WorldOrc } from '../models/game-model';
import { GamesCommonService } from './games-common.service';
import { WorldFeaturesService } from './world-features.service';

@Injectable({
  providedIn: 'root'
})
export class SharedDataService {

  theme: string;
  showAllSwingButtons: boolean;
  showLastSwingButtons: boolean;
  swingSpeedScore: number;
  swingStepScore: number;
  enemyDefeatScore: number;
  enemyMaxSequenceLength: number;
  enemySwingDelay: number;
  enemySwingBonus: number;
  yourLife: number;
  yourMaxLife: number;

  enemies: EnemyFighterStats[];
  enemy: EnemyFighterStats;
  world: WorldMapStats;

  savedGame: SavedGame;
  showMenu: boolean;

  constructor(
    private features: WorldFeaturesService,
  ) {
    this.showMenu = false;
    this.swingSpeedScore = 5;
    this.swingStepScore = 2;
    this.enemyDefeatScore = null;
    this.enemyMaxSequenceLength = 1;
    // options
    //
    let saved = localStorage.getItem('swordfight-saved');
    if (saved) {
      this.savedGame = JSON.parse(saved);
      this.loadGame();
    } else {
      this.showAllSwingButtons = true;
      this.showLastSwingButtons = true;
      this.enemySwingDelay = 800;
      this.saveGame();
    }
    this.switchToTraining();
    this.enemy = null;
    this.enemySwingBonus = 0;
  }

  loadGame() {
    this.showAllSwingButtons = this.savedGame.showAllSwingButtons;
    this.showLastSwingButtons = this.savedGame.showLastSwingButtons;
    this.enemySwingDelay = this.savedGame.enemySwingDelay;
  }

  saveGame() {
    if (!this.savedGame) {
      this.savedGame = new SavedGame();
    }
    this.savedGame.version = '1.0';
    this.savedGame.showAllSwingButtons = this.showAllSwingButtons;
    this.savedGame.showLastSwingButtons = this.showLastSwingButtons;
    this.savedGame.enemySwingDelay = this.enemySwingDelay;
    if (this.enemies) this.savedGame.progress = this.enemies.filter(e => !e.locked).length;
    if (this.world) this.savedGame.world = this.world;
    localStorage.setItem('swordfight-saved', JSON.stringify(this.savedGame));
  }

  unlockNext() {
    this.enemies[this.enemies.indexOf(this.enemy) + 1].locked = false;
    this.saveGame();
  }

  fightNext() {
    this.enemy = this.enemies[this.enemies.indexOf(this.enemy) + 1];
    this._setupstats();
  }

  dropEnemy() {
    this.enemy = null;
  }

  private _setupstats() {
    this.enemyMaxSequenceLength = this.enemy.maxSequenceLength;
    this.yourMaxLife = 20;
    this.yourLife = this.yourMaxLife;
  }

  fightEnemy(enemy: EnemyFighterStats) {
    this.enemy = enemy;
    this._setupstats();
  }

  switchToTraining() {
    this.world = null;
    this.enemies = [];
    for (let index = 1; index <= 12; index++) {
      this.enemies.push(
        {maxSequenceLength: index, locked: index != 1}
      );
    }
    for (let index = 0; index < this.savedGame.progress; index++) {
      this.enemies[index].locked = false;
    }
  }
  switchToWorldMap() {
    this.enemies = null;
    if (this.savedGame.world) {
      this.world = this.savedGame.world;
      WorldMapStats.fix(this.world);
    } else {
      this.world = new WorldMapStats({
        orcs: [],
        features: [],
        last: new Date().getTime(),
        next: null,
        life: 10,
        mana: 0,
        maxLife : 10,
        maxMana: 1000,
        gainLifeTime: 0,
        gainManaTime: 0,
      });
    }
    if (this.world.features.length === 0) {
      this.generateWorldFeatures();
    }
    this.updateWorldStats();
    if (!this.world.next) {
      this.world.next = new Date().getTime();
    }
    this.advanceTime();
    this.saveGame();
  }

  generateWorldFeatures() {
    let featurePicker = new FeaturePicker();
    let shrine = new WorldFeature({hex: {x: 0, y:0}, code: 'shrine', tags: []});
    this.world.features.push(shrine);
    WorldHex.neighbours(shrine.hex, 2)
    .forEach(h => this.world.features.push(featurePicker.pickForHex(h)))
    ;
    this.world.features.sort((a,b) => WorldHex.compare(a.hex,b.hex));
  }

  updateWorldStats() {
    this.world.maxMana = 1000;
    this.world.maxLife = 10;
    this.world.features
    .filter(f => this.features.items[f.code])
    .forEach(f => {
      if (this.features.items[f.code].effects.maxmana) {
        this.features.items[f.code].effects.maxmana(f, this);
      }
      if (this.features.items[f.code].effects.maxlife) {
        this.features.items[f.code].effects.maxlife(f, this);
      }
    });
  }

  advanceTime() {
    let now = new Date().getTime();
    while (now >= this.world.next) {
      let delta = this.world.next - this.world.last;
      this.gainLife(delta);
      this.gainMana(delta);
      this.pushOneWorldEvent();
      this.findNextEvent();
    }
    this.gainLife(now - this.world.last);
    this.gainMana(now - this.world.last);
    this.world.last = now;
  }
  gainLife(delta: number) {
    this.world.gainLifeTime = (this.world.gainLifeTime ? this.world.gainLifeTime: 0) + delta;
    let timeCost = 1000 * 60 * 15;
    while (this.world.gainLifeTime >= timeCost) {
      this.world.life = Math.min(this.world.maxLife, this.world.life + 1);
      this.world.gainLifeTime = this.world.gainLifeTime - timeCost;
    }
  }
  gainMana(delta: number) {
    this.world.gainManaTime = (this.world.gainManaTime ? this.world.gainManaTime: 0) + delta;
    let timeCost = 1000 * 60 * (1 + this.world.orcs.length);
    while (this.world.gainManaTime >= timeCost) {
      this.world.mana = Math.min(this.world.maxMana, this.world.mana + 1);
      this.world.gainManaTime = this.world.gainManaTime - timeCost;
    }
  }

  findNextEvent() {
    let delays: number[] = [
      1000 * 60 * 10, 
      1000 * 60 * 15, 
      1000 * 60 * 30, 
      1000 * 60 * 60, 
      1000 * 60 * 60 * 4, 
      1000 * 60 * 60 * 12, 
      1000 * 60 * 60 * 24, 
    ]
    let headcount = Math.min(delays.length-1, this.world.orcs.length);
    let delay = delays[headcount] * (GamesCommonService.randomInt(1, 6) + GamesCommonService.randomInt(1, 6));
    this.world.next = this.world.last + delay;
  }

  pushOneWorldEvent() {
    let we: WorldEvent = {
      code: 'orc',
      timestamp: this.world.next,
    }
    WorldEvent.trigger(we, this);
  }

  // world methods

  spendMana(v: number) {
    this.world.mana = Math.max(0, this.world.mana - v);
  }

  checkMana(v: number): boolean {
    return this.world.mana > v;
  }

}

export class FeaturePicker {
  palette = ['tree', 'tree', 'bush', 'grass', 'stone'];
  features: string[] = [];
  pickForHex(h: WorldHex): WorldFeature {
    if (this.features.length == 0) {
      this.features = this.palette.map(f=>f);
    }
    return {hex: h, code: GamesCommonService.randomPop(this.features), tags: []};
  }
}

export class EnemyFighterStats {

  maxSequenceLength: number;
  locked: boolean;

}

class SavedGame {
  version: string;
  showAllSwingButtons: boolean;
  showLastSwingButtons: boolean;
  enemySwingDelay: number;
  progress: number;
  world?: WorldMapStats;
}