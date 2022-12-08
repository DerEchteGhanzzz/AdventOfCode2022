var readInput = require('./aocUtils').readInput;
var day = "4";
var solveA = require("./codeFiles/day".concat(day)).solveA;
var solveB = require("./codeFiles/day".concat(day)).solveB;
console.log("Day ".concat(day, ":"));
var start = Date.now();
console.log("Answer A:", solveA(readInput(day)), "in ".concat(Date.now() - start, " ms"));
start = Date.now();
console.log("Answer B:", solveB(readInput(day)), "in ".concat(Date.now() - start, " ms"));
//# sourceMappingURL=program.js.map