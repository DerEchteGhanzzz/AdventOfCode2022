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
    var _a = __read(parseLines(lines), 2), rockSegment = _a[0], minimum = _a[1];
    return fillCave(rockSegment, minimum, false);
}
exports.solveA = solveA;
function solveB(lines) {
    var _a = __read(parseLines(lines), 2), rockSegment = _a[0], minimum = _a[1];
    return fillCave(rockSegment, minimum - 1, true);
}
exports.solveB = solveB;
function fillCave(caveWalls, minimum, isB) {
    var start = { x: 500, y: 0 };
    var filledPositions = new Set();
    var current = { x: start.x, y: start.y };
    while (current.y > minimum || isB) {
        if (!caveWalls.has(coordToString(current.x, current.y - 1)) &&
            !filledPositions.has(coordToString(current.x, current.y - 1)) &&
            current.y > minimum) {
            current.y--;
            continue;
        }
        if (!caveWalls.has(coordToString(current.x - 1, current.y - 1)) &&
            !filledPositions.has(coordToString(current.x - 1, current.y - 1)) &&
            current.y > minimum) {
            current.y--;
            current.x--;
            continue;
        }
        if (!caveWalls.has(coordToString(current.x + 1, current.y - 1)) &&
            !filledPositions.has(coordToString(current.x + 1, current.y - 1)) &&
            current.y > minimum) {
            current.y--;
            current.x++;
            continue;
        }
        filledPositions.add(coordToString(current.x, current.y));
        current = { x: start.x, y: start.y };
        if (isB && filledPositions.has(coordToString(start.x, start.y))) {
            return filledPositions.size;
        }
    }
    return filledPositions.size;
}
function coordToString(x, y) {
    return x.toString() + "," + y.toString();
}
function parseLines(inputString) {
    var e_1, _a;
    var lines = inputString.split(/\r?\n/);
    var caveWalls = new Set();
    var minimum = 0;
    try {
        for (var lines_1 = __values(lines), lines_1_1 = lines_1.next(); !lines_1_1.done; lines_1_1 = lines_1.next()) {
            var rockStructure = lines_1_1.value;
            var segmentStrings = rockStructure.split(' -> ');
            for (var c = 0; c < segmentStrings.length - 1; c++) {
                var startCoords = segmentStrings[c].split(',').map(function (a) { return parseInt(a); });
                startCoords[1] = startCoords[1] * -1;
                var endCoords = segmentStrings[c + 1].split(',').map(function (a) { return parseInt(a); });
                endCoords[1] = endCoords[1] * -1;
                if (startCoords[1] === endCoords[1]) {
                    for (var i = Math.min(startCoords[0], endCoords[0]); i <= Math.max(startCoords[0], endCoords[0]); i++) {
                        caveWalls.add(coordToString(i, startCoords[1]));
                    }
                }
                else {
                    for (var j = Math.min(startCoords[1], endCoords[1]); j <= Math.max(startCoords[1], endCoords[1]); j++) {
                        caveWalls.add(coordToString(startCoords[0], j));
                    }
                }
                if (Math.min(endCoords[1], startCoords[1]) < minimum) {
                    minimum = Math.min(endCoords[1], startCoords[1]);
                }
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
    return [caveWalls, minimum];
}
//# sourceMappingURL=day14.js.map