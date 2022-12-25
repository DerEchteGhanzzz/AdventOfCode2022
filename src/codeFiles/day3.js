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
    var e_1, _a, e_2, _b;
    var rucksacks = parseLines(lines);
    var answer = 0;
    try {
        for (var rucksacks_1 = __values(rucksacks), rucksacks_1_1 = rucksacks_1.next(); !rucksacks_1_1.done; rucksacks_1_1 = rucksacks_1.next()) {
            var rucksack = rucksacks_1_1.value;
            var compOne = rucksack.substring(0, rucksack.length / 2);
            var compTwo = rucksack.substring(rucksack.length / 2, rucksack.length);
            try {
                for (var compOne_1 = (e_2 = void 0, __values(compOne)), compOne_1_1 = compOne_1.next(); !compOne_1_1.done; compOne_1_1 = compOne_1.next()) {
                    var item = compOne_1_1.value;
                    if (compTwo.includes(item)) {
                        answer += priorityValue(item);
                        break;
                    }
                }
            }
            catch (e_2_1) { e_2 = { error: e_2_1 }; }
            finally {
                try {
                    if (compOne_1_1 && !compOne_1_1.done && (_b = compOne_1.return)) _b.call(compOne_1);
                }
                finally { if (e_2) throw e_2.error; }
            }
        }
    }
    catch (e_1_1) { e_1 = { error: e_1_1 }; }
    finally {
        try {
            if (rucksacks_1_1 && !rucksacks_1_1.done && (_a = rucksacks_1.return)) _a.call(rucksacks_1);
        }
        finally { if (e_1) throw e_1.error; }
    }
    return answer;
}
exports.solveA = solveA;
function solveB(lines) {
    var e_3, _a;
    var rucksacks = parseLines(lines);
    var answer = 0;
    for (var i = 0; i < rucksacks.length; i += 3) {
        try {
            for (var _b = (e_3 = void 0, __values(rucksacks[i])), _c = _b.next(); !_c.done; _c = _b.next()) {
                var item = _c.value;
                if (rucksacks[i + 1].includes(item) && rucksacks[i + 2].includes(item)) {
                    answer += priorityValue(item);
                    break;
                }
            }
        }
        catch (e_3_1) { e_3 = { error: e_3_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_3) throw e_3.error; }
        }
    }
    return answer;
}
exports.solveB = solveB;
function priorityValue(item) {
    var value;
    if (item === item.toUpperCase()) {
        value = item.charCodeAt(0) - "A".charCodeAt(0) + 26 + 1;
    }
    else {
        value = item.charCodeAt(0) - "a".charCodeAt(0) + 1;
    }
    return value;
}
function parseLines(inputString) {
    return inputString.split(/\r?\n/);
}
//# sourceMappingURL=day3.js.map