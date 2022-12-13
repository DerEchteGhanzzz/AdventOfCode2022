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
    var e_1, _a;
    var input = parseLines(lines);
    var stackArray = input[0];
    var actionArray = input[1];
    try {
        for (var actionArray_1 = __values(actionArray), actionArray_1_1 = actionArray_1.next(); !actionArray_1_1.done; actionArray_1_1 = actionArray_1.next()) {
            var action = actionArray_1_1.value;
            var boxArray = stackArray[action[1]].splice(stackArray[action[1]].length - action[0]);
            stackArray[action[2]] = stackArray[action[2]].concat(boxArray.reverse());
        }
    }
    catch (e_1_1) { e_1 = { error: e_1_1 }; }
    finally {
        try {
            if (actionArray_1_1 && !actionArray_1_1.done && (_a = actionArray_1.return)) _a.call(actionArray_1);
        }
        finally { if (e_1) throw e_1.error; }
    }
    return getTopBoxes(stackArray);
}
exports.solveA = solveA;
function solveB(lines) {
    var e_2, _a;
    var input = parseLines(lines);
    var stackArray = input[0];
    var actionArray = input[1];
    try {
        for (var actionArray_2 = __values(actionArray), actionArray_2_1 = actionArray_2.next(); !actionArray_2_1.done; actionArray_2_1 = actionArray_2.next()) {
            var action = actionArray_2_1.value;
            var boxArray = stackArray[action[1]].splice(stackArray[action[1]].length - action[0]);
            stackArray[action[2]] = stackArray[action[2]].concat(boxArray);
        }
    }
    catch (e_2_1) { e_2 = { error: e_2_1 }; }
    finally {
        try {
            if (actionArray_2_1 && !actionArray_2_1.done && (_a = actionArray_2.return)) _a.call(actionArray_2);
        }
        finally { if (e_2) throw e_2.error; }
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
    var e_3, _a, e_4, _b;
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
    try {
        for (var boxes_1 = __values(boxes), boxes_1_1 = boxes_1.next(); !boxes_1_1.done; boxes_1_1 = boxes_1.next()) {
            var level = boxes_1_1.value;
            for (var j = 0; j < stackAmount; j++) {
                var h = j + 1 + 3 * j;
                if (level.charAt(h).match(/[a-z]/i)) {
                    stackArray[j].unshift(level.charAt(h));
                }
            }
        }
    }
    catch (e_3_1) { e_3 = { error: e_3_1 }; }
    finally {
        try {
            if (boxes_1_1 && !boxes_1_1.done && (_a = boxes_1.return)) _a.call(boxes_1);
        }
        finally { if (e_3) throw e_3.error; }
    }
    var actionArray = [];
    try {
        for (var instructions_1 = __values(instructions), instructions_1_1 = instructions_1.next(); !instructions_1_1.done; instructions_1_1 = instructions_1.next()) {
            var instruction = instructions_1_1.value;
            var splitLine = instruction.split(' ');
            actionArray.push([
                parseInt(splitLine[1]),
                parseInt(splitLine[3]) - 1,
                parseInt(splitLine[5]) - 1
            ]);
        }
    }
    catch (e_4_1) { e_4 = { error: e_4_1 }; }
    finally {
        try {
            if (instructions_1_1 && !instructions_1_1.done && (_b = instructions_1.return)) _b.call(instructions_1);
        }
        finally { if (e_4) throw e_4.error; }
    }
    return [stackArray, actionArray];
}
//# sourceMappingURL=day5.js.map