import { Component, OnInit, ViewChild } from '@angular/core';
import { AudioPlayService } from 'src/app/services/audio-play.service';
import { EnemyFighterStats, SharedDataService } from 'src/app/services/shared-data.service';
import { DuelButtonsComponent } from '../duel-buttons/duel-buttons.component';

@Component({
  selector: 'app-orc-training',
  templateUrl: './orc-training.component.html',
  styleUrls: ['./orc-training.component.scss']
})
export class OrcTrainingComponent implements OnInit {

  @ViewChild(DuelButtonsComponent, {static: false}) duelbuttons: DuelButtonsComponent;

  fightWon: boolean;

  constructor(
    public shared: SharedDataService,
    private audio: AudioPlayService,
    ) { }

  ngOnInit(): void {
    this.fightWon = null;
  }

  clickEnemy(enemy: EnemyFighterStats) {
    if (!enemy.locked) {
      this.shared.fightEnemy(enemy);
      this.audio.setTheme('battle-01');
    }
  }

  transformEnemy(enemy: EnemyFighterStats): string {
    let index = this.shared.enemies.indexOf(enemy);
    let x = index % 4;
    let y = (index - x) /4;
    return `translate(${100 * x} ${100 * y})`;
  }

  youWin(won: boolean) {
    if (won) {
      this.shared.unlockNext();
    }
    this.fightWon = won;
  }

  backToMenu() {
    this.fightWon = null;
    this.shared.dropEnemy();
    this.audio.setTheme('theme-01');
  }

  playAgain() {
    this.fightWon = null;
    this.duelbuttons.newGame(0);
  }

  playNext() {
    this.fightWon = null;
    this.shared.fightNext();
    this.duelbuttons.newGame(0);
  }

}
