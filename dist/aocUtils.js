"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.modulo = exports.readInput = void 0;
var fs_1 = require("fs");
var path_1 = require("path");
module.exports;
function readInput(day) {
    var contents = (0, fs_1.readFileSync)((0, path_1.join)(__dirname, "/inputFiles/day".concat(day, ".txt")), 'utf-8');
    return contents.split(/\r?\n/);
}
exports.readInput = readInput;
function modulo(a, n) {
    return a - Math.abs(n) * Math.floor(a / Math.abs(n));
}
exports.modulo = modulo;
//# sourceMappingURL=aocUtils.js.map