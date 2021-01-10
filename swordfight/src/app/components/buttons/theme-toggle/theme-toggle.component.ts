import { Component, OnDestroy, OnInit } from '@angular/core';
import { AudioPlayService } from 'src/app/services/audio-play.service';
import { SharedDataService } from 'src/app/services/shared-data.service';

@Component({
  selector: 'app-theme-toggle',
  templateUrl: './theme-toggle.component.html',
  styleUrls: ['./theme-toggle.component.scss']
})
export class ThemeToggleComponent implements OnInit, OnDestroy {

  enabled: boolean;

  constructor(
    private shared: SharedDataService,
    private audio: AudioPlayService,
    ) {}

  ngOnInit(): void {
    this.enabled = false;
  }

  toggleEnabled() {
    this.enabled = !this.enabled;
    if (this.enabled) {
      this.audio.theme();
    } else {
      this.audio.stopTheme();
    }
  }

  ngOnDestroy(): void {
    this.enabled = false;
    this.audio.stopTheme();
  }

}
