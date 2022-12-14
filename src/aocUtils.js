"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.modulo = exports.readInput = void 0;
var fs_1 = require("fs");
var path_1 = require("path");
module.exports;
function readInput(day) {
    return fs_1.readFileSync(path_1.join(__dirname, "/inputFiles/day" + day + ".txt"), 'utf-8');
}
exports.readInput = readInput;
function modulo(a, n) {
    return a - Math.abs(n) * Math.floor(a / Math.abs(n));
}
exports.modulo = modulo;
//# sourceMappingURL=aocUtils.js.map