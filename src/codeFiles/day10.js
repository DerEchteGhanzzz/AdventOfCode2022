"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.solveB = exports.solveA = void 0;
function solveA(lines) {
    var myMotorola = new WalkieTalkie(parseLines(lines));
    return myMotorola.signalStrength;
}
exports.solveA = solveA;
function solveB(lines) {
    var myMotorola = new WalkieTalkie(parseLines(lines));
    return myMotorola.RenderScreen();
}
exports.solveB = solveB;
function parseLines(inputString) {
    var lines = inputString.split(/\r?\n/);
    var inputProgram = [];
    for (var _i = 0, lines_1 = lines; _i < lines_1.length; _i++) {
        var line = lines_1[_i];
        inputProgram.push([line.split(' ')[0], parseInt(line.split(' ')[1])]);
    }
    return inputProgram;
}
var WalkieTalkie = (function () {
    function WalkieTalkie(program) {
        this.program = [];
        this.program = program;
        this.xValue = 1;
        this.clock = 1;
        this.signalStrength = 0;
        this.screen = "";
        this.runProgram();
    }
    WalkieTalkie.prototype.RenderScreen = function () {
        return this.screen;
    };
    WalkieTalkie.prototype.runProgram = function () {
        var i = 0;
        var multiplier = 0;
        while (i < this.program.length) {
            var _a = this.program[i], operation = _a[0], value = _a[1];
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
            switch (operation) {
                case "addx":
                    this.xValue += multiplier * value;
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
    return WalkieTalkie;
}());
//# sourceMappingURL=day10.js.map