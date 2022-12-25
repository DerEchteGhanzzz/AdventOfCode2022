"use strict";
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
    var _a;
    var currents = parseLines(lines);
    var coordSet = new Set();
    var highestY = 0;
    var blocks = [
        new TetrisBlock([[0, 0], [1, 0], [2, 0], [3, 0]], 0, 3),
        new TetrisBlock([[1, 0], [0, 1], [1, 1], [2, 1], [1, 2]], 2, 2),
        new TetrisBlock([[0, 0], [1, 0], [2, 0], [2, 1], [2, 2]], 2, 2),
        new TetrisBlock([[0, 0], [0, 1], [0, 2], [0, 3]], 3, 0),
        new TetrisBlock([[0, 0], [1, 0], [0, 1], [1, 1]], 1, 1)
    ];
    var currentIndex = 0;
    for (var i = 0; i < 2022; i++) {
        var currentBlock = blocks[i % 5];
        var newY = void 0;
        var _ = void 0;
        _a = __read(simulateTetris(coordSet, currentBlock, currents, highestY + 3, currentIndex), 3), newY = _a[0], currentIndex = _a[1], _ = _a[2];
        if (newY > highestY) {
            highestY = newY;
        }
    }
    return highestY;
}
exports.solveA = solveA;
function solveB(lines) {
    var _a;
    var currents = parseLines(lines);
    var coordSet = new Set();
    var blocks = [
        new TetrisBlock([[0, 0], [1, 0], [2, 0], [3, 0]], 0, 3),
        new TetrisBlock([[1, 0], [0, 1], [1, 1], [2, 1], [1, 2]], 2, 2),
        new TetrisBlock([[0, 0], [1, 0], [2, 0], [2, 1], [2, 2]], 2, 2),
        new TetrisBlock([[0, 0], [0, 1], [0, 2], [0, 3]], 3, 0),
        new TetrisBlock([[0, 0], [1, 0], [0, 1], [1, 1]], 1, 1)
    ];
    var currentIndex = 0;
    var xyDict = new Map();
    var highestY = 0;
    for (var i = 0; i < 1000000000000; i++) {
        var currentBlock = blocks[i % 5];
        xyDict.set(i, highestY);
        if (xyDict.get(i) * Math.floor(1000000000000 / i) + xyDict.get(1000000000000 % i) === 1514285714288) {
            return i + " " + currentIndex;
        }
        var newY = void 0;
        var landedLeftX = void 0;
        _a = __read(simulateTetris(coordSet, currentBlock, currents, highestY + 3, currentIndex), 3), newY = _a[0], currentIndex = _a[1], landedLeftX = _a[2];
        if (newY > highestY) {
            highestY = newY;
        }
    }
    return highestY;
}
exports.solveB = solveB;
function simulateTetris(coordSet, currentBlock, currents, startingY, currentIndex) {
    var _a, e_1, _b;
    var down = 0;
    var xLeft = 2;
    var transposedCoords;
    while (true) {
        var currentCurrent = currents[currentIndex % currents.length];
        currentIndex++;
        _a = __read(currentBlock.transposedCoordset(xLeft, startingY - down, coordSet, currentCurrent), 2), transposedCoords = _a[0], xLeft = _a[1];
        try {
            for (var transposedCoords_1 = (e_1 = void 0, __values(transposedCoords)), transposedCoords_1_1 = transposedCoords_1.next(); !transposedCoords_1_1.done; transposedCoords_1_1 = transposedCoords_1.next()) {
                var transposedSegment = transposedCoords_1_1.value;
                if (coordSet.has(JSON.stringify([transposedSegment[0], transposedSegment[1] - 1])) || transposedSegment[1] - 1 < 0) {
                    transposedCoords.forEach(function (a) { return coordSet.add(JSON.stringify(a)); });
                    return [currentBlock.highestY + 1 + startingY - down, currentIndex, transposedSegment[0]];
                }
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (transposedCoords_1_1 && !transposedCoords_1_1.done && (_b = transposedCoords_1.return)) _b.call(transposedCoords_1);
            }
            finally { if (e_1) throw e_1.error; }
        }
        down++;
    }
}
function parseLines(inputString) {
    var e_2, _a;
    var lines = inputString.split(/\r?\n/);
    var currents = [];
    try {
        for (var _b = __values(lines[0].split("")), _c = _b.next(); !_c.done; _c = _b.next()) {
            var char = _c.value;
            if (char === '<') {
                currents.push(-1);
            }
            else {
                currents.push(1);
            }
        }
    }
    catch (e_2_1) { e_2 = { error: e_2_1 }; }
    finally {
        try {
            if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
        }
        finally { if (e_2) throw e_2.error; }
    }
    return currents;
}
var TetrisBlock = (function () {
    function TetrisBlock(coordSet, highestY, right) {
        this.coordSet = coordSet;
        this.highestY = highestY;
        this.right = right;
    }
    TetrisBlock.prototype.transposedCoordset = function (xLeft, dy, coordSet, current) {
        var e_3, _a, e_4, _b;
        var transposedCoords = [];
        var dx = xLeft + current;
        try {
            for (var _c = __values(this.coordSet), _d = _c.next(); !_d.done; _d = _c.next()) {
                var coord = _d.value;
                if (coord[0] + dx < 0 || coord[0] + dx === 7 ||
                    coordSet.has(JSON.stringify([coord[0] + dx, coord[1] + dy]))) {
                    dx -= current;
                }
            }
        }
        catch (e_3_1) { e_3 = { error: e_3_1 }; }
        finally {
            try {
                if (_d && !_d.done && (_a = _c.return)) _a.call(_c);
            }
            finally { if (e_3) throw e_3.error; }
        }
        try {
            for (var _e = __values(this.coordSet), _f = _e.next(); !_f.done; _f = _e.next()) {
                var coord = _f.value;
                transposedCoords.push([coord[0] + dx, coord[1] + dy]);
            }
        }
        catch (e_4_1) { e_4 = { error: e_4_1 }; }
        finally {
            try {
                if (_f && !_f.done && (_b = _e.return)) _b.call(_e);
            }
            finally { if (e_4) throw e_4.error; }
        }
        return [transposedCoords, dx];
    };
    return TetrisBlock;
}());
//# sourceMappingURL=day17.js.map