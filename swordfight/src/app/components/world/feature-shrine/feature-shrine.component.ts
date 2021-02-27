import { Component, Input, OnInit } from '@angular/core';
import { WorldFeature } from 'src/app/models/game-model';
import { SharedDataService } from 'src/app/services/shared-data.service';
import { WorldFeatureAdvancement, WorldFeaturesService } from 'src/app/services/world-features.service';

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

WorldFeaturesService.registerItem(
  {
    code: 'shrine',
    advancements: (feature: WorldFeature, shared: SharedDataService) => {
      let result: WorldFeatureAdvancement[] = [];
      let tagname = 'incantato';
      let level = feature.tags.filter(t => t.startsWith('incantato')).length +1;
      let manacost = 300 + level*100;
      result.push(
        {
          tag: `${tagname}-${level}`,
          description: 'Incantamento: permette di concentrare +100 mana',
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
        shared.world.maxMana = shared.world.maxMana + (100 * feature.tags.filter(t => t.startsWith('incantato')).length);
      }
    }
  }
);