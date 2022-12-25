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
exports.MonkeyMap = exports.solveB = exports.solveA = void 0;
function solveA(lines) {
    var monkeyMap = parseLines(lines);
    MonkeyMap.monkeyMap = monkeyMap;
    return shoutAnswer("root");
}
exports.solveA = solveA;
function solveB(lines) {
    var monkeyMap = parseLines(lines);
    MonkeyMap.monkeyMap = monkeyMap;
    var i = 0;
    MonkeyMap.monkeyMap.set("humn", ["humn"]);
    return solveForX(generateEquation(monkeyMap.get("root")[0]), generateEquation(monkeyMap.get("root")[2]), "humn");
}
exports.solveB = solveB;
function solveForX(equationOne, answer, x) {
    var _a;
    if (equationOne === x) {
        return answer;
    }
    equationOne = equationOne.substr(2, equationOne.length - 4);
    var brackets = 0;
    for (var i = 0; i < equationOne.length; i++) {
        if (equationOne.charAt(i) === "(") {
            brackets++;
        }
        else if (equationOne.charAt(i) === ")") {
            brackets--;
        }
        if (brackets === 0) {
            var operator = equationOne.charAt(i);
            if (!operator.match(/[+\-*\/]/)) {
                continue;
            }
            var leftHand = equationOne.substr(0, i - 1);
            var rightHand = equationOne.substr(i + 2, equationOne.length);
            var swapped = false;
            if (isNaN(parseInt(rightHand))) {
                swapped = true;
                _a = __read([rightHand, leftHand], 2), leftHand = _a[0], rightHand = _a[1];
            }
            var rightHandValue = parseInt(rightHand);
            switch (operator) {
                case "+":
                    rightHandValue *= -1;
                    break;
                case "-":
                    if (swapped) {
                        answer *= -1;
                    }
                    rightHandValue *= -1;
                    break;
                case "*":
                    rightHandValue = 1 / rightHandValue;
                    break;
                case "/":
                    if (swapped) {
                        answer = 1 / answer;
                    }
                    operator = "*";
                    break;
            }
            return solveForX(leftHand, eval(answer + "\n            " + operator + "\n            " + rightHandValue + "\n            "), x);
        }
    }
}
function shoutAnswer(monkeyName) {
    if (MonkeyMap.monkeyMap.get(monkeyName).length === 1) {
        return parseInt(MonkeyMap.monkeyMap.get(monkeyName)[0]);
    }
    var operation = MonkeyMap.monkeyMap.get(monkeyName);
    return eval("shoutAnswer(\"" + operation[0] + "\")\n    " + operation[1] + "\n    shoutAnswer(\"" + operation[2] + "\")");
}
function generateEquation(monkeyName) {
    if (monkeyName === "humn") {
        return "humn";
    }
    if (MonkeyMap.monkeyMap.get(monkeyName).length === 1) {
        return parseInt(MonkeyMap.monkeyMap.get(monkeyName)[0]);
    }
    var operation = MonkeyMap.monkeyMap.get(monkeyName);
    var answer = "( " + generateEquation(operation[0]) + " " + operation[1] + " " + generateEquation(operation[2]) + " )";
    if (answer.split(" ").includes("humn")) {
        return answer;
    }
    return eval(answer);
}
function parseLines(inputString) {
    var e_1, _a;
    var lines = inputString.split(/\r?\n/);
    var monkeyMap = new Map();
    try {
        for (var lines_1 = __values(lines), lines_1_1 = lines_1.next(); !lines_1_1.done; lines_1_1 = lines_1.next()) {
            var line = lines_1_1.value;
            var name_1 = line.split(": ")[0];
            var equation = line.split(": ")[1].split(" ");
            monkeyMap.set(name_1, equation);
        }
    }
    catch (e_1_1) { e_1 = { error: e_1_1 }; }
    finally {
        try {
            if (lines_1_1 && !lines_1_1.done && (_a = lines_1.return)) _a.call(lines_1);
        }
        finally { if (e_1) throw e_1.error; }
    }
    return monkeyMap;
}
var MonkeyMap = (function () {
    function MonkeyMap() {
    }
    return MonkeyMap;
}());
exports.MonkeyMap = MonkeyMap;
//# sourceMappingURL=day21.js.map