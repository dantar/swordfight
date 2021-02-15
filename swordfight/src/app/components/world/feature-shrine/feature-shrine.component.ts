import { Component, Input, OnInit } from '@angular/core';
import { WorldFeature } from 'src/app/models/game-model';

@Component({
  selector: '[app-feature-shrine]',
  templateUrl: './feature-shrine.component.html',
  styleUrls: ['./feature-shrine.component.scss']
})
export class FeatureShrineComponent implements OnInit {

  @Input() feature: WorldFeature;

  constructor() { }

  ngOnInit(): void {
  }

}
