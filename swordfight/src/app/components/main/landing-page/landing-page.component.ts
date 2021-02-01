import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActionButton } from 'src/app/models/game-model';
import { AudioPlayService } from 'src/app/services/audio-play.service';
import { EnemyFighterStats, SharedDataService } from 'src/app/services/shared-data.service';
import { SwordsItem, SwordsService } from 'src/app/swords.service';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss']
})
export class LandingPageComponent implements OnInit {

  sword: SwordsItem;
  showOptions: boolean;

  constructor(
    public shared: SharedDataService,
    private audio: AudioPlayService,
    private route: Router,
    ) { }

  ngOnInit(): void {
    this.showOptions = false;
    this.audio.setTheme('theme-01');
  }

  clickOptions() {
    this.showOptions = !this.showOptions;
  }

}

class OrcFightButton {
  level: number;
  locked: boolean;
}