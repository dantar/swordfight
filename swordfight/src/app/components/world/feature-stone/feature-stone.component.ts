import { Component, Input, OnInit } from '@angular/core';
import { WorldFeature } from 'src/app/models/game-model';
import { SharedDataService } from 'src/app/services/shared-data.service';
import { WorldFeatureAdvancement, WorldFeaturesService } from 'src/app/services/world-features.service';

@Component({
  selector: '[app-feature-stone]',
  templateUrl: './feature-stone.component.html',
  styleUrls: ['./feature-stone.component.scss']
})
export class FeatureStoneComponent implements OnInit {

  @Input() feature: WorldFeature;

  constructor() { }

  ngOnInit(): void {
  }

}

WorldFeaturesService.registerItem(
  {
    code: 'stone',
    advancements: (feature: WorldFeature, shared: SharedDataService) => {
      let result: WorldFeatureAdvancement[] = [];
      let tagname = 'robusto';
      let level = feature.tags.filter(t => t.startsWith('robusto')).length +1;
      let manacost = 250 + level*250;
      result.push(
        {
          tag: `${tagname}-${level}`,
          description: 'Robusto: permette di avere +1 vita',
          cost: (feature: WorldFeature, shared: SharedDataService) => `${manacost} mana`,
          pay: (feature: WorldFeature, shared: SharedDataService) => {
            shared.spendMana(manacost);
            feature.tags.push(`${tagname}-${level}`)
          },
          affordable: (feature: WorldFeature, shared: SharedDataService) => shared.checkMana(manacost),
        }
      );
      return result;
    },
    effects: {
      maxmana: (feature: WorldFeature, shared: SharedDataService) => {
        shared.world.maxLife = shared.world.maxLife + (1 * feature.tags.filter(t => t.startsWith('robusto')).length);
      }
    }
  }
);