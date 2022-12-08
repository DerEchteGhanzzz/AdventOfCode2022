"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.solveB = exports.solveA = void 0;
function solveA(lines) {
    var answer = 0;
    var dirList = getStructure(parseLines(lines));
    var dirDict = new Map();
    for (var _i = 0, dirList_1 = dirList; _i < dirList_1.length; _i++) {
        var currentDir = dirList_1[_i];
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
    return answer;
}
exports.solveA = solveA;
function solveB(lines) {
    var answer = Number.MAX_SAFE_INTEGER;
    var dirList = getStructure(parseLines(lines));
    var usedSpace = dirList[0].getSize();
    var unusedSpace = 70000000 - usedSpace;
    for (var _i = 0, dirList_2 = dirList; _i < dirList_2.length; _i++) {
        var currentDir = dirList_2[_i];
        var size = currentDir.getSize();
        if (size < answer && size >= 30000000 - unusedSpace) {
            answer = size;
        }
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
                    for (var _i = 0, _a = currentDir.ls; _i < _a.length; _i++) {
                        var object = _a[_i];
                        if (entry[2] === object.name) {
                            currentDir = object;
                            depth++;
                        }
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
        for (var _i = 0, dir_1 = dir; _i < dir_1.length; _i++) {
            var object = dir_1[_i];
            if (object[0] === 'dir') {
                this.ls.push(new Directory(this, object[1]));
            }
            else {
                var f = new File(parseInt(object[0]), object[1]);
                this.ls.push(f);
            }
        }
        return;
    };
    Directory.prototype.getSize = function () {
        if (this.score === undefined) {
            var currentSize = 0;
            for (var _i = 0, _a = this.ls; _i < _a.length; _i++) {
                var object = _a[_i];
                currentSize += object.getSize();
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