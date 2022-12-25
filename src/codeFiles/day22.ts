import {modulo} from "../aocUtils";

export function solveA(lines: string) {
    const [faces, directions] = parseLines(lines);

    let currentFace = 0;
    const faceNeighbours = new Map<number, number[]>([[0, [1, 2, 1, 4]], [1, [0, 1, 0, 1]], [2, [2, 4, 2, 0]], [3, [4, 5, 4, 5]], [4, [3, 0, 3, 2]], [5, [5, 3, 5, 3]]]);
    let currentPos = "0,0";

    const turnMap = new Map<number, string>([[0, "R"], [1, "D"], [2, "L"], [3, "U"]]);
    const directionMap = new Map<string, number[]>([["R", [1, 0, 0]], ["D", [0, 1, 1]], ["L", [-1, 0, 2]], ["U", [0, -1, 3]]]);

    let currentDirection = "R";
    for (let operation of directions) {

        if (!Number.isInteger(operation)) {
            operation = operation as string;
            currentDirection = turnMap.get((directionMap.get(currentDirection)[2] + directionMap.get(operation)[2] + 1) % 4);
            continue;
        }

        for (let n = 0; n < operation; n++) {

            const [x, y] = parseCoord(currentPos);
            let newFace = currentFace;
            let [newX, newY] = [x + directionMap.get(currentDirection)[0], y + directionMap.get(currentDirection)[1]];
            if (faces[currentFace].get(newX + "," + newY) === undefined) {
                const directionDigit = directionMap.get(currentDirection)[2];
                newFace = faceNeighbours.get(currentFace)[directionDigit];
                newX = modulo(newX, Face.size);
                newY = modulo(newY, Face.size);
            }
            if (faces[newFace].get(newX + "," + newY) === "#") {
                break;
            }
            currentFace = newFace;
            currentPos = newX + "," + newY;
        }
    }
    const [x, y] = faceCoordsToRealCoords(currentFace, parseCoord(currentPos));
    return 1000 * (y + 1) + 4 * (x + 1) + directionMap.get(currentDirection)[2];
}


export function solveB(lines: string) {
    const [faces, directions] = parseLines(lines);

    let currentFace = 0;
    const faceNeighbours = new Map<number, number[]>([[0, [1, 2, 3, 5]], [1, [4, 2, 0, 5]], [2, [1, 4, 3, 0]], [3, [4, 5, 0, 2]], [4, [1, 5, 3, 2]], [5, [4, 1, 0, 3]]]);
    let currentPos = "0,0";

    const turnMap = new Map<number, string>([[0, "R"], [1, "D"], [2, "L"], [3, "U"]]);
    const directionMap = new Map<string, number[]>([["R", [1, 0, 0]], ["D", [0, 1, 1]], ["L", [-1, 0, 2]], ["U", [0, -1, 3]]]);

    let currentDirection = "R";
    for (let operation of directions) {

        if (!Number.isInteger(operation)) {
            operation = operation as string;
            currentDirection = turnMap.get((directionMap.get(currentDirection)[2] + directionMap.get(operation)[2] + 1) % 4);
            continue;
        }

        for (let n = 0; n < operation; n++) {

            const [x, y] = parseCoord(currentPos);
            let newFace = currentFace;
            let newDirection = currentDirection
            let [newX, newY] = [x + directionMap.get(currentDirection)[0], y + directionMap.get(currentDirection)[1]];
            if (faces[currentFace].get(newX + "," + newY) === undefined) {
                [newX, newY, newDirection, newFace] = getNewCubeFace(newX, newY, directionMap.get(currentDirection), currentFace, faces, faceNeighbours, turnMap);
            }

            if (faces[newFace].get(newX + "," + newY) === "#") {
                break;
            }
            currentDirection = newDirection;
            currentFace = newFace;
            currentPos = newX + "," + newY;
        }
    }
    const [x, y] = faceCoordsToRealCoords(currentFace, parseCoord(currentPos));
    return 1000 * (y + 1) + 4 * (x + 1) + directionMap.get(currentDirection)[2];
}


function getNewCubeFace(x: number, y: number, direction: number[], currentFace: number, faces: Map<string, string>[], faceNeighs: Map<number, number[]>, turnMap: Map<number, string>): [number, number, string, number] {


    const newFace = faceNeighs.get(currentFace)[direction[2]];
    const newDirection = (faceNeighs.get(newFace).indexOf(currentFace) + 2) % 4;
    //console.log()
    //console.log(x, y, "on face", currentFace);
    [x, y] = transpose(x, y, direction[2], direction, newDirection);
    //console.log(x, y, "on face", newFace);
    return [x, y, turnMap.get(newDirection), newFace];
}


