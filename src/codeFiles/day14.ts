import {start} from "repl";

export function solveA(lines: string) {
    const [rockSegment, minimum] = parseLines(lines);
    return fillCave(rockSegment, minimum, false);
}

export function solveB(lines: string) {
    const [rockSegment, minimum] = parseLines(lines);
    return fillCave(rockSegment, minimum - 1, true);
}

function fillCave(caveWalls: Set<string>, minimum, isB: boolean) {

    const start = {x: 500, y: 0};
    const filledPositions = new Set<string>();
    let current = {x: start.x, y: start.y};

    while (current.y > minimum || isB) {
        // straight down
        if (!caveWalls.has(coordToString(current.x, current.y - 1)) &&
            !filledPositions.has(coordToString(current.x, current.y - 1)) &&
            current.y > minimum) {
            current.y--;
            continue;
        }
        // down left
        if (!caveWalls.has(coordToString(current.x - 1, current.y - 1)) &&
            !filledPositions.has(coordToString(current.x - 1, current.y - 1)) &&
            current.y > minimum) {
            current.y--;
            current.x--;
            continue;
        }
        // down right
        if (!caveWalls.has(coordToString(current.x + 1, current.y - 1)) &&
            !filledPositions.has(coordToString(current.x + 1, current.y - 1)) &&
            current.y > minimum) {
            current.y--;
            current.x++;
            continue;
        }

        filledPositions.add(coordToString(current.x, current.y));
        current = {x: start.x, y: start.y};

        if (isB && filledPositions.has(coordToString(start.x, start.y))) {
            return filledPositions.size;
        }

    }

    return filledPositions.size;
}

function coordToString(x: number, y: number) {

    return x.toString() + "," + y.toString();

}

function parseLines(inputString: string): [Set<string>, number] {
    const lines = inputString.split(/\r?\n/);
    const caveWalls: Set<string> = new Set<string>();
    let minimum = 0;

    for (let rockStructure of lines) {

        const segmentStrings: string[] = rockStructure.split(' -> ');
        for (let c = 0; c < segmentStrings.length - 1; c++) {

            const startCoords = segmentStrings[c].split(',').map((a) => parseInt(a));
            startCoords[1] = startCoords[1] * -1;
            const endCoords = segmentStrings[c + 1].split(',').map((a) => parseInt(a));
            endCoords[1] = endCoords[1] * -1;

            if (startCoords[1] === endCoords[1]) {
                for (let i = Math.min(startCoords[0], endCoords[0]); i <= Math.max(startCoords[0], endCoords[0]); i++) {

                    caveWalls.add(coordToString(i, startCoords[1]));
                }
            } else {
                for (let j = Math.min(startCoords[1], endCoords[1]); j <= Math.max(startCoords[1], endCoords[1]); j++) {
                    caveWalls.add(coordToString(startCoords[0], j));
                }
            }

            if (Math.min(endCoords[1], startCoords[1]) < minimum) {
                minimum = Math.min(endCoords[1], startCoords[1]);
            }
        }
    }

    return [caveWalls, minimum];
}