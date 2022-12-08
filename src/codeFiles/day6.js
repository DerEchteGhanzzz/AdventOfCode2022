"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.solveB = exports.solveA = void 0;
function solveA(lines) {
    return getMessageID(lines[0], 4);
}
exports.solveA = solveA;
function solveB(lines) {
    return getMessageID(lines[0], 14);
}
exports.solveB = solveB;
function getMessageID(message, length) {
    var code = message.slice(0, length);
    for (var i = code.length; i < message.length; i++) {
        if (!hasDuplicates(code.slice(code.length - length))) {
            return code.length;
        }
    }
    return code.length;
}
function hasDuplicates(array) {
    return (new Set(array)).size !== array.length;
}
//# sourceMappingURL=day6.js.map