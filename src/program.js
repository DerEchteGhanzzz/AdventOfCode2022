var readInput = require('./aocUtils').readInput;
var day = "13";
var solveA = require("./codeFiles/day".concat(day)).solveA;
var solveB = require("./codeFiles/day".concat(day)).solveB;
console.log("Day ".concat(day, ":"));
var start = Date.now();
process.stdout.write("Answer A: " + solveA(readInput(day)));
console.log(" in ".concat(Date.now() - start, " ms"));
start = Date.now();
process.stdout.write("Answer B: " + solveB(readInput(day)));
console.log(" in ".concat(Date.now() - start, " ms"));
//# sourceMappingURL=program.js.map