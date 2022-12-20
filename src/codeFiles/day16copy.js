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
    var e_1, _a, e_2, _b;
    var network = parseLines(lines);
    var answer = 0;
    var paths = new Set();
    var currentPosition = "AA";
    var currentPath = [];
    solveTSP(currentPosition, currentPath, paths, network, 30);
    try {
        for (var paths_1 = __values(paths), paths_1_1 = paths_1.next(); !paths_1_1.done; paths_1_1 = paths_1.next()) {
            var path = paths_1_1.value;
            var pressure = 0;
            var timeLeft = 30;
            var previousValve = "AA";
            try {
                for (var path_1 = (e_2 = void 0, __values(path)), path_1_1 = path_1.next(); !path_1_1.done; path_1_1 = path_1.next()) {
                    var valve = path_1_1.value;
                    timeLeft -= network.get(previousValve).distanceMatrix.get(valve) + 1;
                    pressure += network.get(valve).flowRate * timeLeft;
                    previousValve = valve;
                }
            }
            catch (e_2_1) { e_2 = { error: e_2_1 }; }
            finally {
                try {
                    if (path_1_1 && !path_1_1.done && (_b = path_1.return)) _b.call(path_1);
                }
                finally { if (e_2) throw e_2.error; }
            }
            if (pressure > answer) {
                answer = pressure;
            }
        }
    }
    catch (e_1_1) { e_1 = { error: e_1_1 }; }
    finally {
        try {
            if (paths_1_1 && !paths_1_1.done && (_a = paths_1.return)) _a.call(paths_1);
        }
        finally { if (e_1) throw e_1.error; }
    }
    return answer;
}
exports.solveA = solveA;
function solveB(lines) {
    var network = parseLines(lines);
    var unopenedValves = new Set();
    network.forEach(function (value, key) {
        if (value.flowRate > 0) {
            unopenedValves.add(value);
        }
    });
    return solveMTSP(["AA", "AA"], [26, 26], 0, unopenedValves, network, 0);
}
exports.solveB = solveB;
function solveMTSP(currentPositions, timesLeft, flow, unopenedValves, network, depth) {
    var e_3, _a, e_4, _b;
    if (unopenedValves.size === 0) {
        return flow;
    }
    var flowSet = new Set();
    var combination;
    var haveHad;
    if (depth === 0) {
        combination = combinations(unopenedValves.size, 2);
        haveHad = new Set();
        console.log(combination);
    }
    try {
        for (var unopenedValves_1 = __values(unopenedValves), unopenedValves_1_1 = unopenedValves_1.next(); !unopenedValves_1_1.done; unopenedValves_1_1 = unopenedValves_1.next()) {
            var valveOne = unopenedValves_1_1.value;
            try {
                for (var unopenedValves_2 = (e_4 = void 0, __values(unopenedValves)), unopenedValves_2_1 = unopenedValves_2.next(); !unopenedValves_2_1.done; unopenedValves_2_1 = unopenedValves_2.next()) {
                    var valveTwo = unopenedValves_2_1.value;
                    if (valveTwo === valveOne) {
                        continue;
                    }
                    if (depth === 0) {
                        if (haveHad.has(valveOne.letter + "," + valveTwo.letter)) {
                            continue;
                        }
                        console.log("Starting at: " + valveOne.letter + " and " + valveTwo.letter + "\nNow at " + haveHad.size / combination * 50 + "%");
                        haveHad.add(valveOne.letter + "," + valveTwo.letter);
                        haveHad.add(valveTwo.letter + "," + valveOne.letter);
                    }
                    var currentFlow = flow;
                    var myValve = network.get(currentPositions[0]);
                    var myDistance = network.get(currentPositions[0]).distanceMatrix.get(valveOne.letter);
                    var myTimeLeft = timesLeft[0] - myDistance - 1 > 0 ? timesLeft[0] - myDistance - 1 : 0;
                    var elephantDistance = network.get(currentPositions[1]).distanceMatrix.get(valveTwo.letter);
                    var elephantTimeLeft = timesLeft[1] - elephantDistance - 1 > 0 ? timesLeft[1] - elephantDistance - 1 : 0;
                    var elephantValve = network.get(currentPositions[1]);
                    if (myTimeLeft > 0) {
                        myValve = valveOne;
                    }
                    if (elephantTimeLeft > 0) {
                        elephantValve = valveTwo;
                    }
                    if (myTimeLeft <= 0 && elephantTimeLeft <= 0) {
                        flowSet.add(currentFlow);
                        continue;
                    }
                    var copiedUnopenedValves = new Set(unopenedValves);
                    copiedUnopenedValves.delete(myValve);
                    copiedUnopenedValves.delete(elephantValve);
                    currentFlow += myTimeLeft * valveOne.flowRate + elephantTimeLeft * valveTwo.flowRate;
                    flowSet.add(solveMTSP([myValve.letter, elephantValve.letter], [myTimeLeft, elephantTimeLeft], currentFlow, copiedUnopenedValves, network, depth + 1));
                }
            }
            catch (e_4_1) { e_4 = { error: e_4_1 }; }
            finally {
                try {
                    if (unopenedValves_2_1 && !unopenedValves_2_1.done && (_b = unopenedValves_2.return)) _b.call(unopenedValves_2);
                }
                finally { if (e_4) throw e_4.error; }
            }
        }
    }
    catch (e_3_1) { e_3 = { error: e_3_1 }; }
    finally {
        try {
            if (unopenedValves_1_1 && !unopenedValves_1_1.done && (_a = unopenedValves_1.return)) _a.call(unopenedValves_1);
        }
        finally { if (e_3) throw e_3.error; }
    }
    return Math.max.apply(Math, __spread(flowSet));
}
function solveTSP(currentPosition, currentPath, paths, network, timeLeft) {
    var e_5, _a;
    var count = 0;
    try {
        for (var _b = __values(network.get(currentPosition).distanceMatrix), _c = _b.next(); !_c.done; _c = _b.next()) {
            var _d = __read(_c.value, 2), letter = _d[0], distance = _d[1];
            if (currentPath.includes(letter) || network.get(letter).flowRate === 0) {
                count++;
                if (count === network.get(letter).distanceMatrix.size) {
                    paths.add(currentPath);
                    return;
                }
                continue;
            }
            if (timeLeft - distance - 1 < 0) {
                paths.add(currentPath);
                continue;
            }
            var copyPath = __spread(currentPath);
            copyPath.push(letter);
            solveTSP(letter, copyPath, paths, network, timeLeft - distance - 1);
        }
    }
    catch (e_5_1) { e_5 = { error: e_5_1 }; }
    finally {
        try {
            if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
        }
        finally { if (e_5) throw e_5.error; }
    }
}
function parseLines(inputString) {
    var e_6, _a, e_7, _b;
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
    catch (e_6_1) { e_6 = { error: e_6_1 }; }
    finally {
        try {
            if (lines_1_1 && !lines_1_1.done && (_a = lines_1.return)) _a.call(lines_1);
        }
        finally { if (e_6) throw e_6.error; }
    }
    try {
        for (var network_1 = __values(network), network_1_1 = network_1.next(); !network_1_1.done; network_1_1 = network_1.next()) {
            var _c = __read(network_1_1.value, 2), letter = _c[0], valve = _c[1];
            valve.generateMatrix(network);
        }
    }
    catch (e_7_1) { e_7 = { error: e_7_1 }; }
    finally {
        try {
            if (network_1_1 && !network_1_1.done && (_b = network_1.return)) _b.call(network_1);
        }
        finally { if (e_7) throw e_7.error; }
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
    var e_8, _a;
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
    catch (e_8_1) { e_8 = { error: e_8_1 }; }
    finally {
        try {
            if (neighbours_1_1 && !neighbours_1_1.done && (_a = neighbours_1.return)) _a.call(neighbours_1);
        }
        finally { if (e_8) throw e_8.error; }
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
//# sourceMappingURL=day16copy.js.map