import { Injectable } from '@angular/core';

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

  constructor() {
    this.swingSpeedScore = 5;
    this.swingStepScore = 2;
    this.enemyDefeatScore = null;
    this.enemyMaxSequenceLength = 1;
    // options
    this.showAllSwingButtons = true;
    this.showLastSwingButtons = true;
    this.enemySwingDelay = 500; // fast
    this.enemySwingBonus = 0;
    this.enemies = [];
    for (let index = 1; index <= 12; index++) {
      this.enemies.push(
        {maxSequenceLength: index, locked: index != 1}
      );
    }
    this.enemy = null;
  }

  unlockNext() {
    this.enemies[this.enemies.indexOf(this.enemy) + 1].locked = false;
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

}

export class EnemyFighterStats {

  maxSequenceLength: number;
  locked: boolean;

}