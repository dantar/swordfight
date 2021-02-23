import { Injectable } from '@angular/core';
import { WorldFeature } from '../models/game-model';
import { SharedDataService } from './shared-data.service';

@Injectable({
  providedIn: 'root'
})
export class WorldFeaturesService {

  static _items: WorldFeatureDef[] = [];
  static registerItem(item: WorldFeatureDef) {
    this._items.push(item);
  }

  items: {[id: string]: WorldFeatureDef};

  constructor() {
    this.items = {};
    WorldFeaturesService._items.forEach(m => this.items[m.code] = m);
  }

}

export class WorldFeatureDef {
  code: string;
  advancements: (feature: WorldFeature, shared: SharedDataService) => WorldFeatureAdvancement[];
  effects: WorldFeatureEffects;
}

export class WorldFeatureEffects {
  maxmana?: (feature: WorldFeature, shared: SharedDataService) => void;
  maxlife?: (feature: WorldFeature, shared: SharedDataService) => void;
}

export class WorldFeatureAdvancement {
  tag: string;
  description: string;
  affordable: (feature: WorldFeature, shared: SharedDataService) => boolean;
  cost: (feature: WorldFeature, shared: SharedDataService) => string;
  pay: (feature: WorldFeature, shared: SharedDataService) => void;
}

