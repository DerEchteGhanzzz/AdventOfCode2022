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
exports.GlobalMax = exports.solveB = exports.solveA = void 0;
function solveA(lines) {
    var e_1, _a;
    var blueprintBook = parseLines(lines);
    var totalQuality = 0;
    var blueprintCount = 1;
    try {
        for (var blueprintBook_1 = __values(blueprintBook), blueprintBook_1_1 = blueprintBook_1.next(); !blueprintBook_1_1.done; blueprintBook_1_1 = blueprintBook_1.next()) {
            var blueprint = blueprintBook_1_1.value;
            GlobalMax.value = 0;
            getMaxQuality([1, 0, 0, 0, 0], [0, 0, 0, 0], 1, 24, blueprint);
            totalQuality += blueprintCount * GlobalMax.value;
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
    var blueprintBook = parseLines(lines);
    var totalQuality = 1;
    var blueprintCount = 1;
    try {
        for (var blueprintBook_2 = __values(blueprintBook), blueprintBook_2_1 = blueprintBook_2.next(); !blueprintBook_2_1.done; blueprintBook_2_1 = blueprintBook_2.next()) {
            var blueprint = blueprintBook_2_1.value;
            GlobalMax.value = 0;
            getMaxQuality([1, 0, 0, 0, 0], [0, 0, 0, 0], 1, 32, blueprint);
            totalQuality *= GlobalMax.value;
            blueprintCount++;
            if (blueprintCount > 3) {
                break;
            }
        }
    }
    catch (e_2_1) { e_2 = { error: e_2_1 }; }
    finally {
        try {
            if (blueprintBook_2_1 && !blueprintBook_2_1.done && (_a = blueprintBook_2.return)) _a.call(blueprintBook_2);
        }
        finally { if (e_2) throw e_2.error; }
    }
    return totalQuality;
}
exports.solveB = solveB;
function getMaxQuality(robots, resources, round, maxRounds, blueprint) {
    var e_3, _a;
    if (GlobalMax.value < resources[3]) {
        GlobalMax.value = resources[3];
    }
    if (round > maxRounds) {
        return;
    }
    var nextActions = getPossibleActions(robots, blueprint);
    var roundsLeft = maxRounds + 1 - round;
    var maximalPossible = roundsLeft * (roundsLeft + 1) / 2 * (robots[3] + 1) + resources[3];
    if (maximalPossible <= GlobalMax.value) {
        return;
    }
    var _loop_1 = function (action) {
        var newResources = Array.from(resources);
        var newRound = round;
        var newRobots = Array.from(robots);
        while (newRound < maxRounds) {
            if (canAfford(newResources, blueprint[action])) {
                newRobots[action]++;
                break;
            }
            newResources.forEach(function (r, idx) { return newResources[idx] = newResources[idx] + robots[idx]; });
            newRound++;
        }
        newResources.forEach(function (r, idx) { return newResources[idx] = newResources[idx] + robots[idx] - blueprint[action][idx]; });
        getMaxQuality(newRobots, newResources, newRound + 1, maxRounds, blueprint);
    };
    try {
        for (var nextActions_1 = __values(nextActions), nextActions_1_1 = nextActions_1.next(); !nextActions_1_1.done; nextActions_1_1 = nextActions_1.next()) {
            var action = nextActions_1_1.value;
            _loop_1(action);
        }
    }
    catch (e_3_1) { e_3 = { error: e_3_1 }; }
    finally {
        try {
            if (nextActions_1_1 && !nextActions_1_1.done && (_a = nextActions_1.return)) _a.call(nextActions_1);
        }
        finally { if (e_3) throw e_3.error; }
    }
    return;
}
function canAfford(resources, robotCost) {
    for (var i = 0; i < 4; i++) {
        if (resources[i] < robotCost[i]) {
            return false;
        }
    }
    return true;
}
function getPossibleActions(robots, blueprint) {
    var nextActions = [];
    if (robots[2] !== 0) {
        nextActions.push(3);
    }
    if (robots[1] !== 0) {
        nextActions.push(2);
    }
    if (robots[1] < blueprint[2][1]) {
        nextActions.push(1);
    }
    if (robots[0] < Math.max(blueprint[0][0], blueprint[1][0], blueprint[2][0], blueprint[3][0])) {
        nextActions.push(0);
    }
    return nextActions;
}
function parseLines(inputString) {
    var e_4, _a, e_5, _b;
    var lines = inputString.split(/\r?\n/);
    var blueprintBook = [];
    try {
        for (var lines_1 = __values(lines), lines_1_1 = lines_1.next(); !lines_1_1.done; lines_1_1 = lines_1.next()) {
            var line = lines_1_1.value;
            var blueprint = [];
            try {
                for (var _c = (e_5 = void 0, __values(line.split(": ")[1].split('. '))), _d = _c.next(); !_d.done; _d = _c.next()) {
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
            catch (e_5_1) { e_5 = { error: e_5_1 }; }
            finally {
                try {
                    if (_d && !_d.done && (_b = _c.return)) _b.call(_c);
                }
                finally { if (e_5) throw e_5.error; }
            }
            blueprint.push([0, 0, 0, 0]);
            blueprintBook.push(blueprint);
        }
    }
    catch (e_4_1) { e_4 = { error: e_4_1 }; }
    finally {
        try {
            if (lines_1_1 && !lines_1_1.done && (_a = lines_1.return)) _a.call(lines_1);
        }
        finally { if (e_4) throw e_4.error; }
    }
    return blueprintBook;
}
var GlobalMax = (function () {
    function GlobalMax() {
    }
    return GlobalMax;
}());
exports.GlobalMax = GlobalMax;
//# sourceMappingURL=day19.js.map