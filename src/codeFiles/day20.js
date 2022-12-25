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
Object.defineProperty(exports, "__esModule", { value: true });
exports.solveB = exports.solveA = void 0;
var modulo = require('../aocUtils').modulo;
function solveA(lines) {
    var _a = __read(parseLines(lines), 2), digitMap = _a[0], digitOrders = _a[1];
    mixList(digitOrders, digitMap);
    return getGrove(digitOrders, digitMap);
}
exports.solveA = solveA;
function solveB(lines) {
    var _a = __read(parseLines(lines), 2), digitMap = _a[0], digitOrders = _a[1];
    var publicKey = 811589153;
    digitMap.forEach(function (v, k) { return digitMap.set(k, v * publicKey); });
    for (var i = 0; i < 10; i++) {
        mixList(digitOrders, digitMap);
    }
    return getGrove(digitOrders, digitMap);
}
exports.solveB = solveB;
function parseLines(inputString) {
    var lines = inputString.split(/\r?\n/);
    var digitMap = new Map();
    var digitOrderList = [];
    for (var i = 0; i < lines.length; i++) {
        var currentDigit = parseInt(lines[i]);
        digitMap.set(i, currentDigit);
        digitOrderList.push(i);
    }
    return [digitMap, digitOrderList];
}
function getGrove(digitOrders, digitMap) {
    var finalArray = digitOrders.map(function (a) { return digitMap.get(a); });
    var answer = 0;
    var zeroIndex = finalArray.indexOf(0);
    for (var i = 1000; i < 4000; i += 1000) {
        var groveDigit = finalArray[(zeroIndex + i) % (digitMap.size)];
        answer += groveDigit;
    }
    return answer;
}
function mixList(digitOrders, digitMap) {
    for (var i = 0; i < digitMap.size; i++) {
        var currentIndex = digitOrders.indexOf(i);
        var currentDigit = digitMap.get(digitOrders.splice(currentIndex, 1)[0]);
        var negative = currentDigit < 0 ? -1 : 0;
        if (negative === -1 && currentIndex + currentDigit + negative < digitOrders.length) {
            negative = 0;
        }
        var newIndex = modulo(currentIndex + currentDigit + negative, digitOrders.length);
        digitOrders.splice(newIndex, 0, i);
    }
    return;
}
//# sourceMappingURL=day20.js.map