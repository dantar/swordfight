import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActionButton } from 'src/app/models/game-model';
import { AudioPlayService } from 'src/app/services/audio-play.service';
import { SharedDataService } from 'src/app/services/shared-data.service';
import { SwordsItem, SwordsService } from 'src/app/swords.service';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss']
})
export class LandingPageComponent implements OnInit {

  fight: boolean;

  sword: SwordsItem;

  constructor(
    public shared: SharedDataService,
    private audio: AudioPlayService,
    private route: Router,
    ) { }

  ngOnInit(): void {
    this.fight = false;
    this.audio.setTheme('theme-01');
  }

  clickButton() {
    this.fight = true;
    //this.route.navigate(['fight']);
  };

  

}
