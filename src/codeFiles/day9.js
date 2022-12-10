"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.solveB = exports.solveA = void 0;
function solveA(lines) {
    return simulateRope(parseLines(lines), 1);
}
exports.solveA = solveA;
function solveB(lines) {
    return simulateRope(parseLines(lines), 9);
}
exports.solveB = solveB;
function simulateRope(input, knots) {
    var visited = new Set();
    var headPos = [0, 0];
    var tailPosArray = [];
    for (var i = 0; i < knots; i++) {
        tailPosArray.push([0, 0]);
    }
    for (var _i = 0, input_1 = input; _i < input_1.length; _i++) {
        var entry = input_1[_i];
        for (var i = 0; i < entry[1]; i++) {
            updateHead(entry, headPos);
            updateTail(headPos, tailPosArray[0], visited);
            for (var i_1 = 1; i_1 < tailPosArray.length; i_1++) {
                updateTail(tailPosArray[i_1 - 1], tailPosArray[i_1], visited);
            }
            visited.add(tailPosArray[knots - 1][0].toString().concat(",", tailPosArray[knots - 1][1].toString()));
        }
    }
    return visited.size;
}
function updateTail(headPos, tailPos, visited) {
    if (Math.abs(headPos[0] - tailPos[0]) + Math.abs(headPos[1] - tailPos[1]) > 2) {
        tailPos[0] += Math.sign(headPos[0] - tailPos[0]);
        tailPos[1] += Math.sign(headPos[1] - tailPos[1]);
    }
    else {
        var deltaX = (Math.abs(headPos[0] - tailPos[0]) > 1);
        var deltaY = (Math.abs(headPos[1] - tailPos[1]) > 1);
        tailPos[0] = deltaX ? tailPos[0] + Math.sign(headPos[0] - tailPos[0]) : tailPos[0];
        tailPos[1] = deltaY ? tailPos[1] + Math.sign(headPos[1] - tailPos[1]) : tailPos[1];
    }
}
function updateHead(entry, headPos) {
    switch (entry[0]) {
        case "R":
            headPos[0] += 1;
            break;
        case "L":
            headPos[0] -= 1;
            break;
        case "U":
            headPos[1] += 1;
            break;
        case "D":
            headPos[1] -= 1;
            break;
    }
}
function parseLines(inputString) {
    var lines = inputString.split(/\r?\n/);
    var input = [];
    for (var _i = 0, lines_1 = lines; _i < lines_1.length; _i++) {
        var line = lines_1[_i];
        var splitLine = line.split(' ');
        input.push([splitLine[0], parseInt(splitLine[1])]);
    }
    return input;
}
//# sourceMappingURL=day9.js.map