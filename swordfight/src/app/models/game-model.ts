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
    features: WorldFeature[];
    last: number;
    next: number;

    maxLife: number;
    maxMana: number;
    life: number;
    mana: number;

    constructor(data: WorldMapStats) {
        WorldMapStats.fix(this);
    }

    static fix(data: WorldMapStats) {
        data.orcs = data.orcs ? WorldOrc.filterValid(data.orcs) : [];
        data.features = data.features ? data.features.map(f => new WorldFeature(f)) : [];
        data.last = data.last ? data.last : new Date().getTime();
        data.next = data.next ? data.next : null;
        data.maxLife =  data.maxLife ? data.maxLife : 10;
        data.maxMana =  data.maxMana ? data.maxMana : 1000;
        data.life =  data.life || data.life === 0 ? data.life : data.maxLife;
        data.mana = data.mana ? data.mana : 0;
    }

}

export class WorldFeature {
    hex: WorldHex;
    code: string;

    constructor(data: WorldFeature) {
        this.hex = new WorldHex(data.hex);
        this.code = data.code;
    }
}

export class WorldHex {
    static neighbours(hex: WorldHex): WorldHex[] {
        let shiftedx = WorldHex.shift(hex) ? hex.x : hex.x-1;
      return [
          new WorldHex({x: hex.x-1, y: hex.y}),
          new WorldHex({x: shiftedx, y: hex.y-1}),
          new WorldHex({x: shiftedx+1, y: hex.y-1}),
          new WorldHex({x: hex.x+1, y: hex.y}),
          new WorldHex({x: shiftedx+1, y: hex.y+1}),
          new WorldHex({x: shiftedx, y: hex.y+1}),
      ];
    }

    x: number;
    y: number;

    constructor(data: WorldHex) {
        this.x = data.x;
        this.y = data.y;
    }

    static id(hex: WorldHex): string {
        return `${hex.x}:${hex.y}`;
    }
    id?(): string {
        return WorldHex.id(this);
    }

    static shift(hex: WorldHex): boolean {
        return Math.abs((hex.y % 2)) === 1;
    }
    shift?(): boolean {
        return WorldHex.shift(this);
    }

}

export class WorldEvent {
    static trigger(we: WorldEvent, shared: SharedDataService) {
        if (we.code === 'orc') {
            let hex = GamesCommonService.randomPick(
                shared.world.features.filter(f => 
                    !shared.world.orcs
                    .map(orc => WorldHex.id(orc.hex))
                    .includes(WorldHex.id(f.hex))
                )).hex;
            let orc: WorldOrc = {
                swings: GamesCommonService.randomInt(1 + shared.world.orcs.length, Math.min(10, 6+shared.world.orcs.length)),
                hex: hex,
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
    static filterValid(orcs: WorldOrc[]): WorldOrc[] {
        return orcs.filter(o => o.hex);
    }

    hex: WorldHex;
    swings: number;

}