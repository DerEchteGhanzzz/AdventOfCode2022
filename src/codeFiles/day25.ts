import {modulo} from "../aocUtils";

export function solveA(lines: string){
    let input: string[] = parseLines(lines);
    let answer: number = 0;
    for (let entry of input){
        answer += snafuToDec(entry);
    }
    return decToSnafu(answer);
}





export function solveB(lines: string){
    return "Start the blender!"
}


function snafuToDec(snafu: string): number {
    const SNAFU = new Map<string, number>([["3", 3], ["2", 2], ["1", 1], ["0", 0], ["-", -1], ["=", -2]])
    let currentNumber = 0;
    for (let i = 0; i < snafu.length; i++) {
        const di = snafu.length - 1 - i;
        //console.log(entry.charAt(i),SNAFU.get(entry.charAt(i)))
        currentNumber += SNAFU.get(snafu.charAt(i)) * Math.pow(5, di);
    }
    return currentNumber;
}



function decToSnafu(decimal: number): string{
    const rSNAFU = new Map<number, string>([[3, "3"], [2, "2"], [1, "1"], [0, "0"], [-1, "-"], [-2, "="]]);
    let snafu = "";
    let power = 0;
    while (decimal !== 0) {
        for (let i = -2; i < 4; i++){
            if (modulo(decimal - Math.pow(5, power) * i, Math.pow(5, power + 1)) === 0) {
                decimal = decimal - Math.pow(5, power) * i;
                snafu = rSNAFU.get(i).toString() + snafu;
                power++;
                break;
            }
        }
    }
    return snafu;
}

function parseLines(inputString: string): string[]{
    const lines = inputString.split(/\r?\n/);
    const input = []
    for (let line of lines){

    }

    return lines;
}