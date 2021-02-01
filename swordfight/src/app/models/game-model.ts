import { GamesCommonService } from "../services/games-common.service";
import { SharedDataService } from "../services/shared-data.service";

export class SvgPattern {
    fill?: string;
    stroke?: string;
}

export class ActionButton {
    name: string;
    rotate: number;
    color: string;
    sound: string;
}

export class WorldMapStats {

    orcs: WorldOrc[];
    events: WorldEvent[];
    updated: number;

}

export class WorldEvent {
    static trigger(first: WorldEvent, shared: SharedDataService) {
      if (first.code === 'orc') {
          shared.world.orcs.push({
              swings: GamesCommonService.randomInt(2, 8),
              x: GamesCommonService.randomInt(1, 100),
              y: GamesCommonService.randomInt(1, 100),
          });
          shared.world.updated = first.timestamp;
      }
    }
    timestamp: number;
    code: string;
}

export class WorldOrc {

    x: number;
    y: number;
    swings: number;

}