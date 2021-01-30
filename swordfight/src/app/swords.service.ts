import { Injectable } from '@angular/core';
import { AudioPlayService } from './services/audio-play.service';
import { GamesCommonService } from './services/games-common.service';

@Injectable({
  providedIn: 'root'
})
export class SwordsService {

  currentSword: SwordsItem;

  setSword(name: string): void {
    this.currentSword = this.items[name];
  }

  sound(sound: string): string {
    return `${this.currentSword.name}-${sound}-${this.games.randomInt(0, this.items[this.currentSword.name][sound].length - 1)}`;
  }

  static _items: SwordsItem[] = [];
  static register(item: SwordsItem) {
    this._items.push(item);
  }

  items: {[name:string]: SwordsItem};

  constructor(
    private audio: AudioPlayService,
    private games: GamesCommonService,
    ) {
    this.items = {};
    SwordsService._items.forEach(item => this.items[item.name] = item);
    SwordsService._items.forEach(item => {
      ['ready', 'loop', 'swingA', 'swingB', 'swingC', 'swingD', 'missed', 'fatal', 'sheat', 'grunt'].forEach(part => {
        let options: string[] = item[part];
        for (let index = 0; index < options.length; index++) {
          this.audio.register(`${item.name}-${part}-${index}`, options[index]);
        }
      }
      )
    });
    this.setSword('broadsword');
  }

}

export class SwordsItem {

  name: string;

  ready: string[];
  loop: string[];
  swingA: string[];
  swingB: string[];
  swingC: string[];
  swingD: string[];
  missed:string[];
  fatal: string[];
  sheat: string[];
  grunt: string[];

}