function transpose(x, y, direction, vector, newDirection) {

    if (direction === newDirection) {
        return [modulo(x, Face.size), modulo(y, Face.size)]
    }
    if (Math.abs(direction - newDirection) === 2) {
        if (newDirection === 0 || newDirection === 1){
            x = newDirection === 0 ? 0 : modulo((Face.size - 1) - x, Face.size);
            y = newDirection === 1 ? 0 : modulo((Face.size - 1) - y, Face.size);
        } else {
            x = newDirection === 2 ? Face.size - 1 : modulo((Face.size - 1) - x, Face.size);
            y = newDirection === 3 ? Face.size - 1 : modulo((Face.size - 1) - y, Face.size);
        }

        return [x, y]
    }
    if (newDirection == 3) {
        x = Face.size - 1
    }
    if (newDirection == 1) {
        x = 0;
    }
    if (newDirection == 0) {
        y = 0
    }
    if (newDirection == 2) {
        y = Face.size - 1;
    }

    return [y, x];
}


function getBegin(x: number, y: number, direction: number[], grid: Map<string, string>): [number, number] {

    let currentPos = x + "," + y;
    while (grid.get(currentPos) !== undefined) {
        [x, y] = parseCoord(currentPos);
        [x, y] = [x - direction[0], y - direction[1]]
        currentPos = x + "," + y;

    }
    return [x + direction[0], y + direction[1]];
}


function getStartPosition(grid: Map<string, string>) {

    let startPos = "0,0";
    let i = 0;
    while (grid.get(startPos) === undefined) {
        const [x, y] = parseCoord(startPos);
        startPos = (i).toString() + "," + y;
        i++;
    }
    return startPos;
}


function parseCoord(coord: string): [number, number] {

    return [parseInt(coord.split(",")[0]), parseInt(coord.split(",")[1])]

}


function parseLines(inputString: string): [Map<string, string>[], Array<string | number>] {
    const lines = inputString.split(/\r?\n\r?\n/);
    const field = lines[0].split(/\r?\n/);
    const directionString = lines[1].split("");
    const directions: Array<string | number> = [];
    for (let i = 0; i < directionString.length; i++) {

        if (!Number.isNaN(parseInt(directionString[i]))) {
            let currentStep = parseInt(directionString[i]);
            if (!Number.isNaN(parseInt(directionString[i + 1]))) {
                currentStep = currentStep * 10 + parseInt(directionString[i + 1]);
                i++;
            }
            directions.push(currentStep);
        } else {
            directions.push(directionString[i]);
        }
    }
    Face.size = field[0].length / 3;
    const faces = [];
    const zero = new Map<string, string>();
    const one = new Map<string, string>();
    const two = new Map<string, string>();
    const three = new Map<string, string>();
    const four = new Map<string, string>();
    const five = new Map<string, string>();
    for (let j = 0; j < field.length; j++) {
        for (let i = 0; i < field[0].split("").length; i++) {

            if (field[j].charAt(i) === " ") {
                continue;
            }
            const [rI, rJ] = [i % Face.size, j % Face.size]
            if (i < Face.size * 2 && j < Face.size) {
                //console.log((i%50) + "," + (j%50), field[j].charAt(i))
                zero.set(rI + "," + rJ, field[j].charAt(i));
            } else if (j < Face.size) {
                one.set(rI + "," + rJ, field[j].charAt(i));
            } else if (j < Face.size * 2 && i < Face.size * 2) {
                two.set(rI + "," + rJ, field[j].charAt(i));
            } else if (j < Face.size * 3 && i < Face.size) {
                three.set(rI + "," + rJ, field[j].charAt(i));
            } else if (j < Face.size * 3 && i < Face.size * 2) {
                four.set(rI + "," + rJ, field[j].charAt(i));
            } else if (j < Face.size * 4 && i < Face.size) {
                five.set(rI + "," + rJ, field[j].charAt(i));
            }
        }
    }
    faces.push(zero);
    faces.push(one);
    faces.push(two);
    faces.push(three);
    faces.push(four);
    faces.push(five);
    return [faces, directions];
}

function faceCoordsToRealCoords(face: number, [x, y]: number[]) {

    switch (face) {
        case 0:
            return [x + Face.size, y];
        case 1:
            return [x + Face.size * 2, y];
        case 2:
            return [x + Face.size, y + Face.size];
        case 3:
            return [x, y + Face.size * 2];
        case 4:
            return [x + Face.size, y + Face.size * 2];
        case 5:
            return [x, y + Face.size * 3];
    }

}

export class Face {

    public static size = 10;

}