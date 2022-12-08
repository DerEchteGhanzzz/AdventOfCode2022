"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.solveB = exports.solveA = void 0;
var modulo = require('../aocUtils').modulo;
function solveA(lines) {
    var answer = 0;
    for (var _i = 0, lines_1 = lines; _i < lines_1.length; _i++) {
        var line = lines_1[_i];
        var opponent = line.charCodeAt(0) - "A".charCodeAt(0);
        var you = line.charCodeAt(2) - "X".charCodeAt(0);
        answer += modulo(you - opponent + 3 + 1, 3) * 3 + you + 1;
    }
    return answer;
}
exports.solveA = solveA;
function solveB(lines) {
    var answer = 0;
    for (var _i = 0, lines_2 = lines; _i < lines_2.length; _i++) {
        var line = lines_2[_i];
        var opponent = line.charCodeAt(0) - "A".charCodeAt(0);
        var outcome = line.charCodeAt(2) - "X".charCodeAt(0);
        answer += 3 * outcome + modulo(opponent + outcome - 1, 3) + 1;
    }
    return answer;
}
exports.solveB = solveB;
//# sourceMappingURL=day2.js.map