import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AudioPlayService {

  audios: {[id: string]: HTMLAudioElement};
  currentTheme: HTMLAudioElement;

  constructor() {
    this.audios = {};
    this.register('action', 'assets/action.ogg');
    this.register('theme-01', 'assets/theme-01.mp3');
  }

  register(name: string, src: string) {
    let audio = new Audio();
    this.audios[name] = audio;
    audio.src = src;
    audio.load();
  }

  play(name: string) {
    let audio = this.audios[name];
    audio.pause();
    audio.currentTime = 0;
    audio.play();
  }

  theme(name: string) {
    if (this.currentTheme) {
      this.currentTheme.pause();
      this.currentTheme.currentTime = 0;
    }
    if (name && this.audios[name]) {
      this.currentTheme = this.audios[name];
      this.currentTheme.play();
      this.currentTheme.loop = true;
    }
  }

}
