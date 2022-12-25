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
var __spread = (this && this.__spread) || function () {
    for (var ar = [], i = 0; i < arguments.length; i++) ar = ar.concat(__read(arguments[i]));
    return ar;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.solveB = exports.solveA = void 0;
function solveA(lines) {
    var e_1, _a;
    var lavaBlocks = parseLines(lines);
    var answer = 0;
    try {
        for (var lavaBlocks_1 = __values(lavaBlocks), lavaBlocks_1_1 = lavaBlocks_1.next(); !lavaBlocks_1_1.done; lavaBlocks_1_1 = lavaBlocks_1.next()) {
            var entry = lavaBlocks_1_1.value;
            answer += getAirNeighs(entry, lavaBlocks).length;
        }
    }
    catch (e_1_1) { e_1 = { error: e_1_1 }; }
    finally {
        try {
            if (lavaBlocks_1_1 && !lavaBlocks_1_1.done && (_a = lavaBlocks_1.return)) _a.call(lavaBlocks_1);
        }
        finally { if (e_1) throw e_1.error; }
    }
    return answer;
}
exports.solveA = solveA;
function solveB(lines) {
    var e_2, _a, e_3, _b;
    var lavaBlocks = parseLines(lines);
    var exposedSides = 0;
    var totalAirSet = getAirSet(lavaBlocks);
    var trappedAirSet = new Set();
    var freeAirSet = new Set();
    try {
        for (var totalAirSet_1 = __values(totalAirSet), totalAirSet_1_1 = totalAirSet_1.next(); !totalAirSet_1_1.done; totalAirSet_1_1 = totalAirSet_1.next()) {
            var airBlock = totalAirSet_1_1.value;
            AstarToOrigin(airBlock, 18, lavaBlocks, freeAirSet, trappedAirSet);
        }
    }
    catch (e_2_1) { e_2 = { error: e_2_1 }; }
    finally {
        try {
            if (totalAirSet_1_1 && !totalAirSet_1_1.done && (_a = totalAirSet_1.return)) _a.call(totalAirSet_1);
        }
        finally { if (e_2) throw e_2.error; }
    }
    trappedAirSet.forEach(function (k) { return lavaBlocks.add(k); });
    try {
        for (var lavaBlocks_2 = __values(lavaBlocks), lavaBlocks_2_1 = lavaBlocks_2.next(); !lavaBlocks_2_1.done; lavaBlocks_2_1 = lavaBlocks_2.next()) {
            var entry = lavaBlocks_2_1.value;
            exposedSides += getAirNeighs(entry, lavaBlocks).length;
        }
    }
    catch (e_3_1) { e_3 = { error: e_3_1 }; }
    finally {
        try {
            if (lavaBlocks_2_1 && !lavaBlocks_2_1.done && (_b = lavaBlocks_2.return)) _b.call(lavaBlocks_2);
        }
        finally { if (e_3) throw e_3.error; }
    }
    return exposedSides;
}
exports.solveB = solveB;
function AstarToOrigin(start, finish, lavaBlocks, freeAir, trappedAir) {
    var e_4, _a;
    if (freeAir.has(start)) {
        return true;
    }
    else if (trappedAir.has(start)) {
        return false;
    }
    var distanceDict = new Map();
    distanceDict.set(start, 0);
    var queue = new Map();
    queue.set(start, 0);
    var visited = new Set(lavaBlocks);
    while (queue.size > 0) {
        queue = new Map(__spread(queue).sort(function (a, b) { return (a[1] > b[1] ? 1 : -1); }));
        var currentNode = __spread(queue)[0][0];
        if (manhattan(currentNode, start) > finish) {
            visited.forEach(function (v) { return freeAir.add(v); });
            return true;
        }
        queue.delete(currentNode);
        visited.add(currentNode);
        try {
            for (var _b = (e_4 = void 0, __values(getAirNeighs(currentNode, lavaBlocks))), _c = _b.next(); !_c.done; _c = _b.next()) {
                var neigh = _c.value;
                if (visited.has(neigh)) {
                    continue;
                }
                distanceDict.set(neigh, 1 + distanceDict.get(currentNode));
                queue.set(neigh, distanceDict.get(neigh) - manhattan(start, neigh));
            }
        }
        catch (e_4_1) { e_4 = { error: e_4_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_4) throw e_4.error; }
        }
    }
    visited.forEach(function (v) { return trappedAir.add(v); });
    return false;
}
function manhattan(start, neigh) {
    var startCoords = JSON.parse(start);
    var neighCoords = JSON.parse(neigh);
    return Math.abs(startCoords[0] - neighCoords[0]) + Math.abs(startCoords[1] - neighCoords[1]) + Math.abs(startCoords[2] - neighCoords[2]);
}
function getAirNeighs(coord, lavaBlocks) {
    var coordArr = JSON.parse(coord);
    var adjacentAir = [];
    var count = 0;
    for (var k = -1; k < 2; k++) {
        for (var j = -1; j < 2; j++) {
            for (var i = -1; i < 2; i++) {
                if ((i === j && j === k) || !(Math.abs(i) + Math.abs(j) + Math.abs(k) === 1)) {
                    count++;
                    continue;
                }
                if (!lavaBlocks.has(JSON.stringify([coordArr[0] + i, coordArr[1] + j, coordArr[2] + k]))) {
                    adjacentAir.push(JSON.stringify([coordArr[0] + i, coordArr[1] + j, coordArr[2] + k]));
                }
            }
        }
    }
    return adjacentAir;
}
function getAirSet(lavaBlocks) {
    var e_5, _a;
    var totalAirSet = new Set();
    try {
        for (var lavaBlocks_3 = __values(lavaBlocks), lavaBlocks_3_1 = lavaBlocks_3.next(); !lavaBlocks_3_1.done; lavaBlocks_3_1 = lavaBlocks_3.next()) {
            var lavaBlock = lavaBlocks_3_1.value;
            var coordArr = JSON.parse(lavaBlock);
            for (var k = -1; k < 2; k++) {
                for (var j = -1; j < 2; j++) {
                    for (var i = -1; i < 2; i++) {
                        if (i === j && j === k && i === 0) {
                            continue;
                        }
                        var neighbour = JSON.stringify([coordArr[0] + i, coordArr[1] + j, coordArr[2] + k]);
                        if (!lavaBlocks.has(neighbour)) {
                            totalAirSet.add(neighbour);
                        }
                    }
                }
            }
        }
    }
    catch (e_5_1) { e_5 = { error: e_5_1 }; }
    finally {
        try {
            if (lavaBlocks_3_1 && !lavaBlocks_3_1.done && (_a = lavaBlocks_3.return)) _a.call(lavaBlocks_3);
        }
        finally { if (e_5) throw e_5.error; }
    }
    return totalAirSet;
}
function parseLines(inputString) {
    var e_6, _a;
    var lines = inputString.split(/\r?\n/);
    var input = new Set();
    try {
        for (var lines_1 = __values(lines), lines_1_1 = lines_1.next(); !lines_1_1.done; lines_1_1 = lines_1.next()) {
            var line = lines_1_1.value;
            input.add("[" + line + "]");
        }
    }
    catch (e_6_1) { e_6 = { error: e_6_1 }; }
    finally {
        try {
            if (lines_1_1 && !lines_1_1.done && (_a = lines_1.return)) _a.call(lines_1);
        }
        finally { if (e_6) throw e_6.error; }
    }
    return input;
}
//# sourceMappingURL=day18.js.map