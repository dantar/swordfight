import { Injectable } from '@angular/core';
import { WorldMapComponent } from '../components/main/world-map/world-map.component';
import { WorldEvent, WorldMapStats, WorldOrc } from '../models/game-model';
import { GamesCommonService } from './games-common.service';

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

  enemies: EnemyFighterStats[];
  enemy: EnemyFighterStats;
  world: WorldMapStats;

  savedGame: SavedGame;
  showMenu: boolean;

  constructor() {
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
    } else {
      this.world = {
        orcs: [],
        updated: new Date().getTime(),
        events: [],
      }
      this.pushOneWorldEvent();
    }
    this.advanceTime();
    this.saveGame();
  }

  advanceTime() {
    let now = new Date().getTime();
    while (now >= this.world.events[0].timestamp) {
      let first:WorldEvent = this.world.events.splice(0, 1)[0];
      WorldEvent.trigger(first, this);
      this.pushOneWorldEvent();
    }
  }

  pushOneWorldEvent() {
    let latest = this.world.events.length > 0 ? this.world.events[this.world.events.length -1].timestamp : new Date().getTime();
    latest = latest + 1000 * 60 * 60 * (4 + GamesCommonService.randomInt(0, 8));
    this.world.events.push({
      code: 'orc',
      timestamp: latest,
    });
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