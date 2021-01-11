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
    this.register('ls-block3', 'assets/lightsabre/block3.ogg');
    this.register('ls-block4', 'assets/lightsabre/block4.ogg');
    this.register('ls-study', 'assets/lightsabre/study.ogg');
    this.register('action', 'assets/action.ogg');
    this.register('theme-01', 'assets/theme-01.mp3');
    this.register('battle1', 'assets/lightsabre/battle1.ogg');
    this.register('grunt1', 'assets/lightsabre/grunt1.ogg');
    this.register('miss1', 'assets/lightsabre/miss1.ogg');
    this.register('miss2', 'assets/lightsabre/miss2.ogg');
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

  loop(name: string) {
    let audio = this.audios[name];
    audio.pause();
    audio.currentTime = 0;
    this._looper(audio);
    audio.play();
  }

  stop(name: string) {
    let audio = this.audios[name];
    audio.pause();
  }

  setTheme(name: string) {
    let playing = false;
    if (this.currentTheme) {
      if (!this.currentTheme.paused) {
        playing = true;
        this.currentTheme.pause();
      }
      this.currentTheme.currentTime = 0;
    }
    if (this.audios[name]) {
      this.currentTheme = this.audios[name];
      this.currentTheme.volume = 0.2;
      this._looper(this.currentTheme);
      if (playing) {
        this.currentTheme.play();
      }
    }

  }

  theme(name?: string) {
    if (name) {
      this.setTheme(name);
    }
    if (this.currentTheme) {
      this._looper(this.currentTheme);
      this.currentTheme.play();
    }
  }

  stopTheme() {
    if (this.currentTheme) {
      this.currentTheme.pause();
    }
  }

  _looper(a: HTMLAudioElement) {
    //a.loop = true;
    a.addEventListener('timeupdate', function () {
      var buffer = 0.40;
      if (this.currentTime > this.duration - buffer) {
        this.currentTime = 0;
        this.play();
      }
    });
  }

}
