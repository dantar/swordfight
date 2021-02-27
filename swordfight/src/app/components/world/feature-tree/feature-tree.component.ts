import { Component, Input, OnInit } from '@angular/core';
import { WorldFeature } from 'src/app/models/game-model';
import { SharedDataService } from 'src/app/services/shared-data.service';
import { WorldFeatureAdvancement, WorldFeaturesService } from 'src/app/services/world-features.service';

@Component({
  selector: '[app-feature-tree]',
  templateUrl: './feature-tree.component.html',
  styleUrls: ['./feature-tree.component.scss']
})
export class FeatureTreeComponent implements OnInit {

  @Input() feature: WorldFeature;

  constructor() { }

  ngOnInit(): void {
  }

}

WorldFeaturesService.registerItem(
  {
    code: 'tree',
    advancements: (feature: WorldFeature, shared: SharedDataService) => {
      let result: WorldFeatureAdvancement[] = [];
      let tagname = 'incantato';
      let level = feature.tags.filter(t => t.startsWith('incantato')).length +1;
      let manacost = 50 + level*50;
      result.push(
        {
          tag: `${tagname}-${level}`,
          description: 'Incantamento: permette di concentrare +25 mana',
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
        shared.world.maxMana = shared.world.maxMana + (25 * feature.tags.filter(t => t.startsWith('incantato')).length);
      }
    }
  }
);