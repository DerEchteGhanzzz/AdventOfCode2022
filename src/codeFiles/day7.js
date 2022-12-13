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
    var e_1, _a;
    var answer = 0;
    var dirList = getStructure(parseLines(lines));
    var dirDict = new Map();
    try {
        for (var dirList_1 = __values(dirList), dirList_1_1 = dirList_1.next(); !dirList_1_1.done; dirList_1_1 = dirList_1.next()) {
            var currentDir = dirList_1_1.value;
            var size = void 0;
            if (dirDict.get(currentDir) !== undefined) {
                size = dirDict.get(currentDir);
            }
            else {
                size = currentDir.getSize();
                dirDict.set(currentDir, size);
            }
            answer += size <= 100000 ? size : 0;
        }
    }
    catch (e_1_1) { e_1 = { error: e_1_1 }; }
    finally {
        try {
            if (dirList_1_1 && !dirList_1_1.done && (_a = dirList_1.return)) _a.call(dirList_1);
        }
        finally { if (e_1) throw e_1.error; }
    }
    return answer;
}
exports.solveA = solveA;
function solveB(lines) {
    var e_2, _a;
    var answer = Number.MAX_SAFE_INTEGER;
    var dirList = getStructure(parseLines(lines));
    var usedSpace = dirList[0].getSize();
    var unusedSpace = 70000000 - usedSpace;
    try {
        for (var dirList_2 = __values(dirList), dirList_2_1 = dirList_2.next(); !dirList_2_1.done; dirList_2_1 = dirList_2.next()) {
            var currentDir = dirList_2_1.value;
            var size = currentDir.getSize();
            if (size < answer && size >= 30000000 - unusedSpace) {
                answer = size;
            }
        }
    }
    catch (e_2_1) { e_2 = { error: e_2_1 }; }
    finally {
        try {
            if (dirList_2_1 && !dirList_2_1.done && (_a = dirList_2.return)) _a.call(dirList_2);
        }
        finally { if (e_2) throw e_2.error; }
    }
    return answer;
}
exports.solveB = solveB;
function parseLines(lines) {
    var splitLines = lines.split(/\r?\n/);
    var input = [];
    for (var i = 0; i < splitLines.length; i++) {
        input.push(splitLines[i].split(' '));
    }
    return input;
}
function getStructure(input) {
    var e_3, _a;
    var master = new Directory(undefined, '/');
    var currentDir = master;
    var dirList = [];
    dirList.push(master);
    var depth = 0;
    for (var i = 0; i < input.length; i++) {
        var entry = input[i];
        if (entry[0] !== '$') {
            continue;
        }
        switch (entry[1]) {
            case "cd":
                if (entry[2] === '/') {
                    currentDir = master;
                    depth = 0;
                }
                else if (entry[2] === '..') {
                    currentDir = currentDir.parent;
                    depth--;
                }
                else {
                    try {
                        for (var _b = (e_3 = void 0, __values(currentDir.ls)), _c = _b.next(); !_c.done; _c = _b.next()) {
                            var object = _c.value;
                            if (entry[2] === object.name) {
                                currentDir = object;
                                depth++;
                            }
                        }
                    }
                    catch (e_3_1) { e_3 = { error: e_3_1 }; }
                    finally {
                        try {
                            if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                        }
                        finally { if (e_3) throw e_3.error; }
                    }
                }
                break;
            case "ls":
                var subDir = [];
                var j = 1;
                while (i + j < input.length && input[i + j][0] !== '$') {
                    subDir.push(input[i + j]);
                    j++;
                }
                currentDir.makeSubfiles(subDir);
                dirList.push(currentDir);
        }
    }
    return dirList;
}
var Directory = (function () {
    function Directory(parent, name) {
        this.name = name;
        this.parent = parent;
        this.ls = [];
    }
    Directory.prototype.makeSubfiles = function (dir) {
        var e_4, _a;
        try {
            for (var dir_1 = __values(dir), dir_1_1 = dir_1.next(); !dir_1_1.done; dir_1_1 = dir_1.next()) {
                var object = dir_1_1.value;
                if (object[0] === 'dir') {
                    this.ls.push(new Directory(this, object[1]));
                }
                else {
                    var f = new File(parseInt(object[0]), object[1]);
                    this.ls.push(f);
                }
            }
        }
        catch (e_4_1) { e_4 = { error: e_4_1 }; }
        finally {
            try {
                if (dir_1_1 && !dir_1_1.done && (_a = dir_1.return)) _a.call(dir_1);
            }
            finally { if (e_4) throw e_4.error; }
        }
        return;
    };
    Directory.prototype.getSize = function () {
        var e_5, _a;
        if (this.score === undefined) {
            var currentSize = 0;
            try {
                for (var _b = __values(this.ls), _c = _b.next(); !_c.done; _c = _b.next()) {
                    var object = _c.value;
                    currentSize += object.getSize();
                }
            }
            catch (e_5_1) { e_5 = { error: e_5_1 }; }
            finally {
                try {
                    if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                }
                finally { if (e_5) throw e_5.error; }
            }
            this.score = currentSize;
        }
        return this.score;
    };
    return Directory;
}());
var File = (function () {
    function File(size, name) {
        this.size = size;
        this.name = name;
    }
    File.prototype.getSize = function () {
        return this.size;
    };
    return File;
}());
//# sourceMappingURL=day7.js.map