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
    var answer = 0;
    try {
        for (var lines_1 = __values(lines), lines_1_1 = lines_1.next(); !lines_1_1.done; lines_1_1 = lines_1.next()) {
            var line = lines_1_1.value;
            var strElves = line.split(',');
            var elfOne = strElves[0].split('-').map(function (x) { return parseInt(x, 10); });
            var elfTwo = strElves[1].split('-').map(function (x) { return parseInt(x, 10); });
            var elfOneAmount = elfOne[1] - elfOne[0];
            var elfTwoAmount = elfTwo[1] - elfTwo[0];
            var smallest = elfOneAmount < elfTwoAmount ? elfOne : elfTwo;
            var biggest = elfOneAmount < elfTwoAmount ? elfTwo : elfOne;
            if (biggest[0] <= smallest[0] && smallest[1] <= biggest[1]) {
                answer++;
            }
        }
    }
    catch (e_1_1) { e_1 = { error: e_1_1 }; }
    finally {
        try {
            if (lines_1_1 && !lines_1_1.done && (_a = lines_1.return)) _a.call(lines_1);
        }
        finally { if (e_1) throw e_1.error; }
    }
    return answer;
}
exports.solveA = solveA;
function solveB(lines) {
    var e_2, _a;
    var answer = 0;
    try {
        for (var lines_2 = __values(lines), lines_2_1 = lines_2.next(); !lines_2_1.done; lines_2_1 = lines_2.next()) {
            var line = lines_2_1.value;
            var strElves = line.split(',');
            var elfOne = strElves[0].split('-').map(function (x) { return parseInt(x, 10); });
            var elfTwo = strElves[1].split('-').map(function (x) { return parseInt(x, 10); });
            if (elfOne[0] <= elfTwo[1] && elfOne[0] >= elfTwo[0] ||
                elfTwo[0] <= elfOne[1] && elfTwo[0] >= elfOne[0] ||
                elfOne[1] <= elfTwo[1] && elfOne[1] >= elfTwo[0] ||
                elfTwo[1] <= elfOne[1] && elfTwo[1] >= elfOne[0]) {
                answer++;
            }
        }
    }
    catch (e_2_1) { e_2 = { error: e_2_1 }; }
    finally {
        try {
            if (lines_2_1 && !lines_2_1.done && (_a = lines_2.return)) _a.call(lines_2);
        }
        finally { if (e_2) throw e_2.error; }
    }
    return answer;
}
exports.solveB = solveB;
//# sourceMappingURL=day4.js.map