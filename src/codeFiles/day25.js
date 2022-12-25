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
var aocUtils_1 = require("../aocUtils");
function solveA(lines) {
    var e_1, _a;
    var input = parseLines(lines);
    var answer = 0;
    try {
        for (var input_1 = __values(input), input_1_1 = input_1.next(); !input_1_1.done; input_1_1 = input_1.next()) {
            var entry = input_1_1.value;
            answer += snafuToDec(entry);
        }
    }
    catch (e_1_1) { e_1 = { error: e_1_1 }; }
    finally {
        try {
            if (input_1_1 && !input_1_1.done && (_a = input_1.return)) _a.call(input_1);
        }
        finally { if (e_1) throw e_1.error; }
    }
    return decToSnafu(answer);
}
exports.solveA = solveA;
function solveB(lines) {
    return "Start the blender!";
}
exports.solveB = solveB;
function snafuToDec(snafu) {
    var SNAFU = new Map([["3", 3], ["2", 2], ["1", 1], ["0", 0], ["-", -1], ["=", -2]]);
    var currentNumber = 0;
    for (var i = 0; i < snafu.length; i++) {
        var di = snafu.length - 1 - i;
        currentNumber += SNAFU.get(snafu.charAt(i)) * Math.pow(5, di);
    }
    return currentNumber;
}
function decToSnafu(decimal) {
    var rSNAFU = new Map([[3, "3"], [2, "2"], [1, "1"], [0, "0"], [-1, "-"], [-2, "="]]);
    var snafu = "";
    var power = 0;
    while (decimal !== 0) {
        for (var i = -2; i < 4; i++) {
            if (aocUtils_1.modulo(decimal - Math.pow(5, power) * i, Math.pow(5, power + 1)) === 0) {
                decimal = decimal - Math.pow(5, power) * i;
                snafu = rSNAFU.get(i).toString() + snafu;
                power++;
                break;
            }
        }
    }
    return snafu;
}
function parseLines(inputString) {
    var e_2, _a;
    var lines = inputString.split(/\r?\n/);
    var input = [];
    try {
        for (var lines_1 = __values(lines), lines_1_1 = lines_1.next(); !lines_1_1.done; lines_1_1 = lines_1.next()) {
            var line = lines_1_1.value;
        }
    }
    catch (e_2_1) { e_2 = { error: e_2_1 }; }
    finally {
        try {
            if (lines_1_1 && !lines_1_1.done && (_a = lines_1.return)) _a.call(lines_1);
        }
        finally { if (e_2) throw e_2.error; }
    }
    return lines;
}
//# sourceMappingURL=day25.js.map