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
var modulo = require('../aocUtils').modulo;
function solveA(lines) {
    var e_1, _a;
    var input = parseLines(lines);
    var answer = 0;
    try {
        for (var input_1 = __values(input), input_1_1 = input_1.next(); !input_1_1.done; input_1_1 = input_1.next()) {
            var match = input_1_1.value;
            var opponent = match[0] - "A".charCodeAt(0);
            var you = match[1] - "X".charCodeAt(0);
            answer += modulo(you - opponent + 3 + 1, 3) * 3 + you + 1;
        }
    }
    catch (e_1_1) { e_1 = { error: e_1_1 }; }
    finally {
        try {
            if (input_1_1 && !input_1_1.done && (_a = input_1.return)) _a.call(input_1);
        }
        finally { if (e_1) throw e_1.error; }
    }
    return answer;
}
exports.solveA = solveA;
function solveB(lines) {
    var e_2, _a;
    var input = parseLines(lines);
    var answer = 0;
    try {
        for (var input_2 = __values(input), input_2_1 = input_2.next(); !input_2_1.done; input_2_1 = input_2.next()) {
            var match = input_2_1.value;
            var opponent = match[0] - "A".charCodeAt(0);
            var outcome = match[1] - "X".charCodeAt(0);
            answer += 3 * outcome + modulo(opponent + outcome - 1, 3) + 1;
        }
    }
    catch (e_2_1) { e_2 = { error: e_2_1 }; }
    finally {
        try {
            if (input_2_1 && !input_2_1.done && (_a = input_2.return)) _a.call(input_2);
        }
        finally { if (e_2) throw e_2.error; }
    }
    return answer;
}
exports.solveB = solveB;
function parseLines(inputString) {
    var e_3, _a;
    var lines = inputString.split(/\r?\n/);
    var input = [];
    try {
        for (var lines_1 = __values(lines), lines_1_1 = lines_1.next(); !lines_1_1.done; lines_1_1 = lines_1.next()) {
            var line = lines_1_1.value;
            input.push([line.charCodeAt(0), line.charCodeAt(2)]);
        }
    }
    catch (e_3_1) { e_3 = { error: e_3_1 }; }
    finally {
        try {
            if (lines_1_1 && !lines_1_1.done && (_a = lines_1.return)) _a.call(lines_1);
        }
        finally { if (e_3) throw e_3.error; }
    }
    return input;
}
//# sourceMappingURL=day2.js.map