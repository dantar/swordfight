import { Component, OnInit } from '@angular/core';
import { ClipboardService } from 'src/app/services/clipboard.service';
import { SharedDataService } from 'src/app/services/shared-data.service';

@Component({
  selector: 'app-fullpage-menu',
  templateUrl: './fullpage-menu.component.html',
  styleUrls: ['./fullpage-menu.component.scss']
})
export class FullpageMenuComponent implements OnInit {

  constructor(private shared: SharedDataService,
    private clipboard: ClipboardService) { }

  ngOnInit(): void {
  }

  clickWorld() {
    this.shared.showMenu = false;
    this.shared.switchToWorldMap();
  }

  clickTraining() {
    this.shared.showMenu = false;
    this.shared.switchToTraining();
  }

  clickResetWorld() {
    this.shared.showMenu = false;
    this.shared.resetWorld();
    this.shared.switchToWorldMap();
  }

  clickCopySavedGame() {
    this.clipboard.copyText(localStorage.getItem('swordfight-saved'));
  }
}
