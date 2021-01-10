import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AudioPlayService {

  audios: { [id: string]: HTMLAudioElement };
  currentTheme: HTMLAudioElement;

  constructor() {
    this.audios = {};
    this.register('ls-ready', 'assets/lightsabre/ready.ogg');
    this.register('ls-block1', 'assets/lightsabre/block1.ogg');
    this.register('ls-block2', 'assets/lightsabre/block2.ogg');
    this.register('ls-study', 'assets/lightsabre/study.ogg');
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
      this.currentTheme.addEventListener('timeupdate', function () {
        var buffer = 1;
        if (this.currentTime > this.duration - buffer) {
          this.currentTime = 0
          this.play()
        }
      });
    }
  }

}
