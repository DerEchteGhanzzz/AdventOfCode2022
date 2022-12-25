import {modulo} from "../aocUtils";

export function solveA(lines: string) {

    const startCoords = parseLines(lines);
    SnowStormCache.fastest = undefined; SnowStormCache.positionMap = new Map<number, Set<string>>();
    getFastestPath(startCoords, 1, false);
    const first = SnowStormCache.fastest;

    return SnowStormCache.fastest;
}

export function solveB(lines: string) {

    const startCoords = parseLines(lines);
    const endCoords = {x: SnowStormCache.width - 1, y: -1}

    SnowStormCache.fastest = undefined; SnowStormCache.positionMap = new Map<number, Set<string>>();
    getFastestPath(startCoords, 1, false);
    const first = SnowStormCache.fastest;
    console.log("first trip done in", first, "minutes")
    SnowStormCache.fastest = undefined; SnowStormCache.positionMap = new Map<number, Set<string>>();
    getFastestPath(endCoords, first+1, true);
    const second = SnowStormCache.fastest
    console.log("second trip done trip done in", second - first, "minutes")
    SnowStormCache.fastest = undefined; SnowStormCache.positionMap = new Map<number, Set<string>>();
    getFastestPath(startCoords, second+1, false);
    const third = SnowStormCache.fastest
    console.log("third trip done trip done in", third - second, "minutes")
    return third;
}


function getFastestPath(currentPosition: { x: number, y: number }, round: number, backwards: boolean) {

    let currentDistance;
    if (!backwards){
        currentDistance = Math.abs(currentPosition.x - SnowStormCache.width - 1) + Math.abs(currentPosition.y + 1);
    } else {
        currentDistance = Math.abs(currentPosition.x) + Math.abs(currentPosition.y - SnowStormCache.height);
    }

    if (SnowStormCache.fastest !== undefined && (round + currentDistance) > SnowStormCache.fastest) {
        return;
    }

    let actions =  [[0, -1], [1, 0], [-1, 0], [0, 1], [0, 0]];
    if (backwards) {
        actions =  [[-1, 0], [0, 1], [0, -1], [1, 0], [0, 0]];
    }

    for (let action of actions) {

        if (!backwards && currentPosition.x + action[0] === SnowStormCache.width - 1 && currentPosition.y + action[1] === -1) {

            if (SnowStormCache.fastest === undefined || round < SnowStormCache.fastest) {
                SnowStormCache.fastest = round;
            }
            return;
        }

        if (backwards && currentPosition.x + action[0] === 0 && currentPosition.y + action[1] === SnowStormCache.height) {

            if (SnowStormCache.fastest === undefined || round < SnowStormCache.fastest) {
                SnowStormCache.fastest = round;
            }
            return;
        }

        const nextCoords = (currentPosition.x + action[0]) + "," + (currentPosition.y + action[1]);
        if ((currentPosition.x + action[0] < 0 || currentPosition.x + action[0] >= SnowStormCache.width ||
            currentPosition.y + action[1] < 0 || currentPosition.y + action[1] >= SnowStormCache.height ||
            !SnowStormCache.get(nextCoords, round))) {
            if (backwards) {
                if (!(currentPosition.x === SnowStormCache.width - 1 && currentPosition.y === -1)) {
                    continue;
                }
            } else {
                if (!(currentPosition.x === 0 && currentPosition.y === SnowStormCache.height)) {
                    continue;
                }
            }

        }

        if (SnowStormCache.positionMap.get(round) === undefined) {
            SnowStormCache.positionMap.set(round, new Set<string>());
        }

        if (SnowStormCache.positionMap.get(round).has(nextCoords)) {
            continue;
        }
        SnowStormCache.positionMap.get(round).add(nextCoords);

        const nextPosition = {x: currentPosition.x + action[0], y: currentPosition.y + action[1]}
        getFastestPath(nextPosition, round + 1, backwards)
    }
}


function parseLines(inputString: string): { x: number, y: number } {
    const lines = inputString.split(/\r?\n/);

    SnowStormCache.height = lines.length - 2;
    SnowStormCache.width = lines[0].length - 2;
    const stormMap = new Map<string, Snowstorm>();
    const directions = new Map<string, [number, number]>([[">", [1, 0]], ["<", [-1, 0]], ["v", [0, -1]], ["^", [0, 1]]]);
    const startingCoords = {x: 0, y: SnowStormCache.height};

    for (let j = 1; j < lines.length - 1; j++) {
        const dj = lines.length - 2 - j;
        for (let i = 1; i < lines[0].length - 1; i++) {
            const di = i - 1;
            const coords = di + "," + dj;


            if (lines[j].charAt(i) === ".") {
                continue;
            }

            stormMap.set(coords, new Snowstorm(di, dj, directions.get(lines[j].charAt(i)), lines[j].charAt(i)));
        }
    }
    SnowStormCache.zeroSet = stormMap;
    return startingCoords;
}

class Snowstorm {

    constructor(public startX: number, public startY: number, public direction: [number, number], public letter: string) {

    }

    public getPosition(round: number) {
        return modulo(this.startX + this.direction[0] * round, SnowStormCache.width) + "," + modulo(this.startY + this.direction[1] * round, SnowStormCache.height);
    }
}

export class SnowStormCache {

    public static fastest;
    public static width: number;
    public static height: number;
    public static zeroSet: Map<string, Snowstorm>;
    public static positionMap = new Map<number, Set<string>>();
    private static cache = new Map<string, boolean>();

    public static get(position: string, round: number): boolean {

        if (this.cache.get(position + "," + round) !== undefined) {
            return this.cache.get(position + "," + round);
        }

        const x = parseInt(position.split(',')[0]);
        const y = parseInt(position.split(',')[1]);

        for (let i = 0; i < this.width; i++) {
            //console.log((x + i) % this.width)
            const storm = this.zeroSet.get(((x + i) % this.width) + "," + y);
            if (storm === undefined) {
                continue;
            }
            const stormPos = storm.getPosition(round);
            this.cache.set(stormPos + "," + round, false);
            if (stormPos === position) {
                return false;
            }

        }

        for (let j = 0; j < this.height; j++) {
            const storm = this.zeroSet.get(x + "," + ((j + y) % this.height));
            if (storm === undefined) {
                continue;
            }
            const stormPos = storm.getPosition(round);
            this.cache.set(stormPos + "," + round, false);
            if (stormPos === position) {
                return false;
            }

        }
        this.cache.set(x + "," + y + "," + round, true);
        return this.cache.get(position + "," + round);
    }

}


function manhattan(a: string, b: string) {

    let [x1, y1] = a.split(",");
    let [x2, y2] = b.split(",");
    return Math.abs(parseInt(x1) - parseInt(x2)) + Math.abs(parseInt(y1) - parseInt(y2));

}


function printMap(stormMap: Map<string, Snowstorm[]>, nextCoords: string) {

    for (let j = SnowStormCache.height - 1; j >= 0; j--) {
        let currentLine = "";
        for (let i = 0; i < SnowStormCache.width; i++) {
            const list = stormMap.get(i + ',' + j);
            if (list.length === 0) {
                if (i + ',' + j === nextCoords) {
                    currentLine = currentLine + "E";
                    continue;
                }
                currentLine = currentLine + ".";
                continue;
            }
            if (list.length === 1) {
                currentLine = currentLine + list[0].letter;
                continue;
            }
            currentLine = currentLine + list.length;
        }
        console.log(currentLine);
    }


}