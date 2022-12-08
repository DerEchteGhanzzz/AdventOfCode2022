"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.solveB = exports.solveA = void 0;
function solveA(lines) {
    var jungle = parseLines(lines);
    var visible = 0;
    for (var i = 0; i < jungle.length; i++) {
        for (var j = 0; j < jungle[i].length; j++) {
            visible += (lookToNeighbour(jungle, i, j, 1, 0) ||
                lookToNeighbour(jungle, i, j, -1, 0) ||
                lookToNeighbour(jungle, i, j, 0, 1) ||
                lookToNeighbour(jungle, i, j, 0, -1)) ? 1 : 0;
        }
    }
    return visible;
}
exports.solveA = solveA;
function solveB(lines) {
    var jungle = parseLines(lines);
    var maxViewscore = 0;
    for (var i = 0; i < jungle.length; i++) {
        for (var j = 0; j < jungle[i].length; j++) {
            var currentScore = viewUntilNeighbour(jungle, i, j, 1, 0, 0) *
                viewUntilNeighbour(jungle, i, j, -1, 0, 0) *
                viewUntilNeighbour(jungle, i, j, 0, 1, 0) *
                viewUntilNeighbour(jungle, i, j, 0, -1, 0);
            maxViewscore = currentScore > maxViewscore ? currentScore : maxViewscore;
        }
    }
    return maxViewscore;
}
exports.solveB = solveB;
function lookToNeighbour(jungle, i, j, di, dj) {
    if (i + di === -1 || i + di === jungle.length || j + dj === -1 || j + dj === jungle[i].length) {
        return true;
    }
    else if (jungle[i][j] <= jungle[i + di][j + dj]) {
        return false;
    }
    else {
        di = dj === 0 ? di + Math.sign(di) * 1 : di;
        dj = di === 0 ? dj + Math.sign(dj) * 1 : dj;
        return lookToNeighbour(jungle, i, j, di, dj);
    }
}
function viewUntilNeighbour(jungle, i, j, di, dj, depth) {
    if (i + di === -1 || i + di === jungle.length || j + dj === -1 || j + dj === jungle[i].length) {
        return depth;
    }
    else if (jungle[i][j] <= jungle[i + di][j + dj]) {
        return depth + 1;
    }
    else {
        di = dj === 0 ? di + Math.sign(di) * 1 : di;
        dj = di === 0 ? dj + Math.sign(dj) * 1 : dj;
        return viewUntilNeighbour(jungle, i, j, di, dj, depth + 1);
    }
}
function parseLines(inputString) {
    var lines = inputString.split(/\r?\n/);
    var jungle = [];
    for (var i = 0; i < lines.length; i++) {
        jungle.push([]);
        for (var j = 0; j < lines[i].length; j++) {
            jungle[i].push(parseInt(lines[i].charAt(j)));
        }
    }
    return jungle;
}
//# sourceMappingURL=day8.js.map