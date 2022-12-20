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
    var answer = 0;
    var yLevel = 2000000;
    var sensors = parseLines(lines, yLevel);
    var rangeSet = new Set();
    try {
        for (var sensors_1 = __values(sensors), sensors_1_1 = sensors_1.next(); !sensors_1_1.done; sensors_1_1 = sensors_1.next()) {
            var sensor = sensors_1_1.value;
            sensor.determineYrange(yLevel);
            insertRange(sensor.range, rangeSet);
        }
    }
    catch (e_1_1) { e_1 = { error: e_1_1 }; }
    finally {
        try {
            if (sensors_1_1 && !sensors_1_1.done && (_a = sensors_1.return)) _a.call(sensors_1);
        }
        finally { if (e_1) throw e_1.error; }
    }
    try {
        for (var rangeSet_1 = __values(rangeSet), rangeSet_1_1 = rangeSet_1.next(); !rangeSet_1_1.done; rangeSet_1_1 = rangeSet_1.next()) {
            var range = rangeSet_1_1.value;
            answer += range.end - range.begin + 1;
        }
    }
    catch (e_2_1) { e_2 = { error: e_2_1 }; }
    finally {
        try {
            if (rangeSet_1_1 && !rangeSet_1_1.done && (_b = rangeSet_1.return)) _b.call(rangeSet_1);
        }
        finally { if (e_2) throw e_2.error; }
    }
    return answer - getYbeacons(sensors, yLevel);
}
exports.solveA = solveA;
function solveB(lines) {
    var e_3, _a, e_4, _b;
    var sensors = parseLines(lines, 0);
    for (var yLevel = 0; yLevel <= 4000000; yLevel++) {
        var rangeSet = new Set();
        try {
            for (var sensors_2 = (e_3 = void 0, __values(sensors)), sensors_2_1 = sensors_2.next(); !sensors_2_1.done; sensors_2_1 = sensors_2.next()) {
                var sensor = sensors_2_1.value;
                sensor.determineYrange(yLevel);
                insertRange(sensor.range, rangeSet);
            }
        }
        catch (e_3_1) { e_3 = { error: e_3_1 }; }
        finally {
            try {
                if (sensors_2_1 && !sensors_2_1.done && (_a = sensors_2.return)) _a.call(sensors_2);
            }
            finally { if (e_3) throw e_3.error; }
        }
        var ranges = [];
        if (rangeSet.size > 1) {
            try {
                for (var rangeSet_2 = (e_4 = void 0, __values(rangeSet)), rangeSet_2_1 = rangeSet_2.next(); !rangeSet_2_1.done; rangeSet_2_1 = rangeSet_2.next()) {
                    var range = rangeSet_2_1.value;
                    ranges.push(range);
                }
            }
            catch (e_4_1) { e_4 = { error: e_4_1 }; }
            finally {
                try {
                    if (rangeSet_2_1 && !rangeSet_2_1.done && (_b = rangeSet_2.return)) _b.call(rangeSet_2);
                }
                finally { if (e_4) throw e_4.error; }
            }
            return (Math.max(ranges[0].begin, ranges[1].begin) - 1) * 4000000 + yLevel;
        }
    }
}
exports.solveB = solveB;
function insertRange(newRange, rangeSet) {
    var e_5, _a;
    if (newRange === undefined) {
        return;
    }
    var overlap = false;
    try {
        for (var rangeSet_3 = __values(rangeSet), rangeSet_3_1 = rangeSet_3.next(); !rangeSet_3_1.done; rangeSet_3_1 = rangeSet_3.next()) {
            var range = rangeSet_3_1.value;
            if (range.begin <= newRange.begin - 1 && newRange.begin - 1 <= range.end) {
                newRange.begin = range.begin;
                overlap = true;
            }
            if (range.begin <= newRange.end + 1 && newRange.end + 1 <= range.end) {
                newRange.end = range.end;
                overlap = true;
            }
            if (newRange.begin <= range.begin && range.end <= newRange.end) {
                overlap = true;
            }
            if (overlap) {
                rangeSet.delete(range);
                insertRange(newRange, rangeSet);
                return;
            }
        }
    }
    catch (e_5_1) { e_5 = { error: e_5_1 }; }
    finally {
        try {
            if (rangeSet_3_1 && !rangeSet_3_1.done && (_a = rangeSet_3.return)) _a.call(rangeSet_3);
        }
        finally { if (e_5) throw e_5.error; }
    }
    rangeSet.add(newRange);
    return;
}
function parseLines(inputString, yLevel) {
    var e_6, _a;
    var lines = inputString.split(/\r?\n/);
    var sensors = [];
    try {
        for (var lines_1 = __values(lines), lines_1_1 = lines_1.next(); !lines_1_1.done; lines_1_1 = lines_1.next()) {
            var line = lines_1_1.value;
            var sensorString = line.split(': ')[0];
            var beaconString = line.split(': ')[1];
            var sensorX = parseInt(sensorString.split(', ')[0].split("=")[1]);
            var sensorY = parseInt(sensorString.split(', ')[1].split("=")[1]);
            var beaconX = parseInt(beaconString.split(', ')[0].split("=")[1]);
            var beaconY = parseInt(beaconString.split(', ')[1].split("=")[1]);
            sensors.push(new Sensor(sensorX, sensorY, beaconX, beaconY, yLevel));
        }
    }
    catch (e_6_1) { e_6 = { error: e_6_1 }; }
    finally {
        try {
            if (lines_1_1 && !lines_1_1.done && (_a = lines_1.return)) _a.call(lines_1);
        }
        finally { if (e_6) throw e_6.error; }
    }
    return sensors;
}
var Sensor = (function () {
    function Sensor(x, y, beaconX, beaconY, yLevel) {
        this.x = x;
        this.y = y;
        this.beaconX = beaconX;
        this.beaconY = beaconY;
        this.beaconDistance = manhattanDistance(x, y, beaconX, beaconY);
    }
    Sensor.prototype.determineYrange = function (yLevel) {
        var xBegin = -Math.abs(this.x - this.beaconX) - Math.abs(this.y - this.beaconY) + Math.abs(this.y - yLevel) + this.x;
        var xEnd = Math.abs(this.x - this.beaconX) + Math.abs(this.y - this.beaconY) - Math.abs(this.y - yLevel) + this.x;
        if (manhattanDistance(xBegin, yLevel, this.x, this.y) !== this.beaconDistance || manhattanDistance(xEnd, yLevel, this.x, this.y) !== this.beaconDistance) {
            this.range = undefined;
        }
        else {
            this.range = { begin: xBegin, end: xEnd };
        }
    };
    return Sensor;
}());
function manhattanDistance(xa, ya, xb, yb) {
    return Math.abs(xa - xb) + Math.abs(ya - yb);
}
function getYbeacons(sensors, yLevel) {
    var e_7, _a;
    var beaconCount = 0;
    try {
        for (var sensors_3 = __values(sensors), sensors_3_1 = sensors_3.next(); !sensors_3_1.done; sensors_3_1 = sensors_3.next()) {
            var sensor = sensors_3_1.value;
            if (sensor.beaconY === yLevel) {
                beaconCount++;
            }
        }
    }
    catch (e_7_1) { e_7 = { error: e_7_1 }; }
    finally {
        try {
            if (sensors_3_1 && !sensors_3_1.done && (_a = sensors_3.return)) _a.call(sensors_3);
        }
        finally { if (e_7) throw e_7.error; }
    }
    return beaconCount;
}
function getBeacons(yLevel, beaconSet) {
    var e_8, _a;
    var beaconCount = 0;
    try {
        for (var beaconSet_1 = __values(beaconSet), beaconSet_1_1 = beaconSet_1.next(); !beaconSet_1_1.done; beaconSet_1_1 = beaconSet_1.next()) {
            var beacon = beaconSet_1_1.value;
            if (parseInt(beacon.split(',')[1]) === yLevel) {
                beaconCount++;
            }
        }
    }
    catch (e_8_1) { e_8 = { error: e_8_1 }; }
    finally {
        try {
            if (beaconSet_1_1 && !beaconSet_1_1.done && (_a = beaconSet_1.return)) _a.call(beaconSet_1);
        }
        finally { if (e_8) throw e_8.error; }
    }
    return beaconCount;
}
//# sourceMappingURL=day15.js.map