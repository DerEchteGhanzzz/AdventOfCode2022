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
    var e_1, _a, e_2, _b;
    var elfMap = parseLines(lines);
    for (var round = 0; round < 10; round++) {
        try {
            for (var elfMap_1 = (e_1 = void 0, __values(elfMap)), elfMap_1_1 = elfMap_1.next(); !elfMap_1_1.done; elfMap_1_1 = elfMap_1.next()) {
                var _c = __read(elfMap_1_1.value, 2), coord = _c[0], elf = _c[1];
                elf.proposeDirection(elfMap, round);
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (elfMap_1_1 && !elfMap_1_1.done && (_a = elfMap_1.return)) _a.call(elfMap_1);
            }
            finally { if (e_1) throw e_1.error; }
        }
        var newElfMap = new Map(elfMap);
        try {
            for (var elfMap_2 = (e_2 = void 0, __values(elfMap)), elfMap_2_1 = elfMap_2.next(); !elfMap_2_1.done; elfMap_2_1 = elfMap_2.next()) {
                var _d = __read(elfMap_2_1.value, 2), coord = _d[0], elf = _d[1];
                elf.move(newElfMap);
            }
        }
        catch (e_2_1) { e_2 = { error: e_2_1 }; }
        finally {
            try {
                if (elfMap_2_1 && !elfMap_2_1.done && (_b = elfMap_2.return)) _b.call(elfMap_2);
            }
            finally { if (e_2) throw e_2.error; }
        }
        elfMap = newElfMap;
    }
    return getSmallestRectangle(elfMap);
}
exports.solveA = solveA;
function solveB(lines) {
    var e_3, _a, e_4, _b;
    var elfMap = parseLines(lines);
    var round = 0;
    while (true) {
        try {
            for (var elfMap_3 = (e_3 = void 0, __values(elfMap)), elfMap_3_1 = elfMap_3.next(); !elfMap_3_1.done; elfMap_3_1 = elfMap_3.next()) {
                var _c = __read(elfMap_3_1.value, 2), coord = _c[0], elf = _c[1];
                elf.proposeDirection(elfMap, round);
            }
        }
        catch (e_3_1) { e_3 = { error: e_3_1 }; }
        finally {
            try {
                if (elfMap_3_1 && !elfMap_3_1.done && (_a = elfMap_3.return)) _a.call(elfMap_3);
            }
            finally { if (e_3) throw e_3.error; }
        }
        var notMoving = 0;
        var newElfMap = new Map(elfMap);
        try {
            for (var elfMap_4 = (e_4 = void 0, __values(elfMap)), elfMap_4_1 = elfMap_4.next(); !elfMap_4_1.done; elfMap_4_1 = elfMap_4.next()) {
                var _d = __read(elfMap_4_1.value, 2), coord = _d[0], elf = _d[1];
                if (!elf.move(newElfMap)) {
                    notMoving++;
                }
            }
        }
        catch (e_4_1) { e_4 = { error: e_4_1 }; }
        finally {
            try {
                if (elfMap_4_1 && !elfMap_4_1.done && (_b = elfMap_4.return)) _b.call(elfMap_4);
            }
            finally { if (e_4) throw e_4.error; }
        }
        elfMap = newElfMap;
        if (notMoving === elfMap.size) {
            return round + 1;
        }
        round++;
    }
}
exports.solveB = solveB;
function parseLines(inputString) {
    var lines = inputString.split(/\r?\n/);
    var elfMap = new Map();
    for (var j = 0; j < lines.length; j++) {
        for (var i = 0; i < lines[0].length; i++) {
            if (lines[j].charAt(i) === ".") {
                continue;
            }
            var dj = lines.length - 1 - j;
            elfMap.set(i + "," + dj, new Elf(i, dj));
        }
    }
    return elfMap;
}
function getSmallestRectangle(elfMap) {
    var e_5, _a;
    var maxX = Number.MIN_VALUE;
    var maxY = Number.MIN_VALUE;
    var minX = Number.MAX_VALUE;
    var minY = Number.MAX_VALUE;
    try {
        for (var elfMap_5 = __values(elfMap), elfMap_5_1 = elfMap_5.next(); !elfMap_5_1.done; elfMap_5_1 = elfMap_5.next()) {
            var _b = __read(elfMap_5_1.value, 2), coord = _b[0], elf = _b[1];
            if (elf.x < minX) {
                minX = elf.x;
            }
            if (elf.x > maxX) {
                maxX = elf.x;
            }
            if (elf.y < minY) {
                minY = elf.y;
            }
            if (elf.y > maxY) {
                maxY = elf.y;
            }
        }
    }
    catch (e_5_1) { e_5 = { error: e_5_1 }; }
    finally {
        try {
            if (elfMap_5_1 && !elfMap_5_1.done && (_a = elfMap_5.return)) _a.call(elfMap_5);
        }
        finally { if (e_5) throw e_5.error; }
    }
    return (maxX - minX + 1) * (maxY - minY + 1) - elfMap.size;
}
var Elf = (function () {
    function Elf(x, y) {
        this.x = x;
        this.y = y;
    }
    Elf.prototype.move = function (elfMap) {
        for (var j = -1; j < 2; j++) {
            for (var i = -1; i < 2; i++) {
                var elf = elfMap.get((this.proposedX + i) + "," + (this.proposedY + j));
                if (elf === undefined || elf === this) {
                    continue;
                }
                if (elf.proposedX === this.proposedX && elf.proposedY === this.proposedY) {
                    return false;
                }
            }
        }
        if (this.x === this.proposedX && this.y === this.proposedY) {
            return false;
        }
        elfMap.delete(this.x + "," + this.y);
        this.x = this.proposedX;
        this.y = this.proposedY;
        elfMap.set(this.x + "," + this.y, this);
        return true;
    };
    Elf.prototype.proposeDirection = function (elfMap, round) {
        this.proposedX = this.x;
        this.proposedY = this.y;
        var directionList = [[true, 0, 1], [true, 0, -1], [true, -1, 0], [true, 1, 0]];
        for (var i = -1; i < 2; i++) {
            if (elfMap.get((this.x + i) + "," + (this.y + 1)) !== undefined) {
                directionList[0][0] = false;
            }
            if (elfMap.get((this.x + i) + "," + (this.y - 1)) !== undefined) {
                directionList[1][0] = false;
            }
            if (elfMap.get((this.x - 1) + "," + (this.y + i)) !== undefined) {
                directionList[2][0] = false;
            }
            if (elfMap.get((this.x + 1) + "," + (this.y + i)) !== undefined) {
                directionList[3][0] = false;
            }
        }
        if (directionList[0][0] && directionList[1][0] && directionList[2][0] && directionList[3][0]) {
            return;
        }
        for (var i = round; i < round + 4; i++) {
            if (directionList[i % 4][0]) {
                this.proposedX += directionList[i % 4][1];
                this.proposedY += directionList[i % 4][2];
                break;
            }
        }
    };
    return Elf;
}());
function printSet(elfMap, width, height, minX, minY) {
    var coordStrings = [];
    elfMap.forEach(function (elf) { return coordStrings.push((elf.x - minX) + "," + (elf.y - minY)); });
    console.log(elfMap);
    console.log(coordStrings);
    for (var j = 0; j < height; j++) {
        var line = "";
        for (var i = 0; i < width; i++) {
            var dj = height - 1 - j;
            if (coordStrings.includes(i + "," + dj)) {
                line = line + "#";
            }
            else {
                line = line + ".";
            }
        }
        console.log(line);
    }
}
//# sourceMappingURL=day23.js.map