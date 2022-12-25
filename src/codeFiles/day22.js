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
exports.Face = exports.solveB = exports.solveA = void 0;
var aocUtils_1 = require("../aocUtils");
function solveA(lines) {
    var e_1, _a;
    var _b = __read(parseLines(lines), 2), faces = _b[0], directions = _b[1];
    var currentFace = 0;
    var faceNeighbours = new Map([[0, [1, 2, 1, 4]], [1, [0, 1, 0, 1]], [2, [2, 4, 2, 0]], [3, [4, 5, 4, 5]], [4, [3, 0, 3, 2]], [5, [5, 3, 5, 3]]]);
    var currentPos = "0,0";
    var turnMap = new Map([[0, "R"], [1, "D"], [2, "L"], [3, "U"]]);
    var directionMap = new Map([["R", [1, 0, 0]], ["D", [0, 1, 1]], ["L", [-1, 0, 2]], ["U", [0, -1, 3]]]);
    var currentDirection = "R";
    try {
        for (var directions_1 = __values(directions), directions_1_1 = directions_1.next(); !directions_1_1.done; directions_1_1 = directions_1.next()) {
            var operation = directions_1_1.value;
            if (!Number.isInteger(operation)) {
                operation = operation;
                currentDirection = turnMap.get((directionMap.get(currentDirection)[2] + directionMap.get(operation)[2] + 1) % 4);
                continue;
            }
            for (var n = 0; n < operation; n++) {
                var _c = __read(parseCoord(currentPos), 2), x_1 = _c[0], y_1 = _c[1];
                var newFace = currentFace;
                var _d = __read([x_1 + directionMap.get(currentDirection)[0], y_1 + directionMap.get(currentDirection)[1]], 2), newX = _d[0], newY = _d[1];
                if (faces[currentFace].get(newX + "," + newY) === undefined) {
                    var directionDigit = directionMap.get(currentDirection)[2];
                    newFace = faceNeighbours.get(currentFace)[directionDigit];
                    newX = aocUtils_1.modulo(newX, Face.size);
                    newY = aocUtils_1.modulo(newY, Face.size);
                }
                if (faces[newFace].get(newX + "," + newY) === "#") {
                    break;
                }
                currentFace = newFace;
                currentPos = newX + "," + newY;
            }
        }
    }
    catch (e_1_1) { e_1 = { error: e_1_1 }; }
    finally {
        try {
            if (directions_1_1 && !directions_1_1.done && (_a = directions_1.return)) _a.call(directions_1);
        }
        finally { if (e_1) throw e_1.error; }
    }
    var _e = __read(faceCoordsToRealCoords(currentFace, parseCoord(currentPos)), 2), x = _e[0], y = _e[1];
    return 1000 * (y + 1) + 4 * (x + 1) + directionMap.get(currentDirection)[2];
}
exports.solveA = solveA;
function solveB(lines) {
    var e_2, _a, _b;
    var _c = __read(parseLines(lines), 2), faces = _c[0], directions = _c[1];
    var currentFace = 0;
    var faceNeighbours = new Map([[0, [1, 2, 3, 5]], [1, [4, 2, 0, 5]], [2, [1, 4, 3, 0]], [3, [4, 5, 0, 2]], [4, [1, 5, 3, 2]], [5, [4, 1, 0, 3]]]);
    var currentPos = "0,0";
    var turnMap = new Map([[0, "R"], [1, "D"], [2, "L"], [3, "U"]]);
    var directionMap = new Map([["R", [1, 0, 0]], ["D", [0, 1, 1]], ["L", [-1, 0, 2]], ["U", [0, -1, 3]]]);
    var currentDirection = "R";
    try {
        for (var directions_2 = __values(directions), directions_2_1 = directions_2.next(); !directions_2_1.done; directions_2_1 = directions_2.next()) {
            var operation = directions_2_1.value;
            if (!Number.isInteger(operation)) {
                operation = operation;
                currentDirection = turnMap.get((directionMap.get(currentDirection)[2] + directionMap.get(operation)[2] + 1) % 4);
                continue;
            }
            for (var n = 0; n < operation; n++) {
                var _d = __read(parseCoord(currentPos), 2), x_2 = _d[0], y_2 = _d[1];
                var newFace = currentFace;
                var newDirection = currentDirection;
                var _e = __read([x_2 + directionMap.get(currentDirection)[0], y_2 + directionMap.get(currentDirection)[1]], 2), newX = _e[0], newY = _e[1];
                if (faces[currentFace].get(newX + "," + newY) === undefined) {
                    _b = __read(getNewCubeFace(newX, newY, directionMap.get(currentDirection), currentFace, faces, faceNeighbours, turnMap), 4), newX = _b[0], newY = _b[1], newDirection = _b[2], newFace = _b[3];
                }
                if (faces[newFace].get(newX + "," + newY) === "#") {
                    break;
                }
                currentDirection = newDirection;
                currentFace = newFace;
                currentPos = newX + "," + newY;
            }
        }
    }
    catch (e_2_1) { e_2 = { error: e_2_1 }; }
    finally {
        try {
            if (directions_2_1 && !directions_2_1.done && (_a = directions_2.return)) _a.call(directions_2);
        }
        finally { if (e_2) throw e_2.error; }
    }
    var _f = __read(faceCoordsToRealCoords(currentFace, parseCoord(currentPos)), 2), x = _f[0], y = _f[1];
    return 1000 * (y + 1) + 4 * (x + 1) + directionMap.get(currentDirection)[2];
}
exports.solveB = solveB;
function getNewCubeFace(x, y, direction, currentFace, faces, faceNeighs, turnMap) {
    var _a;
    var newFace = faceNeighs.get(currentFace)[direction[2]];
    var newDirection = (faceNeighs.get(newFace).indexOf(currentFace) + 2) % 4;
    _a = __read(transpose(x, y, direction[2], direction, newDirection), 2), x = _a[0], y = _a[1];
    return [x, y, turnMap.get(newDirection), newFace];
}
function transpose(x, y, direction, vector, newDirection) {
    if (direction === newDirection) {
        return [aocUtils_1.modulo(x, Face.size), aocUtils_1.modulo(y, Face.size)];
    }
    if (Math.abs(direction - newDirection) === 2) {
        if (newDirection === 0 || newDirection === 1) {
            x = newDirection === 0 ? 0 : aocUtils_1.modulo((Face.size - 1) - x, Face.size);
            y = newDirection === 1 ? 0 : aocUtils_1.modulo((Face.size - 1) - y, Face.size);
        }
        else {
            x = newDirection === 2 ? Face.size - 1 : aocUtils_1.modulo((Face.size - 1) - x, Face.size);
            y = newDirection === 3 ? Face.size - 1 : aocUtils_1.modulo((Face.size - 1) - y, Face.size);
        }
        return [x, y];
    }
    if (newDirection == 3) {
        x = Face.size - 1;
    }
    if (newDirection == 1) {
        x = 0;
    }
    if (newDirection == 0) {
        y = 0;
    }
    if (newDirection == 2) {
        y = Face.size - 1;
    }
    return [y, x];
}
function getBegin(x, y, direction, grid) {
    var _a, _b;
    var currentPos = x + "," + y;
    while (grid.get(currentPos) !== undefined) {
        _a = __read(parseCoord(currentPos), 2), x = _a[0], y = _a[1];
        _b = __read([x - direction[0], y - direction[1]], 2), x = _b[0], y = _b[1];
        currentPos = x + "," + y;
    }
    return [x + direction[0], y + direction[1]];
}
function getStartPosition(grid) {
    var startPos = "0,0";
    var i = 0;
    while (grid.get(startPos) === undefined) {
        var _a = __read(parseCoord(startPos), 2), x = _a[0], y = _a[1];
        startPos = (i).toString() + "," + y;
        i++;
    }
    return startPos;
}
function parseCoord(coord) {
    return [parseInt(coord.split(",")[0]), parseInt(coord.split(",")[1])];
}
function parseLines(inputString) {
    var lines = inputString.split(/\r?\n\r?\n/);
    var field = lines[0].split(/\r?\n/);
    var directionString = lines[1].split("");
    var directions = [];
    for (var i = 0; i < directionString.length; i++) {
        if (!Number.isNaN(parseInt(directionString[i]))) {
            var currentStep = parseInt(directionString[i]);
            if (!Number.isNaN(parseInt(directionString[i + 1]))) {
                currentStep = currentStep * 10 + parseInt(directionString[i + 1]);
                i++;
            }
            directions.push(currentStep);
        }
        else {
            directions.push(directionString[i]);
        }
    }
    Face.size = field[0].length / 3;
    var faces = [];
    var zero = new Map();
    var one = new Map();
    var two = new Map();
    var three = new Map();
    var four = new Map();
    var five = new Map();
    for (var j = 0; j < field.length; j++) {
        for (var i = 0; i < field[0].split("").length; i++) {
            if (field[j].charAt(i) === " ") {
                continue;
            }
            var _a = __read([i % Face.size, j % Face.size], 2), rI = _a[0], rJ = _a[1];
            if (i < Face.size * 2 && j < Face.size) {
                zero.set(rI + "," + rJ, field[j].charAt(i));
            }
            else if (j < Face.size) {
                one.set(rI + "," + rJ, field[j].charAt(i));
            }
            else if (j < Face.size * 2 && i < Face.size * 2) {
                two.set(rI + "," + rJ, field[j].charAt(i));
            }
            else if (j < Face.size * 3 && i < Face.size) {
                three.set(rI + "," + rJ, field[j].charAt(i));
            }
            else if (j < Face.size * 3 && i < Face.size * 2) {
                four.set(rI + "," + rJ, field[j].charAt(i));
            }
            else if (j < Face.size * 4 && i < Face.size) {
                five.set(rI + "," + rJ, field[j].charAt(i));
            }
        }
    }
    faces.push(zero);
    faces.push(one);
    faces.push(two);
    faces.push(three);
    faces.push(four);
    faces.push(five);
    return [faces, directions];
}
function faceCoordsToRealCoords(face, _a) {
    var _b = __read(_a, 2), x = _b[0], y = _b[1];
    switch (face) {
        case 0:
            return [x + Face.size, y];
        case 1:
            return [x + Face.size * 2, y];
        case 2:
            return [x + Face.size, y + Face.size];
        case 3:
            return [x, y + Face.size * 2];
        case 4:
            return [x + Face.size, y + Face.size * 2];
        case 5:
            return [x, y + Face.size * 3];
    }
}
var Face = (function () {
    function Face() {
    }
    Face.size = 10;
    return Face;
}());
exports.Face = Face;
//# sourceMappingURL=day22.js.map