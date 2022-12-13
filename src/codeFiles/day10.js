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
Object.defineProperty(exports, "__esModule", { value: true });
exports.solveB = exports.solveA = void 0;
function solveA(lines) {
    var mySony = new CRT(parseLines(lines));
    return mySony.signalStrength;
}
exports.solveA = solveA;
function solveB(lines) {
    var mySony = new CRT(parseLines(lines));
    return mySony.RenderScreen();
}
exports.solveB = solveB;
function parseLines(inputString) {
    var e_1, _a;
    var lines = inputString.split(/\r?\n/);
    var inputProgram = [];
    try {
        for (var lines_1 = __values(lines), lines_1_1 = lines_1.next(); !lines_1_1.done; lines_1_1 = lines_1.next()) {
            var line = lines_1_1.value;
            inputProgram.push({ operation: line.split(' ')[0], value: parseInt(line.split(' ')[1]) });
        }
    }
    catch (e_1_1) { e_1 = { error: e_1_1 }; }
    finally {
        try {
            if (lines_1_1 && !lines_1_1.done && (_a = lines_1.return)) _a.call(lines_1);
        }
        finally { if (e_1) throw e_1.error; }
    }
    return inputProgram;
}
var CRT = (function () {
    function CRT(program) {
        this.program = program;
        this.xValue = 1;
        this.clock = 1;
        this.signalStrength = 0;
        this.screen = "";
        this.runProgram();
    }
    CRT.prototype.RenderScreen = function () {
        return this.screen;
    };
    CRT.prototype.runProgram = function () {
        var i = 0;
        var multiplier = 0;
        while (i < this.program.length) {
            var instruction = this.program[i];
            if ((this.clock - 20) % 40 === 0) {
                this.signalStrength += this.clock * this.xValue;
            }
            if ((this.clock - 1) % 40 === 0) {
                this.screen = this.screen + "\n";
            }
            if (Math.abs((this.clock - 1) % 40 - this.xValue) <= 1) {
                this.screen = this.screen + "@@@";
            }
            else {
                this.screen = this.screen + "---";
            }
            switch (instruction.operation) {
                case "addx":
                    this.xValue += multiplier * instruction.value;
                    i += multiplier;
                    multiplier = multiplier === 0 ? 1 : 0;
                    break;
                case "noop":
                    i++;
                    break;
                default:
                    console.log("Syntax Error!");
                    break;
            }
            this.clock++;
        }
    };
    return CRT;
}());
//# sourceMappingURL=day10.js.map