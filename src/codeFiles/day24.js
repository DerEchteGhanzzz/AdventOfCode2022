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
exports.SnowStormCache = exports.solveB = exports.solveA = void 0;
var aocUtils_1 = require("../aocUtils");
function solveA(lines) {
    var startCoords = parseLines(lines);
    SnowStormCache.fastest = undefined;
    SnowStormCache.positionMap = new Map();
    getFastestPath(startCoords, 1, false);
    var first = SnowStormCache.fastest;
    return SnowStormCache.fastest;
}
exports.solveA = solveA;
function solveB(lines) {
    var startCoords = parseLines(lines);
    var endCoords = { x: SnowStormCache.width - 1, y: -1 };
    SnowStormCache.fastest = undefined;
    SnowStormCache.positionMap = new Map();
    getFastestPath(startCoords, 1, false);
    var first = SnowStormCache.fastest;
    console.log("first trip done in", first, "minutes");
    SnowStormCache.fastest = undefined;
    SnowStormCache.positionMap = new Map();
    getFastestPath(endCoords, first + 1, true);
    var second = SnowStormCache.fastest;
    console.log("second trip done trip done in", second - first, "minutes");
    SnowStormCache.fastest = undefined;
    SnowStormCache.positionMap = new Map();
    getFastestPath(startCoords, second + 1, false);
    var third = SnowStormCache.fastest;
    console.log("third trip done trip done in", third - second, "minutes");
    return third;
}
exports.solveB = solveB;
function getFastestPath(currentPosition, round, backwards) {
    var e_1, _a;
    var currentDistance;
    if (!backwards) {
        currentDistance = Math.abs(currentPosition.x - SnowStormCache.width - 1) + Math.abs(currentPosition.y + 1);
    }
    else {
        currentDistance = Math.abs(currentPosition.x) + Math.abs(currentPosition.y - SnowStormCache.height);
    }
    if (SnowStormCache.fastest !== undefined && (round + currentDistance) > SnowStormCache.fastest) {
        return;
    }
    var actions = [[0, -1], [1, 0], [-1, 0], [0, 1], [0, 0]];
    if (backwards) {
        actions = [[-1, 0], [0, 1], [0, -1], [1, 0], [0, 0]];
    }
    try {
        for (var actions_1 = __values(actions), actions_1_1 = actions_1.next(); !actions_1_1.done; actions_1_1 = actions_1.next()) {
            var action = actions_1_1.value;
            if (!backwards && currentPosition.x + action[0] === SnowStormCache.width - 1 && currentPosition.y + action[1] === -1) {
                if (SnowStormCache.fastest === undefined || round < SnowStormCache.fastest) {
                    SnowStormCache.fastest = round;
                }
                return;
            }
            if (backwards && currentPosition.x + action[0] === 0 && currentPosition.y + action[1] === SnowStormCache.height) {
                if (SnowStormCache.fastest === undefined || round < SnowStormCache.fastest) {
                    SnowStormCache.fastest = round;
                }
                return;
            }
            var nextCoords = (currentPosition.x + action[0]) + "," + (currentPosition.y + action[1]);
            if ((currentPosition.x + action[0] < 0 || currentPosition.x + action[0] >= SnowStormCache.width ||
                currentPosition.y + action[1] < 0 || currentPosition.y + action[1] >= SnowStormCache.height ||
                !SnowStormCache.get(nextCoords, round))) {
                if (backwards) {
                    if (!(currentPosition.x === SnowStormCache.width - 1 && currentPosition.y === -1)) {
                        continue;
                    }
                }
                else {
                    if (!(currentPosition.x === 0 && currentPosition.y === SnowStormCache.height)) {
                        continue;
                    }
                }
            }
            if (SnowStormCache.positionMap.get(round) === undefined) {
                SnowStormCache.positionMap.set(round, new Set());
            }
            if (SnowStormCache.positionMap.get(round).has(nextCoords)) {
                continue;
            }
            SnowStormCache.positionMap.get(round).add(nextCoords);
            var nextPosition = { x: currentPosition.x + action[0], y: currentPosition.y + action[1] };
            getFastestPath(nextPosition, round + 1, backwards);
        }
    }
    catch (e_1_1) { e_1 = { error: e_1_1 }; }
    finally {
        try {
            if (actions_1_1 && !actions_1_1.done && (_a = actions_1.return)) _a.call(actions_1);
        }
        finally { if (e_1) throw e_1.error; }
    }
}
function parseLines(inputString) {
    var lines = inputString.split(/\r?\n/);
    SnowStormCache.height = lines.length - 2;
    SnowStormCache.width = lines[0].length - 2;
    var stormMap = new Map();
    var directions = new Map([[">", [1, 0]], ["<", [-1, 0]], ["v", [0, -1]], ["^", [0, 1]]]);
    var startingCoords = { x: 0, y: SnowStormCache.height };
    for (var j = 1; j < lines.length - 1; j++) {
        var dj = lines.length - 2 - j;
        for (var i = 1; i < lines[0].length - 1; i++) {
            var di = i - 1;
            var coords = di + "," + dj;
            if (lines[j].charAt(i) === ".") {
                continue;
            }
            stormMap.set(coords, new Snowstorm(di, dj, directions.get(lines[j].charAt(i)), lines[j].charAt(i)));
        }
    }
    SnowStormCache.zeroSet = stormMap;
    return startingCoords;
}
var Snowstorm = (function () {
    function Snowstorm(startX, startY, direction, letter) {
        this.startX = startX;
        this.startY = startY;
        this.direction = direction;
        this.letter = letter;
    }
    Snowstorm.prototype.getPosition = function (round) {
        return aocUtils_1.modulo(this.startX + this.direction[0] * round, SnowStormCache.width) + "," + aocUtils_1.modulo(this.startY + this.direction[1] * round, SnowStormCache.height);
    };
    return Snowstorm;
}());
var SnowStormCache = (function () {
    function SnowStormCache() {
    }
    SnowStormCache.get = function (position, round) {
        if (this.cache.get(position + "," + round) !== undefined) {
            return this.cache.get(position + "," + round);
        }
        var x = parseInt(position.split(',')[0]);
        var y = parseInt(position.split(',')[1]);
        for (var i = 0; i < this.width; i++) {
            var storm = this.zeroSet.get(((x + i) % this.width) + "," + y);
            if (storm === undefined) {
                continue;
            }
            var stormPos = storm.getPosition(round);
            this.cache.set(stormPos + "," + round, false);
            if (stormPos === position) {
                return false;
            }
        }
        for (var j = 0; j < this.height; j++) {
            var storm = this.zeroSet.get(x + "," + ((j + y) % this.height));
            if (storm === undefined) {
                continue;
            }
            var stormPos = storm.getPosition(round);
            this.cache.set(stormPos + "," + round, false);
            if (stormPos === position) {
                return false;
            }
        }
        this.cache.set(x + "," + y + "," + round, true);
        return this.cache.get(position + "," + round);
    };
    SnowStormCache.positionMap = new Map();
    SnowStormCache.cache = new Map();
    return SnowStormCache;
}());
exports.SnowStormCache = SnowStormCache;
function manhattan(a, b) {
    var _a = __read(a.split(","), 2), x1 = _a[0], y1 = _a[1];
    var _b = __read(b.split(","), 2), x2 = _b[0], y2 = _b[1];
    return Math.abs(parseInt(x1) - parseInt(x2)) + Math.abs(parseInt(y1) - parseInt(y2));
}
function printMap(stormMap, nextCoords) {
    for (var j = SnowStormCache.height - 1; j >= 0; j--) {
        var currentLine = "";
        for (var i = 0; i < SnowStormCache.width; i++) {
            var list = stormMap.get(i + ',' + j);
            if (list.length === 0) {
                if (i + ',' + j === nextCoords) {
                    currentLine = currentLine + "E";
                    continue;
                }
                currentLine = currentLine + ".";
                continue;
            }
            if (list.length === 1) {
                currentLine = currentLine + list[0].letter;
                continue;
            }
            currentLine = currentLine + list.length;
        }
        console.log(currentLine);
    }
}
//# sourceMappingURL=day24.js.map