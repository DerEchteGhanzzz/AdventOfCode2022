"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.solveB = exports.solveA = void 0;
function solveA(lines) {
    var input = parseLines(lines);
    var stackArray = input[0];
    var actionArray = input[1];
    for (var _i = 0, actionArray_1 = actionArray; _i < actionArray_1.length; _i++) {
        var action = actionArray_1[_i];
        var boxArray = stackArray[action[1]].splice(stackArray[action[1]].length - action[0]);
        stackArray[action[2]] = stackArray[action[2]].concat(boxArray.reverse());
    }
    return getTopBoxes(stackArray);
}
exports.solveA = solveA;
function solveB(lines) {
    var input = parseLines(lines);
    var stackArray = input[0];
    var actionArray = input[1];
    for (var _i = 0, actionArray_2 = actionArray; _i < actionArray_2.length; _i++) {
        var action = actionArray_2[_i];
        var boxArray = stackArray[action[1]].splice(stackArray[action[1]].length - action[0]);
        stackArray[action[2]] = stackArray[action[2]].concat(boxArray);
    }
    return getTopBoxes(stackArray);
}
exports.solveB = solveB;
function getTopBoxes(stackArray) {
    var boxes = "";
    for (var k = 0; k < 9; k++) {
        boxes = boxes.concat(stackArray[k].pop());
    }
    return boxes;
}
function parseLines(lines) {
    var input = lines.split(/\r\n\r\n/);
    var boxes = input[0].split(/\r\n/);
    var stackAmount = parseInt(boxes[boxes.length - 1].charAt(boxes[boxes.length - 1].length - 1));
    boxes.pop();
    var instructions = input[1].split(/\r\n/);
    var stackArray = [];
    for (var k = 0; k < stackAmount; k++) {
        stackArray.push([]);
    }
    var i = 0;
    for (var _i = 0, boxes_1 = boxes; _i < boxes_1.length; _i++) {
        var level = boxes_1[_i];
        for (var j = 0; j < stackAmount; j++) {
            var h = j + 1 + 3 * j;
            if (level.charAt(h).match(/[a-z]/i)) {
                stackArray[j].unshift(level.charAt(h));
            }
        }
    }
    var actionArray = [];
    for (var _a = 0, instructions_1 = instructions; _a < instructions_1.length; _a++) {
        var instruction = instructions_1[_a];
        var splitLine = instruction.split(' ');
        actionArray.push([
            parseInt(splitLine[1]),
            parseInt(splitLine[3]) - 1,
            parseInt(splitLine[5]) - 1
        ]);
    }
    return [stackArray, actionArray];
}
//# sourceMappingURL=day5.js.map