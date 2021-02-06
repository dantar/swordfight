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
    last: number;
    next: number;

    life: number;
    mana: number;
  maxLife: number;
  maxMana: number;

}

export class WorldEvent {
    static trigger(we: WorldEvent, shared: SharedDataService) {
        if (we.code === 'orc') {
            let orc: WorldOrc = {
                swings: GamesCommonService.randomInt(1 + shared.world.orcs.length, Math.min(10, 6+shared.world.orcs.length)),
                x: GamesCommonService.randomInt(1, 100),
                y: GamesCommonService.randomInt(1, 100),
            };
            shared.world.orcs.push(orc);
            if (shared.world.orcs.length > 8) {
                let weakest = 0;
                for (let index = 1; index < shared.world.orcs.length; index++) {
                    if (shared.world.orcs[index].swings < shared.world.orcs[weakest].swings) {
                        weakest = index;
                    }
                }
                shared.world.orcs.splice(weakest, 1);
            }
            shared.world.last = we.timestamp;
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