const { modulo } = require('../aocUtils');
export function solveA(lines: string[]){

    let answer: number = 0
    for (let line of lines){
        const opponent: number = line.charCodeAt(0) - "A".charCodeAt(0)
        const you: number = line.charCodeAt(2) - "X".charCodeAt(0)
        answer += modulo(you - opponent + 3 + 1, 3) * 3 + you + 1
    }
    return answer
}

export function solveB(lines: string[]){

    let answer: number = 0
    for (let line of lines){
        const opponent: number = line.charCodeAt(0) - "A".charCodeAt(0)
        const outcome: number = line.charCodeAt(2) - "X".charCodeAt(0)
        answer += 3 * outcome + modulo(opponent + outcome - 1, 3) + 1
    }
    return answer
}

