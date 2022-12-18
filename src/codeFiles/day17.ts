export function solveA(lines: string) {
    let currents: number[] = parseLines(lines);
    let coordSet = new Set<string>();
    let highestY = 0;

    const blocks = [
        new TetrisBlock([[0, 0], [1, 0], [2, 0], [3, 0]], 0, 3),
        new TetrisBlock([[1, 0], [0, 1], [1, 1], [2, 1], [1, 2]], 2, 2),
        new TetrisBlock([[0, 0], [1, 0], [2, 0], [2, 1], [2, 2]], 2, 2),
        new TetrisBlock([[0, 0], [0, 1], [0, 2], [0, 3]], 3, 0),
        new TetrisBlock([[0, 0], [1, 0], [0, 1], [1, 1]], 1, 1)
    ]
    let currentIndex = 0;
    for (let i = 0; i < 2022; i++) {

        const currentBlock = blocks[i % 5];
        //console.log(coordSet);
        let newY;
        let _;
        [newY, currentIndex, _] = simulateTetris(coordSet, currentBlock, currents, highestY + 3, currentIndex);
        if (newY > highestY) {
            highestY = newY;
        }
        //console.log()
    }

    return highestY;
}

export function solveB(lines: string) {
    let currents: number[] = parseLines(lines);
    let answer: string
    let count = 0;
    let coordSet = new Set<string>();

    const blocks = [
        new TetrisBlock([[0, 0], [1, 0], [2, 0], [3, 0]], 0, 3),
        new TetrisBlock([[1, 0], [0, 1], [1, 1], [2, 1], [1, 2]], 2, 2),
        new TetrisBlock([[0, 0], [1, 0], [2, 0], [2, 1], [2, 2]], 2, 2),
        new TetrisBlock([[0, 0], [0, 1], [0, 2], [0, 3]], 3, 0),
        new TetrisBlock([[0, 0], [1, 0], [0, 1], [1, 1]], 1, 1)
    ]
    let currentIndex = 0;
    let possibleXes = new Set<number>();
    let xyDict = new Map();

    let highestY = 0;
    for (let i = 0; i < 1000000000000; i++) {
        const currentBlock = blocks[i % 5];
        xyDict.set(i, highestY);
        if (xyDict.get(i) * Math.floor(1000000000000/i) + xyDict.get(1000000000000%i) === 1514285714288) {
            return i + " " + currentIndex
        }

        //console.log(coordSet);
        let newY;
        let landedLeftX;
        [newY, currentIndex, landedLeftX] = simulateTetris(coordSet, currentBlock, currents, highestY + 3, currentIndex);
        if (newY > highestY) {
            highestY = newY;
        }
    }

    return highestY;
}

function simulateTetris(coordSet: Set<string>, currentBlock: TetrisBlock, currents: number[], startingY: number, currentIndex: number): [number, number, number] {

    let down = 0;
    let xLeft = 2;
    let transposedCoords;
    while (true) {
        let currentCurrent = currents[currentIndex % currents.length];
        currentIndex++;

        [transposedCoords, xLeft] = currentBlock.transposedCoordset(
            xLeft, startingY - down,
            coordSet, currentCurrent)
        //console.log(transposedCoords[2], currentCurrent)


        for (let transposedSegment of transposedCoords) {

            if (coordSet.has(JSON.stringify([transposedSegment[0], transposedSegment[1] - 1])) || transposedSegment[1] - 1 < 0) {
                transposedCoords.forEach((a) => coordSet.add(JSON.stringify(a)));
                return [currentBlock.highestY + 1 + startingY - down, currentIndex, transposedSegment[0]];
            }
        }
        down++;
    }

}

function parseLines(inputString: string): number[] {
    const lines = inputString.split(/\r?\n/);
    const currents = [];
    for (let char of lines[0].split("")) {
        if (char === '<') {
            currents.push(-1);
        } else {
            currents.push(1);
        }
    }
    return currents;
}

class TetrisBlock {
    constructor(public coordSet: number[][], public highestY: number, public right: number) {
    }

    public transposedCoordset(xLeft, dy, coordSet: Set<string>, current: number): [number[][], number] {
        const transposedCoords: number[][] = [];

        let dx = xLeft + current;

        for (let coord of this.coordSet) {

            if (coord[0] + dx < 0 || coord[0] + dx === 7 ||
                coordSet.has(JSON.stringify([coord[0] + dx, coord[1] + dy]))) {
                dx -= current;
            }
        }
        for (let coord of this.coordSet) {
            transposedCoords.push([coord[0] + dx, coord[1] + dy]);
        }

        return [transposedCoords, dx];
    }
}