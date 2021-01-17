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

  constructor() {
    this.showAllSwingButtons = true;
    this.showLastSwingButtons = true;
    this.swingSpeedScore = 5;
    this.swingStepScore = 2;
  }
  
}
