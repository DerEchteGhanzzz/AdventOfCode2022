"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.solveB = exports.solveA = void 0;
function solveA(lines) {
    var max = 0;
    var cur = 0;
    for (var _i = 0, lines_1 = lines; _i < lines_1.length; _i++) {
        var line = lines_1[_i];
        if (line === "") {
            if (max < cur) {
                max = cur;
            }
            cur = 0;
            continue;
        }
        cur += parseInt(line);
    }
    return max;
}
exports.solveA = solveA;
function solveB(lines) {
    var elves = [];
    var cur = 0;
    for (var _i = 0, lines_2 = lines; _i < lines_2.length; _i++) {
        var line = lines_2[_i];
        if (line === "") {
            elves.push(cur);
            cur = 0;
            continue;
        }
        cur += parseInt(line);
    }
    elves.sort();
    return elves[elves.length - 1] + elves[elves.length - 2] + elves[elves.length - 3];
}
exports.solveB = solveB;
//# sourceMappingURL=day1.js.map