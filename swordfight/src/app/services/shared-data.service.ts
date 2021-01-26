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

  constructor() {
    this.showAllSwingButtons = true;
    this.showLastSwingButtons = true;
    this.swingSpeedScore = 5;
    this.swingStepScore = 2;
    this.enemyDefeatScore = null;
    this.enemyMaxSequenceLength = 1;
    this.enemySwingDelay = 600;
  }

  levelUpSequence(delta: number) {
    this.enemyMaxSequenceLength = Math.max(1, this.enemyMaxSequenceLength + delta);
  }

}
