export function solveA(lines: string) {
    let currents: number[] = parseLines(lines);
    let coordSet = new Set<string>();
    let highestY = 0;

    const blocks = [
        new TetrisBlock([[0, 0], [1, 0], [2, 0], [3, 0]], 0, 3, "-"),
        new TetrisBlock([[1, 0], [0, 1], [1, 1], [2, 1], [1, 2]], 2, 2, "+"),
        new TetrisBlock([[0, 0], [1, 0], [2, 0], [2, 1], [2, 2]], 2, 2, "L"),
        new TetrisBlock([[0, 0], [0, 1], [0, 2], [0, 3]], 3, 0, "|"),
        new TetrisBlock([[0, 0], [1, 0], [0, 1], [1, 1]], 1, 1, "■")
    ]
    let currentIndex = 0;
    for (let i = 0; i < 2022; i++) {

        const currentBlock = blocks[i % 5];
        //console.log(coordSet);
        let newY;
        let _;
        [newY, currentIndex, _] = simulateTetris(coordSet, currentBlock, currents, highestY + 3, currentIndex, i);
        if (newY > highestY) {
            highestY = newY;
        }
        //console.log()
    }

    return highestY;
}

export function solveB(lines: string) {
    let currents: number[] = parseLines(lines);
    let coordSet = new Set<string>();

    let currentIndex = 0;
    let xyDict = new Map();

    const blocks = [
        new TetrisBlock([[0, 0], [1, 0], [2, 0], [3, 0]], 0, 3, "-"),
        new TetrisBlock([[1, 0], [0, 1], [1, 1], [2, 1], [1, 2]], 2, 2, "+"),
        new TetrisBlock([[0, 0], [1, 0], [2, 0], [2, 1], [2, 2]], 2, 2, "L"),
        new TetrisBlock([[0, 0], [0, 1], [0, 2], [0, 3]], 3, 0, "|"),
        new TetrisBlock([[0, 0], [1, 0], [0, 1], [1, 1]], 1, 1, "■")
    ]
    const iterations = 1000000000000;
    let highestY = 0;
    const solutionMap = {blockDiff: 0, heightDiff: 0, startBlocks: 0, startHeight: 0};
    for (let i = 0; i < iterations; i++) {
        const currentBlock = blocks[i % 5];

        let newY;
        let _;
        [newY, currentIndex, _] = advancedTetris(coordSet, currentBlock, currents, highestY + 3, currentIndex, i, solutionMap);
        if (_) {
            break;
        }
        if (newY > highestY) {
            highestY = newY;
        }
        xyDict.set(i, highestY);
    }
    
    return Math.floor(iterations / solutionMap.blockDiff) * solutionMap.heightDiff + xyDict.get(iterations%solutionMap.blockDiff) - 1
}


function advancedTetris(coordSet: Set<string>, currentBlock: TetrisBlock, currents: number[], startingY: number, currentIndex: number, i,
                        solutionMap: {blockDiff: number, heightDiff: number, startBlocks: number, startHeight: number}): [number, number, boolean] {

    let down = 0;
    let xLeft = 2;
    let transposedCoords;
    while (true) {
        let currentCurrent = currents[currentIndex % currents.length];
        if (currentIndex % currents.length === 0 && startingY % 15 === 0 && currentBlock.shape === "|") {
            if (solutionMap.startBlocks === 0) {
                solutionMap.startBlocks = i;
                solutionMap.startHeight = startingY - 3;
            } else {
                solutionMap.blockDiff = i - solutionMap.startBlocks;
                solutionMap.heightDiff = startingY - 3 - solutionMap.startHeight;
                return [currentBlock.highestY + 1 + startingY - down, currentIndex, true]
            }
            console.log(currentBlock.shape, startingY-3,i);
        }
        currentIndex++;

        [transposedCoords, xLeft] = currentBlock.transposedCoordset(
            xLeft, startingY - down,
            coordSet, currentCurrent)
        //console.log(transposedCoords[2], currentCurrent)

        for (let transposedSegment of transposedCoords) {

            if (coordSet.has(JSON.stringify([transposedSegment[0], transposedSegment[1] - 1])) || transposedSegment[1] - 1 < 0) {
                transposedCoords.forEach((a) => coordSet.add(JSON.stringify(a)));
                return [currentBlock.highestY + 1 + startingY - down, currentIndex, false];
            }
        }
        down++;
    }

}

function simulateTetris(coordSet: Set<string>, currentBlock: TetrisBlock, currents: number[], startingY: number, currentIndex: number, i): [number, number, number] {

    let down = 0;
    let xLeft = 2;
    let transposedCoords;
    while (true) {
        let currentCurrent = currents[currentIndex % currents.length];
        if (currentIndex % currents.length === 0 && startingY % 15 === 0 && currentBlock.shape === "|") {
            console.log(currentBlock.shape, startingY-3,i);
        }
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
    constructor(public coordSet: number[][], public highestY: number, public right: number, public shape: string) {
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
