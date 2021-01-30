import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: '[app-stats-life]',
  templateUrl: './stats-life.component.html',
  styleUrls: ['./stats-life.component.scss']
})
export class StatsLifeComponent implements OnInit {

  @Input() value: number;

  constructor() { }

  ngOnInit(): void {
  }

  current100Value() {
    return Math.min(100, Math.max(0, this.value * 100));
  }

}
