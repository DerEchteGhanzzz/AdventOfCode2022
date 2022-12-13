export function solveA(lines: string){

    let input = parseLines(lines);
    const stackArray: string[][] = input[0]
    const actionArray: number[][] = input[1]

    for (let action of actionArray){
        let boxArray: string[] = stackArray[action[1]].splice(stackArray[action[1]].length - action[0]);
        stackArray[action[2]] = stackArray[action[2]].concat(boxArray.reverse());
    }
    return getTopBoxes(stackArray);
}

export function solveB(lines: string){

    let input = parseLines(lines);
    const stackArray: string[][] = input[0]
    const actionArray: number[][] = input[1]
    for (let action of actionArray){
        let boxArray: string[] = stackArray[action[1]].splice(stackArray[action[1]].length - action[0]);
        stackArray[action[2]] = stackArray[action[2]].concat(boxArray);
    }
    return getTopBoxes(stackArray);
}

function getTopBoxes(stackArray: string[][]): string{
    let boxes: string = "";
    for (let k = 0; k < 9; k++){
        boxes = boxes.concat(stackArray[k].pop())
    }
    return boxes;
}

function parseLines(lines: string): [string[][], number[][]]{
    const input = lines.split(/\r\n\r\n/);
    const boxes = input[0].split(/\r\n/);
    const stackAmount = parseInt(boxes[boxes.length - 1].charAt(boxes[boxes.length - 1].length - 1));
    boxes.pop();

    const instructions = input[1].split(/\r\n/);
    
    const stackArray: string[][] = [];
    for (let k = 0; k < stackAmount; k++){
        stackArray.push([])
    }
    let i = 0;
    for (let level of boxes){
        for (let j = 0; j < stackAmount; j++){
            let h = j + 1 + 3 * j
            if (level.charAt(h).match(/[a-z]/i)){
                stackArray[j].unshift(level.charAt(h))
            }
        }
    }

    const actionArray: number[][] = [];
    for (let instruction of instructions){
        const splitLine: string[] = instruction.split(' ');
        actionArray.push([
            parseInt(splitLine[1]),
            parseInt(splitLine[3]) - 1,
            parseInt(splitLine[5]) - 1
        ]);
    }
    return [stackArray, actionArray];
}