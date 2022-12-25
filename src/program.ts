const {readInput} = require('./aocUtils');

function gatherStarFruit(day) {

    const {solveA} = require(`./codeFiles/day${day}`);
    const {solveB} = require(`./codeFiles/day${day}`);

    console.log(`Day ${day}:`);
    let start = Date.now();
    console.log(`Answer A: ${solveA(readInput(day))} in ${Date.now() - start} ms`);
    start = Date.now();
    console.log(`Answer B: ${solveB(readInput(day))} in ${Date.now() - start} ms`);
}

let start = Date.now();
for (let day = 1; day <= 25; day++) {

    gatherStarFruit(day.toString());

}
console.log(`Expedition complete! ${(Date.now() - start) / 1000} s`)