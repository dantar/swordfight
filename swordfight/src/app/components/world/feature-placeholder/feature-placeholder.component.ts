import { Component, Input, OnInit } from '@angular/core';
import { WorldFeature } from 'src/app/models/game-model';

@Component({
  selector: '[app-feature-placeholder]',
  templateUrl: './feature-placeholder.component.html',
  styleUrls: ['./feature-placeholder.component.scss']
})
export class FeaturePlaceholderComponent implements OnInit {

  @Input() feature: WorldFeature;

  constructor() { }

  ngOnInit(): void {
  }

}
