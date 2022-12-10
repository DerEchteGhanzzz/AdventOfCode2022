export function solveA(lines: string){
    return simulateRope(parseLines(lines), 1)
}

export function solveB(lines: string){
    return simulateRope(parseLines(lines), 9)
}

function simulateRope(input: [string, number][], knots: number): number{
    const visited = new Set<string>();

    const headPos: [number, number] = [0, 0];

    const tailPosArray: [number, number][] = [];
    for (let i = 0; i < knots; i++){
        tailPosArray.push([0, 0])
    }

    for (let entry of input){
        for (let i = 0; i < entry[1]; i++){
            updateHead(entry, headPos);
            updateTail(headPos, tailPosArray[0], visited)
            for (let i = 1; i < tailPosArray.length; i++){
                updateTail(tailPosArray[i-1], tailPosArray[i], visited)
            }
            visited.add(tailPosArray[knots - 1][0].toString().concat(",", tailPosArray[knots - 1][1].toString()))
        }
    }
    return visited.size;
}

function  updateTail(headPos: [number, number], tailPos: [number, number], visited: Set<string>){

    if (Math.abs(headPos[0] - tailPos[0]) + Math.abs(headPos[1] - tailPos[1]) > 2){
        tailPos[0] += Math.sign(headPos[0] - tailPos[0])
        tailPos[1] += Math.sign(headPos[1] - tailPos[1])
    } else {
        const deltaX: boolean = (Math.abs(headPos[0] - tailPos[0]) > 1);
        const deltaY: boolean = (Math.abs(headPos[1] - tailPos[1]) > 1);

        tailPos[0] = deltaX ? tailPos[0] + Math.sign(headPos[0] - tailPos[0]) : tailPos[0];
        tailPos[1] = deltaY ? tailPos[1] + Math.sign(headPos[1] - tailPos[1]) : tailPos[1];
    }
}

function updateHead(entry: [string, number], headPos: [number, number]){
    switch (entry[0]){
        case "R":
            headPos[0] += 1;
            break;
        case "L":
            headPos[0] -= 1;
            break;
        case "U":
            headPos[1] += 1;
            break;
        case "D":
            headPos[1] -= 1;
            break;
    }
}

function parseLines(inputString: string): [string, number][]{
    let lines = inputString.split(/\r?\n/);

    const input: [string, number][] = []
    for (let line of lines){
        const splitLine = line.split(' ');
        input.push([splitLine[0], parseInt(splitLine[1])])
    }

    return input;
}