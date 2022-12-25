const { modulo } = require('../aocUtils');
export function solveA(lines: string){
    const input = parseLines(lines);
    let answer: number = 0
    for (let match of input){
        const opponent: number = match[0] - "A".charCodeAt(0);
        const you: number = match[1] - "X".charCodeAt(0);
        answer += modulo(you - opponent + 3 + 1, 3) * 3 + you + 1
    }
    return answer
}

export function solveB(lines: string){
    const input = parseLines(lines);
    let answer: number = 0
    for (let match of input){
        const opponent: number = match[0] - "A".charCodeAt(0);
        const outcome: number = match[1] - "X".charCodeAt(0);
        answer += 3 * outcome + modulo(opponent + outcome - 1, 3) + 1
    }
    return answer
}

function parseLines(inputString: string): number[]{
    const lines = inputString.split(/\r?\n/);
    const input = []
    for (let line of lines){
        input.push([line.charCodeAt(0), line.charCodeAt(2)]);
    }
    return input;
}