var readInput = require('./aocUtils').readInput;
function gatherStarFruit(day) {
    var solveA = require("./codeFiles/day" + day).solveA;
    var solveB = require("./codeFiles/day" + day).solveB;
    console.log("Day " + day + ":");
    var start = Date.now();
    console.log("Answer A: " + solveA(readInput(day)) + " in " + (Date.now() - start) + " ms");
    start = Date.now();
    console.log("Answer B: " + solveB(readInput(day)) + " in " + (Date.now() - start) + " ms");
}
var start = Date.now();
for (var day = 1; day <= 25; day++) {
    gatherStarFruit(day.toString());
}
console.log("Expedition complete! " + (Date.now() - start) / 1000 + " s");
//# sourceMappingURL=program.js.map