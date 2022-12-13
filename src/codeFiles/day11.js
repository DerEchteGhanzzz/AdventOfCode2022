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
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.solveB = exports.solveA = void 0;
function solveA(lines) {
    var e_1, _a;
    var monkeys = parseLines(lines, true);
    for (var i = 0; i < 20; i++) {
        try {
            for (var monkeys_1 = (e_1 = void 0, __values(monkeys)), monkeys_1_1 = monkeys_1.next(); !monkeys_1_1.done; monkeys_1_1 = monkeys_1.next()) {
                var monkey = monkeys_1_1.value;
                monkey.act();
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (monkeys_1_1 && !monkeys_1_1.done && (_a = monkeys_1.return)) _a.call(monkeys_1);
            }
            finally { if (e_1) throw e_1.error; }
        }
    }
    return shenanigans(monkeys);
}
exports.solveA = solveA;
function solveB(lines) {
    var e_2, _a;
    var monkeys = parseLines(lines, false);
    for (var i = 0; i < 10000; i++) {
        try {
            for (var monkeys_2 = (e_2 = void 0, __values(monkeys)), monkeys_2_1 = monkeys_2.next(); !monkeys_2_1.done; monkeys_2_1 = monkeys_2.next()) {
                var monkey = monkeys_2_1.value;
                monkey.act();
            }
        }
        catch (e_2_1) { e_2 = { error: e_2_1 }; }
        finally {
            try {
                if (monkeys_2_1 && !monkeys_2_1.done && (_a = monkeys_2.return)) _a.call(monkeys_2);
            }
            finally { if (e_2) throw e_2.error; }
        }
    }
    return shenanigans(monkeys);
}
exports.solveB = solveB;
function parseLines(inputString, starOne) {
    var e_3, _a;
    var lines = inputString.split(/\r?\n/);
    var monkeyList = [];
    var totalDivisor = 1;
    for (var i = 0; i < lines.length; i++) {
        var line = lines[i];
        if (line.split(' ')[0] === "Monkey") {
            var items = lines[i + 1].split(": ")[1].split(", ").map(function (item) { return parseInt(item); });
            var _b = __read(lines[i + 2].split(": ")[1].split(" = ")[1].split(" "), 3), old = _b[0], inspectionOperator = _b[1], inspectionValue = _b[2];
            var operation = void 0;
            if (starOne) {
                operation = eval("(old) => Math.floor(old ".concat(inspectionOperator, " ").concat(inspectionValue, " / 3)"));
            }
            else {
                operation = eval("(old) => old ".concat(inspectionOperator, " ").concat(inspectionValue));
            }
            var divisor = parseInt(lines[i + 3].split(" divisible by ")[1]);
            var trueMonkey = parseInt(lines[i + 4].split("throw to monkey ")[1]);
            var falseMonkey = parseInt(lines[i + 5].split("throw to monkey ")[1]);
            totalDivisor *= divisor;
            monkeyList.push(new Monkey(items, operation, divisor, trueMonkey, falseMonkey, monkeyList));
        }
    }
    try {
        for (var monkeyList_1 = __values(monkeyList), monkeyList_1_1 = monkeyList_1.next(); !monkeyList_1_1.done; monkeyList_1_1 = monkeyList_1.next()) {
            var monkey = monkeyList_1_1.value;
            monkey.totalDivisor = totalDivisor;
        }
    }
    catch (e_3_1) { e_3 = { error: e_3_1 }; }
    finally {
        try {
            if (monkeyList_1_1 && !monkeyList_1_1.done && (_a = monkeyList_1.return)) _a.call(monkeyList_1);
        }
        finally { if (e_3) throw e_3.error; }
    }
    return monkeyList;
}
var Monkey = (function () {
    function Monkey(startingItems, operation, testDivisor, trueMonkey, falseMonkey, monkeyList) {
        this.monkeyLevel = 0;
        this.startingItems = startingItems;
        this.operation = operation;
        this.testDivisor = testDivisor;
        this.trueMonkey = trueMonkey;
        this.falseMonkey = falseMonkey;
        this.monkeyList = monkeyList;
    }
    Monkey.prototype.act = function () {
        var e_4, _a;
        try {
            for (var _b = __values(this.startingItems), _c = _b.next(); !_c.done; _c = _b.next()) {
                var item = _c.value;
                this.monkeyLevel += 1;
                item = this.operation(item) % this.totalDivisor;
                var nextMonkey = item % this.testDivisor === 0 ? this.trueMonkey : this.falseMonkey;
                this.monkeyList[nextMonkey].startingItems.push(item);
            }
        }
        catch (e_4_1) { e_4 = { error: e_4_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_4) throw e_4.error; }
        }
        this.startingItems = [];
    };
    return Monkey;
}());
function shenanigans(monkeys) {
    var e_5, _a;
    var inspections = [];
    try {
        for (var monkeys_3 = __values(monkeys), monkeys_3_1 = monkeys_3.next(); !monkeys_3_1.done; monkeys_3_1 = monkeys_3.next()) {
            var monkey = monkeys_3_1.value;
            inspections.push(monkey.monkeyLevel);
        }
    }
    catch (e_5_1) { e_5 = { error: e_5_1 }; }
    finally {
        try {
            if (monkeys_3_1 && !monkeys_3_1.done && (_a = monkeys_3.return)) _a.call(monkeys_3);
        }
        finally { if (e_5) throw e_5.error; }
    }
    inspections.sort(function (a, b) {
        if (a < b)
            return 1;
        if (a > b)
            return -1;
        return 0;
    });
    return inspections[0] * inspections[1];
}
//# sourceMappingURL=day11.js.map