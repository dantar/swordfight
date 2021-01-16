import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SharedDataService {

  theme: string;
  showAllSwingButtons: boolean;
  showLastSwingButtons: boolean;

  constructor() {
    this.showAllSwingButtons = true;
    this.showLastSwingButtons = true;
  }
  
}
