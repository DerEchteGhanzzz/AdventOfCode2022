export function solveA(lines: string){

    let answer: number = 0;

    const dirList: Directory[] = getStructure(parseLines(lines))
    const dirDict = new Map();

    for (const currentDir of dirList){
        let size: number;
        if (dirDict.get(currentDir) !== undefined){
            size = dirDict.get(currentDir)
        } else {
            size = currentDir.getSize();
            dirDict.set(currentDir, size);
        }
        answer += size <= 100000 ? size : 0;
    }

    return answer;
}

export function solveB(lines: string){

    let answer: number = Number.MAX_SAFE_INTEGER;

    const dirList: Directory[] = getStructure(parseLines(lines))
    const usedSpace = dirList[0].getSize();
    const unusedSpace = 70000000 - usedSpace;
    for (const currentDir of dirList){
        let size: number = currentDir.getSize();
        if (size < answer && size >= 30000000 - unusedSpace){
            answer = size;
        }
    }

    return answer;
}

function parseLines(lines: string): string[][]{
    let splitLines = lines.split(/\r?\n/);
    let input: string[][] = [];

    for (let i = 0; i < splitLines.length; i++){
        input.push(splitLines[i].split(' '))
    }
    return input;
}

function getStructure(input: string[][]): Directory[]{
    const master: Directory = new Directory(undefined, '/')
    let currentDir: Directory = master;
    const dirList: Directory[] = []
    dirList.push(master)
    let depth = 0;

    for (let i = 0; i < input.length; i++){

        let entry = input[i];

        if (entry[0] !== '$') {
            continue;
        }
        switch (entry[1]){
            case "cd":
                if (entry[2] === '/'){
                    currentDir = master;
                    depth = 0;
                } else if (entry[2] === '..'){
                    currentDir = currentDir.parent;
                    depth--;
                } else {
                    for (let object of currentDir.ls){
                        if (entry[2] === object.name){
                            currentDir = <Directory> object;
                            depth++;
                        }
                    }
                }
                break;
            case "ls":
                const subDir: string[][] = [];
                let j = 1;
                while (i+j < input.length && input[i+j][0] !== '$'){
                    subDir.push(input[i+j])
                    j++;
                }
                currentDir.makeSubfiles(subDir);
                dirList.push(currentDir)
        }
    }
    return dirList;
}

class Directory{
    public parent: Directory;
    public ls: Array<Directory | File>;
    public name: string;
    private score: number;
    constructor(parent, name){
        this.name = name
        this.parent = parent
        this.ls = []
    }

    public makeSubfiles(dir: string[][]){
        for (let object of dir){
            if (object[0] === 'dir'){
                this.ls.push(new Directory(this, object[1]))
            } else {
                const f: File = new File(parseInt(object[0]), object[1]);
                this.ls.push(f)
            }
        }
        return;
    }

    public getSize(): number{

        if (this.score === undefined){
            let currentSize = 0;
            for (let object of this.ls){
                currentSize += object.getSize();
            }
            this.score = currentSize;
        }

        return this.score;
    }
}

class File{
    public size: number
    public name: string
    constructor(size: number, name: string) {
        this.size = size;
        this.name = name;
    }
    public getSize(): number{
        return this.size;
    }
}