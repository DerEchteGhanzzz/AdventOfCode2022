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
var __spread = (this && this.__spread) || function () {
    for (var ar = [], i = 0; i < arguments.length; i++) ar = ar.concat(__read(arguments[i]));
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
    var network = parseLines(lines);
    var unopenedValves = new Set();
    network.forEach(function (value, key) {
        if (value.flowRate > 0) {
            unopenedValves.add(value.letter);
        }
    });
    return solveTSP("AA", 30, 0, unopenedValves, network, 0);
}
exports.solveA = solveA;
function solveB(lines) {
    var network = parseLines(lines);
    var unopenedValves = new Array();
    network.forEach(function (value, key) {
        if (value.flowRate > 0) {
            unopenedValves.push(value.letter);
        }
    });
    var size = unopenedValves.length;
    var flowChart = [];
    var haveHad = new Set();
    for (var i = Math.pow(2, size - 1); i < Math.pow(2, size); i++) {
        var binaries = i.toString(2);
        var myUnopenedValves = new Set();
        var elephantUnopenedValves = new Set();
        for (var b = 0; b < size; b++) {
            if (binaries.charAt(b) === "1") {
                myUnopenedValves.add(unopenedValves[b]);
            }
            else {
                elephantUnopenedValves.add(unopenedValves[b]);
            }
        }
        var myString = JSON.stringify(__spread(myUnopenedValves));
        var elephantString = JSON.stringify(__spread(elephantUnopenedValves));
        if (haveHad.has(myString + "," + elephantString)) {
            continue;
        }
        haveHad.add(myString + "," + elephantString);
        haveHad.add(elephantString + "," + myString);
        flowChart.push(solveTSP("AA", 26, 0, myUnopenedValves, network, 0) +
            solveTSP("AA", 26, 0, elephantUnopenedValves, network, 0));
    }
    return Math.max.apply(Math, __spread(flowChart));
}
exports.solveB = solveB;
function solveTSP(currentPosition, timeLeft, flow, unopenedValves, network, depth) {
    var e_1, _a;
    if (unopenedValves.size === 0) {
        return flow;
    }
    var flowSet = new Set();
    try {
        for (var unopenedValves_1 = __values(unopenedValves), unopenedValves_1_1 = unopenedValves_1.next(); !unopenedValves_1_1.done; unopenedValves_1_1 = unopenedValves_1.next()) {
            var letterOne = unopenedValves_1_1.value;
            var myDistance = network.get(currentPosition).distanceMatrix.get(letterOne);
            var newTimeLeft = timeLeft - myDistance - 1 > 0 ? timeLeft - myDistance - 1 : 0;
            if (newTimeLeft <= 0) {
                flowSet.add(flow);
                continue;
            }
            var copiedUnopenedValves = new Set(unopenedValves);
            copiedUnopenedValves.delete(letterOne);
            var newFlow = flow + newTimeLeft * network.get(letterOne).flowRate;
            flowSet.add(solveTSP(letterOne, newTimeLeft, newFlow, copiedUnopenedValves, network, depth + 1));
        }
    }
    catch (e_1_1) { e_1 = { error: e_1_1 }; }
    finally {
        try {
            if (unopenedValves_1_1 && !unopenedValves_1_1.done && (_a = unopenedValves_1.return)) _a.call(unopenedValves_1);
        }
        finally { if (e_1) throw e_1.error; }
    }
    return Math.max.apply(Math, __spread(flowSet));
}
function parseLines(inputString) {
    var e_2, _a, e_3, _b;
    var lines = inputString.split(/\r?\n/);
    var network = new Map();
    try {
        for (var lines_1 = __values(lines), lines_1_1 = lines_1.next(); !lines_1_1.done; lines_1_1 = lines_1.next()) {
            var line = lines_1_1.value;
            var letter = line.match(/([A-Z]{2})/g)[0];
            var neighbours = line.match(/([A-Z]{2})/g);
            var flowRate = parseInt(line.match(/([0-9]+)/)[0]);
            var valve = new Valve(letter, flowRate, neighbours);
            network.set(letter, valve);
        }
    }
    catch (e_2_1) { e_2 = { error: e_2_1 }; }
    finally {
        try {
            if (lines_1_1 && !lines_1_1.done && (_a = lines_1.return)) _a.call(lines_1);
        }
        finally { if (e_2) throw e_2.error; }
    }
    try {
        for (var network_1 = __values(network), network_1_1 = network_1.next(); !network_1_1.done; network_1_1 = network_1.next()) {
            var _c = __read(network_1_1.value, 2), letter = _c[0], valve = _c[1];
            valve.generateMatrix(network);
        }
    }
    catch (e_3_1) { e_3 = { error: e_3_1 }; }
    finally {
        try {
            if (network_1_1 && !network_1_1.done && (_b = network_1.return)) _b.call(network_1);
        }
        finally { if (e_3) throw e_3.error; }
    }
    return network;
}
var Valve = (function () {
    function Valve(letter, flowRate, neighbours) {
        this.letter = letter;
        this.flowRate = flowRate;
        this.neighbours = neighbours;
    }
    Valve.prototype.generateMatrix = function (network) {
        var _this = this;
        this.distanceMatrix = new Map();
        this.distanceMatrix.set(this.letter, 0);
        goThroughNetwork(this.neighbours, network, this.distanceMatrix, 0);
        Array.from(this.distanceMatrix).filter(function (value) {
            if (network.get(value[0]).flowRate === 0) {
                _this.distanceMatrix.delete(value[0]);
            }
        });
    };
    return Valve;
}());
function goThroughNetwork(neighbours, network, distanceMatrix, currentDistance) {
    var e_4, _a;
    currentDistance++;
    try {
        for (var neighbours_1 = __values(neighbours), neighbours_1_1 = neighbours_1.next(); !neighbours_1_1.done; neighbours_1_1 = neighbours_1.next()) {
            var neighbour = neighbours_1_1.value;
            if (distanceMatrix.get(neighbour) === undefined || distanceMatrix.get(neighbour) > currentDistance) {
                distanceMatrix.set(neighbour, currentDistance);
                goThroughNetwork(network.get(neighbour).neighbours, network, distanceMatrix, currentDistance);
            }
        }
    }
    catch (e_4_1) { e_4 = { error: e_4_1 }; }
    finally {
        try {
            if (neighbours_1_1 && !neighbours_1_1.done && (_a = neighbours_1.return)) _a.call(neighbours_1);
        }
        finally { if (e_4) throw e_4.error; }
    }
}
function product_Range(a, b) {
    var prd = a, i = a;
    while (i++ < b) {
        prd *= i;
    }
    return prd;
}
function combinations(n, r) {
    if (n == r || r == 0) {
        return 1;
    }
    else {
        r = (r < n - r) ? n - r : r;
        return product_Range(r + 1, n) / product_Range(1, n - r);
    }
}
//# sourceMappingURL=day16.js.map