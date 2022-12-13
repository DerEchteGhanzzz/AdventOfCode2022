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
    var heightMap = parseLines(lines);
    var _a = __read(getStartAndEnd(heightMap), 2), start = _a[0], end = _a[1];
    return aStar(start, end, heightMap, false);
}
exports.solveA = solveA;
function solveB(lines) {
    var heightMap = parseLines(lines);
    var _a = __read(getStartAndEnd(heightMap), 2), start = _a[0], end = _a[1];
    start.letter = "a";
    return dijkstra(end, start, heightMap, true);
}
exports.solveB = solveB;
function parseLines(inputString) {
    var lines = inputString.split(/\r?\n/);
    var input = [];
    for (var y = 0; y < lines.length; y++) {
        var nodeLine = [];
        for (var x = 0; x < lines[y].length; x++) {
            nodeLine.push(new HeightNode(1, { x: x, y: y }, lines[y].charAt(x)));
        }
        input.push(nodeLine);
    }
    return input;
}
function aStar(start, end, graph, reverse) {
    var e_1, _a;
    var priorityQueue = new PriorityQueue();
    priorityQueue.enqueue(start, getDistance(start, end));
    var previousNodeMap = new Map();
    var distanceMap = new Map();
    distanceMap.set(start, 0);
    var enqueued = new Set();
    while (!priorityQueue.isEmpty()) {
        var currentNode = priorityQueue.dequeue().element;
        if (currentNode === end) {
            return distanceMap.get(currentNode);
        }
        try {
            for (var _b = (e_1 = void 0, __values(getNeighs(currentNode.coords, graph, reverse))), _c = _b.next(); !_c.done; _c = _b.next()) {
                var neighbour = _c.value;
                var distanceToNeighbour = distanceMap.get(currentNode) + neighbour.value;
                if (distanceMap.get(neighbour) === undefined || distanceToNeighbour < distanceMap.get(neighbour)) {
                    distanceMap.set(neighbour, distanceToNeighbour);
                    previousNodeMap.set(neighbour, currentNode);
                    if (!enqueued.has(neighbour)) {
                        priorityQueue.enqueue(neighbour, distanceToNeighbour + getDistance(neighbour, end));
                        enqueued.add(currentNode);
                    }
                }
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_1) throw e_1.error; }
        }
    }
    return Infinity;
}
function getDistance(here, there) {
    return Math.abs(here.coords.x - there.coords.x + here.coords.y - there.coords.y);
}
function dijkstra(start, end, graph, reverse) {
    var e_2, _a;
    var distanceDict = new Map();
    distanceDict.set(start, 0);
    var queue = new Map();
    queue.set(start, 0);
    var visited = new Set();
    var pathDictionary = new Map();
    while (queue.size > 0) {
        var currentNode = __spreadArray([], __read(queue), false)[0][0];
        if (currentNode.letter === end.letter) {
            return distanceDict.get(currentNode);
        }
        visited.add(currentNode);
        queue.delete(currentNode);
        try {
            for (var _b = (e_2 = void 0, __values(getNeighs(currentNode.coords, graph, reverse))), _c = _b.next(); !_c.done; _c = _b.next()) {
                var neigh = _c.value;
                if (visited.has(neigh)) {
                    continue;
                }
                distanceDict.set(neigh, neigh.value + distanceDict.get(currentNode));
                pathDictionary.set(neigh, currentNode);
                queue.set(neigh, distanceDict.get(neigh));
            }
        }
        catch (e_2_1) { e_2 = { error: e_2_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_2) throw e_2.error; }
        }
    }
    return Infinity;
}
function getNeighs(coords, graph, reverse) {
    var neighs = [];
    for (var i = -1; i < 2; i++) {
        for (var j = -1; j < 2; j++) {
            var neighbourX = coords.x + i;
            var neighbourY = coords.y + j;
            if (neighbourX < 0 || neighbourX >= graph[coords.y].length ||
                neighbourY < 0 || neighbourY >= graph.length ||
                Math.abs(i) === Math.abs(j)) {
                continue;
            }
            if (reverse) {
                if (!(graph[coords.y][coords.x].height <= graph[neighbourY][neighbourX].height + 1)) {
                    continue;
                }
            }
            else {
                if (!(graph[coords.y][coords.x].height >= graph[neighbourY][neighbourX].height - 1)) {
                    continue;
                }
            }
            neighs.push(graph[neighbourY][neighbourX]);
        }
    }
    return neighs;
}
function printPath(current, pathDictionary) {
    if (pathDictionary.has(current)) {
        printPath(pathDictionary.get(current), pathDictionary);
    }
    console.log("".concat(current.height, " at ").concat(current.coords.x, ", ").concat(current.coords.y));
}
function getStartAndEnd(graph) {
    var start;
    var end;
    for (var y = 0; y < graph.length; y++) {
        for (var x = 0; x < graph[y].length; x++) {
            if (graph[y][x].letter === "S") {
                start = graph[y][x];
            }
            else if (graph[y][x].letter === "E") {
                end = graph[y][x];
            }
        }
    }
    return [start, end];
}
var HeightNode = (function () {
    function HeightNode(value, coords, letter) {
        this.value = value;
        this.coords = coords;
        this.letter = letter;
        if (letter.toUpperCase() === letter) {
            this.height = this.letter === "S" ? 0 : 25;
        }
        else {
            this.height = letter.charCodeAt(0) - "a".charCodeAt(0);
        }
    }
    return HeightNode;
}());
var PriorityQueue = (function () {
    function PriorityQueue() {
        this.items = [];
    }
    PriorityQueue.prototype.enqueue = function (element, priority) {
        var qElement = { element: element, priority: priority };
        var contain = false;
        for (var i = 0; i < this.items.length; i++) {
            if (this.items[i].priority > qElement.priority) {
                this.items.splice(i, 0, qElement);
                contain = true;
                break;
            }
        }
        if (!contain) {
            this.items.push(qElement);
        }
    };
    PriorityQueue.prototype.dequeue = function () {
        if (this.isEmpty())
            return undefined;
        return this.items.shift();
    };
    PriorityQueue.prototype.front = function () {
        if (this.isEmpty())
            return undefined;
        return this.items[0];
    };
    PriorityQueue.prototype.rear = function () {
        if (this.isEmpty())
            return undefined;
        return this.items[this.items.length - 1];
    };
    PriorityQueue.prototype.isEmpty = function () {
        return this.items.length == 0;
    };
    PriorityQueue.prototype.printPQueue = function () {
        var str = "";
        for (var i = 0; i < this.items.length; i++)
            str += this.items[i].element + " ";
        return str;
    };
    return PriorityQueue;
}());
//# sourceMappingURL=day12.js.map