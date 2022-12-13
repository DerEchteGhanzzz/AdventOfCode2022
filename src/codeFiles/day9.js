"use strict";
var __values = (this && this.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
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
    var e_1, _a;
    var visited = new Set();
    var headPos = [0, 0];
    var tailPosArray = [];
    for (var i = 0; i < knots; i++) {
        tailPosArray.push([0, 0]);
    }
    try {
        for (var input_1 = __values(input), input_1_1 = input_1.next(); !input_1_1.done; input_1_1 = input_1.next()) {
            var entry = input_1_1.value;
            for (var i = 0; i < entry[1]; i++) {
                updateHead(entry, headPos);
                updateTail(headPos, tailPosArray[0], visited);
                for (var i_1 = 1; i_1 < tailPosArray.length; i_1++) {
                    updateTail(tailPosArray[i_1 - 1], tailPosArray[i_1], visited);
                }
                visited.add(tailPosArray[knots - 1][0].toString().concat(",", tailPosArray[knots - 1][1].toString()));
            }
        }
    }
    catch (e_1_1) { e_1 = { error: e_1_1 }; }
    finally {
        try {
            if (input_1_1 && !input_1_1.done && (_a = input_1.return)) _a.call(input_1);
        }
        finally { if (e_1) throw e_1.error; }
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
    var e_2, _a;
    var lines = inputString.split(/\r?\n/);
    var input = [];
    try {
        for (var lines_1 = __values(lines), lines_1_1 = lines_1.next(); !lines_1_1.done; lines_1_1 = lines_1.next()) {
            var line = lines_1_1.value;
            var splitLine = line.split(' ');
            input.push([splitLine[0], parseInt(splitLine[1])]);
        }
    }
    catch (e_2_1) { e_2 = { error: e_2_1 }; }
    finally {
        try {
            if (lines_1_1 && !lines_1_1.done && (_a = lines_1.return)) _a.call(lines_1);
        }
        finally { if (e_2) throw e_2.error; }
    }
    return input;
}
//# sourceMappingURL=day9.js.map