import { Component, Input, OnInit } from '@angular/core';
import { WorldFeature } from 'src/app/models/game-model';
import { SharedDataService } from 'src/app/services/shared-data.service';
import { WorldFeatureAdvancement, WorldFeaturesService } from 'src/app/services/world-features.service';

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
