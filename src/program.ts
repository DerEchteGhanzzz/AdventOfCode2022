const { readInput } = require('./aocUtils');

const day = "10";

const { solveA } = require(`./codeFiles/day${day}`);
const { solveB } = require(`./codeFiles/day${day}`);

console.log(`Day ${day}:`);
let start = Date.now();
process.stdout.write(`Answer A: ` + solveA(readInput(day)));
console.log(` in ${Date.now() - start} ms`)
start = Date.now();
process.stdout.write(`Answer B: ` + solveB(readInput(day)));
console.log(` in ${Date.now() - start} ms`)