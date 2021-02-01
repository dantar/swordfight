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
    updated: number;

}

export class WorldOrc {

    x: number;
    y: number;
    swings: number;

}