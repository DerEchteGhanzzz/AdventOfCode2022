"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.solveB = exports.solveA = void 0;
function solveA(lines) {
    var answer;
    for (var _i = 0, lines_1 = lines; _i < lines_1.length; _i++) {
        var line = lines_1[_i];
        var strElves = line.split(',');
        var elfOne = strElves[0].split('-').map(function (x) { return parseInt(x, 10); });
        var elfTwo = strElves[1].split('-').map(function (x) { return parseInt(x, 10); });
        var elfOneAmount = elfOne[1] - elfOne[0];
        var elfTwoAmount = elfTwo[1] - elfTwo[0];
        var smallest = elfOneAmount < elfTwoAmount ? elfOne : elfTwo;
        var biggest = elfOneAmount < elfTwoAmount ? elfTwo : elfOne;
        if (biggest[0] <= smallest[0] && smallest[1] <= biggest[1]) {
            answer++;
        }
    }
    return answer;
}
exports.solveA = solveA;
function solveB(lines) {
    var answer = 0;
    for (var _i = 0, lines_2 = lines; _i < lines_2.length; _i++) {
        var line = lines_2[_i];
    }
    return answer;
}
exports.solveB = solveB;
//# sourceMappingURL=day4.js.map