import { readFileSync } from "fs";
import { join } from 'path';
module.exports

export function readInput(day: string)
{
    return readFileSync(join(__dirname, `/inputFiles/day${day}.txt`), 'utf-8');
}

export function modulo(a: number, n: number) : number{
    return a - Math.abs(n) * Math.floor(a / Math.abs(n))
}