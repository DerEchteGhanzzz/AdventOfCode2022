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
    var signal = parseLines(lines);
    var answer = 0;
    for (var i = 0; i < signal.length; i += 2) {
        var packageOne = signal[i];
        var packageTwo = signal[i + 1];
        if (comparePackages(packageOne, packageTwo) >= 0) {
            answer += i / 2 + 1;
        }
    }
    return answer;
}
exports.solveA = solveA;
function solveB(lines) {
    var input = parseLines(lines);
    var answer;
    var distressOne = [[2]];
    var distressTwo = [[6]];
    input.push(distressOne);
    input.push(distressTwo);
    input = input.sort(function (a, b) {
        if (comparePackages(a, b) < 0) {
            return 1;
        }
        else {
            return -1;
        }
    });
    return (input.indexOf(distressOne) + 1) * (input.indexOf(distressTwo) + 1);
}
exports.solveB = solveB;
function parseLines(inputString) {
    var e_1, _a;
    var lines = inputString.split(/\r?\n/);
    var input = [];
    try {
        for (var lines_1 = __values(lines), lines_1_1 = lines_1.next(); !lines_1_1.done; lines_1_1 = lines_1.next()) {
            var line = lines_1_1.value;
            if (line.length === 0) {
                continue;
            }
            input.push(JSON.parse(line));
        }
    }
    catch (e_1_1) { e_1 = { error: e_1_1 }; }
    finally {
        try {
            if (lines_1_1 && !lines_1_1.done && (_a = lines_1.return)) _a.call(lines_1);
        }
        finally { if (e_1) throw e_1.error; }
    }
    return input;
}
function comparePackages(packageLeft, packageRight) {
    var sum = 0;
    var i = 0;
    packageLeft = Number.isInteger(packageLeft) ? [packageLeft] : packageLeft;
    packageRight = Number.isInteger(packageRight) ? [packageRight] : packageRight;
    while (sum == 0) {
        if (i == packageLeft.length && i < packageRight.length) {
            return 1;
        }
        else if (i == packageLeft.length && i == packageRight.length) {
            return 0;
        }
        else if (i < packageLeft.length && i == packageRight.length) {
            return -1;
        }
        if (Number.isInteger(packageLeft[i]) && Number.isInteger(packageRight[i])) {
            if (packageLeft[i] < packageRight[i]) {
                return 1;
            }
            else if (packageLeft[i] > packageRight[i]) {
                return -1;
            }
        }
        else {
            sum = comparePackages(packageLeft[i], packageRight[i]);
        }
        i++;
    }
    return sum;
}
//# sourceMappingURL=day13.js.map