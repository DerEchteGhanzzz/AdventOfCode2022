"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.solveB = exports.solveA = void 0;
function solveA(lines) {
    var answer = 0;
    for (var _i = 0, lines_1 = lines; _i < lines_1.length; _i++) {
        var line = lines_1[_i];
        var compOne = line.substring(0, line.length / 2);
        var compTwo = line.substring(line.length / 2, line.length);
        for (var _a = 0, compOne_1 = compOne; _a < compOne_1.length; _a++) {
            var item = compOne_1[_a];
            if (compTwo.includes(item)) {
                answer += priorityValue(item);
                break;
            }
        }
    }
    return answer;
}
exports.solveA = solveA;
function solveB(lines) {
    var answer = 0;
    for (var i = 0; i < lines.length; i += 3) {
        for (var _i = 0, _a = lines[i]; _i < _a.length; _i++) {
            var item = _a[_i];
            if (lines[i + 1].includes(item) && lines[i + 2].includes(item)) {
                answer += priorityValue(item);
                break;
            }
        }
    }
    return answer;
}
exports.solveB = solveB;
function priorityValue(item) {
    var value;
    if (item === item.toUpperCase()) {
        value = item.charCodeAt(0) - "A".charCodeAt(0) + 26 + 1;
    }
    else {
        value = item.charCodeAt(0) - "a".charCodeAt(0) + 1;
    }
    return value;
}
//# sourceMappingURL=day3.js.map