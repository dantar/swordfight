import { Injectable } from '@angular/core';
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
    if (this.savedGame.world && this.savedGame.world.last && this.savedGame.world.next && this.savedGame.world.orcs) {
      this.world = this.savedGame.world;
    } else {
      this.world = {
        orcs: [],
        last: new Date().getTime(),
        next: null,
      }
    }
    if (!this.world.next) {
      this.findNextEvent();
    }
    this.advanceTime();
    this.saveGame();
  }

  advanceTime() {
    let now = new Date().getTime();
    while (now >= this.world.next) {
      this.pushOneWorldEvent();
      this.findNextEvent();
    }
  }

  findNextEvent() {
    let delays: number[] = [
      1000 * 60 * 5, 
      1000 * 60 * 10, 
      1000 * 60 * 15, 
      1000 * 60 * 30, 
      1000 * 60 * 60, 
      1000 * 60 * 60 * 4, 
      1000 * 60 * 60 * 12, 
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