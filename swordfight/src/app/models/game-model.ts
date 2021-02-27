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

    life: number;
    gainLifeTime: number;
    mana: number;
    gainManaTime: number;

    // updated stats
    maxLife: number;
    maxMana: number;

    constructor(data: WorldMapStats) {
        this.orcs = data.orcs;
        this.features = data.features;
        this.last = data.last;
        this.next = data.next;
        this.life = data.life;
        this.gainLifeTime = data.gainLifeTime;
        this.mana = data.mana;
        this.gainManaTime = data.gainManaTime;
        this.maxLife = data.maxLife;
        this.maxMana = data.maxMana;
        WorldMapStats.fix(this);
    }

    static fix(data: WorldMapStats) {
        data.orcs = data.orcs ? WorldOrc.filterValid(data.orcs) : [];
        data.features = data.features ? data.features
        .map(f => new WorldFeature(f))
        .sort((a,b) => WorldHex.compare(a.hex,b.hex)) : [];
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
    tags: string[];

    constructor(data: WorldFeature) {
        this.hex = new WorldHex(data.hex);
        this.code = data.code;
        this.tags = data.tags || [];
    }

}

export class WorldHex {
    static compare(a: WorldHex, b: WorldHex): number {
        if (a.y === b.y) {
            return a.x === b.x ? 0: a.x > b.x? 1:-1;
        } else {
            return a.y > b.y? 1:-1;
        }
    }
    static neighbours(hex: WorldHex, steps=1): WorldHex[] {
        let result: WorldHex[] = [];
        for (let y = - steps; y <= steps; y++) {
            let ro = Math.abs(y);
            let deltax = steps - ro;
            let lowerx = hex.x - (WorldHex.shift(hex) ? Math.floor(ro/2): Math.ceil(ro/2));
            let higherx = hex.x + (WorldHex.shift(hex) ? Math.ceil(ro/2): Math.floor(ro/2));
            for (let x = lowerx - deltax; x <= higherx+deltax; x++) {
                if (x != hex.x || y != hex.y) {
                    result.push({x:x , y:y});
                };
            }
        }
        return result;
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
    static upleft(hex: WorldHex, steps = 1): WorldHex {
        return new WorldHex({x: hex.x - (WorldHex.shift(hex)?Math.floor(steps/2):Math.ceil(steps/2)), y: hex.y - steps});
    }
    static upright(hex: WorldHex, steps = 1): WorldHex {
        return new WorldHex({x: hex.x + (WorldHex.shift(hex)?Math.ceil(steps/2):Math.floor(steps/2)), y: hex.y - steps});
    }
    static downleft(hex: WorldHex, steps = 1): WorldHex {
        return new WorldHex({x: hex.x - (WorldHex.shift(hex)?Math.floor(steps/2):Math.ceil(steps/2)), y: hex.y + steps});
    }
    static downright(hex: WorldHex, steps = 1): WorldHex {
        return new WorldHex({x: hex.x + (WorldHex.shift(hex)?Math.ceil(steps/2):Math.floor(steps/2)), y: hex.y + steps});
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