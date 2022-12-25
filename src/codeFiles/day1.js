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
    var elves = parseLines(lines);
    var mappedElves = elves.map(function (elf) { return elf.reduce(function (total, lunch) { return total + lunch; }, 0); }).sort().reverse();
    return mappedElves[0];
}
exports.solveA = solveA;
function solveB(lines) {
    var elves = parseLines(lines);
    var mappedElves = elves.map(function (elf) { return elf.reduce(function (total, lunch) { return total + lunch; }, 0); }).sort().reverse();
    return mappedElves[0] + mappedElves[1] + mappedElves[2];
}
exports.solveB = solveB;
function parseLines(inputString) {
    var e_1, _a;
    var lines = inputString.split(/\r?\n\r?\n/);
    var elves = [];
    try {
        for (var lines_1 = __values(lines), lines_1_1 = lines_1.next(); !lines_1_1.done; lines_1_1 = lines_1.next()) {
            var elfString = lines_1_1.value;
            var elf = elfString.split(/\r?\n/).map(function (str) { return parseInt(str); });
            elves.push(elf);
        }
    }
    catch (e_1_1) { e_1 = { error: e_1_1 }; }
    finally {
        try {
            if (lines_1_1 && !lines_1_1.done && (_a = lines_1.return)) _a.call(lines_1);
        }
        finally { if (e_1) throw e_1.error; }
    }
    return elves;
}
//# sourceMappingURL=day1.js.map