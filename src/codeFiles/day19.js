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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.solveB = exports.solveA = void 0;
function solveA(lines) {
    var e_1, _a;
    var blueprintBook = parseLines(lines);
    var totalQuality;
    var blueprintCount = 1;
    try {
        for (var blueprintBook_1 = __values(blueprintBook), blueprintBook_1_1 = blueprintBook_1.next(); !blueprintBook_1_1.done; blueprintBook_1_1 = blueprintBook_1.next()) {
            var blueprint = blueprintBook_1_1.value;
            totalQuality = blueprintCount * getMaxQuality([1, 0, 0, 0], [0, 0, 0, 0], 0, blueprint);
            console.log(blueprintCount, "done");
            blueprintCount++;
        }
    }
    catch (e_1_1) { e_1 = { error: e_1_1 }; }
    finally {
        try {
            if (blueprintBook_1_1 && !blueprintBook_1_1.done && (_a = blueprintBook_1.return)) _a.call(blueprintBook_1);
        }
        finally { if (e_1) throw e_1.error; }
    }
    return totalQuality;
}
exports.solveA = solveA;
function solveB(lines) {
    var e_2, _a;
    var input = parseLines(lines);
    var answer;
    try {
        for (var input_1 = __values(input), input_1_1 = input_1.next(); !input_1_1.done; input_1_1 = input_1.next()) {
            var entry = input_1_1.value;
        }
    }
    catch (e_2_1) { e_2 = { error: e_2_1 }; }
    finally {
        try {
            if (input_1_1 && !input_1_1.done && (_a = input_1.return)) _a.call(input_1);
        }
        finally { if (e_2) throw e_2.error; }
    }
    return answer;
}
exports.solveB = solveB;
function getMaxQuality(robots, resources, round, blueprint) {
    var decisions = 4;
    var qualityArray = new Set();
    var builtGeode = false;
    var _loop_1 = function (decision) {
        var timeDelta = 0;
        for (var i = 0; i < decisions; i++) {
            var robotWorkTime = Math.ceil(blueprint[decision][i] / robots[i]);
            var resourceTimeSpare = Math.floor((robotWorkTime * robots[i] - blueprint[decision][i]) / resources[i]);
            resourceTimeSpare = Number.isInteger(resourceTimeSpare) ? resourceTimeSpare : 0;
            var calcTime = Math.max(robotWorkTime - resourceTimeSpare + 1, 1);
            if (calcTime > timeDelta && !isNaN(calcTime)) {
                timeDelta = calcTime;
            }
        }
        if (timeDelta === 0) {
            timeDelta = 1;
        }
        if (timeDelta === Infinity) {
            qualityArray.add(0);
            return "continue";
        }
        var newRound = round + timeDelta;
        var newResources = new (Array.bind.apply(Array, __spreadArray([void 0], __read(resources), false)))().map(function (oldResource, idx) {
            return oldResource + robots[idx] * timeDelta - blueprint[decision][idx];
        });
        if (newRound >= 24) {
            qualityArray.add(newResources[3] + (23 - round) * robots[3]);
            return "continue";
        }
        var newRobots = [robots[0], robots[1], robots[2], robots[3]];
        newRobots[decision]++;
        console.log();
        console.log(resources, robots);
        console.log(newResources, newRobots);
        console.log(timeDelta, blueprint[decision]);
        var quality = getMaxQuality(newRobots, newResources, newRound, blueprint);
        qualityArray.add(quality);
    };
    for (var decision = decisions - 1; decision >= 0; decision--) {
        _loop_1(decision);
    }
    return Math.max.apply(Math, __spreadArray([], __read(qualityArray), false));
}
function parseLines(inputString) {
    var e_3, _a, e_4, _b;
    var lines = inputString.split(/\r?\n/);
    var blueprintBook = [];
    try {
        for (var lines_1 = __values(lines), lines_1_1 = lines_1.next(); !lines_1_1.done; lines_1_1 = lines_1.next()) {
            var line = lines_1_1.value;
            var blueprint = [];
            try {
                for (var _c = (e_4 = void 0, __values(line.split(": ")[1].split('. '))), _d = _c.next(); !_d.done; _d = _c.next()) {
                    var robotMap = _d.value;
                    var costs = robotMap.match(/\d+/g).map(function (a) { return parseInt(a); });
                    var robot = robotMap.match(/(ore|clay|obsidian|geode)/)[0];
                    var costTable = void 0;
                    switch (robot) {
                        case "ore":
                            costTable = [costs[0], 0, 0, 0];
                            break;
                        case "clay":
                            costTable = [costs[0], 0, 0, 0];
                            break;
                        case "obsidian":
                            costTable = [costs[0], costs[1], 0, 0];
                            break;
                        case "geode":
                            costTable = [costs[0], 0, costs[1], 0];
                            break;
                    }
                    blueprint.push(costTable);
                }
            }
            catch (e_4_1) { e_4 = { error: e_4_1 }; }
            finally {
                try {
                    if (_d && !_d.done && (_b = _c.return)) _b.call(_c);
                }
                finally { if (e_4) throw e_4.error; }
            }
            blueprintBook.push(blueprint);
        }
    }
    catch (e_3_1) { e_3 = { error: e_3_1 }; }
    finally {
        try {
            if (lines_1_1 && !lines_1_1.done && (_a = lines_1.return)) _a.call(lines_1);
        }
        finally { if (e_3) throw e_3.error; }
    }
    return blueprintBook;
}
//# sourceMappingURL=day19.js.map