export function solveA(lines: string) {
    let elfMap: Map<string, Elf> = parseLines(lines);
    for (let round = 0; round < 10; round++) {

        for (let [coord, elf] of elfMap) {
            elf.proposeDirection(elfMap, round);
        }
        const newElfMap = new Map<string, Elf>(elfMap);
        for (let [coord, elf] of elfMap) {
            elf.move(newElfMap);
        }
        elfMap = newElfMap;
    }
    return getSmallestRectangle(elfMap);
}

export function solveB(lines: string) {
    let elfMap: Map<string, Elf> = parseLines(lines);
    let round = 0;
    while (true) {

        for (let [coord, elf] of elfMap) {
            elf.proposeDirection(elfMap, round);
        }

        let notMoving = 0;
        const newElfMap = new Map<string, Elf>(elfMap);
        for (let [coord, elf] of elfMap) {
            if (!elf.move(newElfMap)) {
                notMoving++;
            }
        }
        elfMap = newElfMap;
        if (notMoving === elfMap.size) {
            return round + 1;
        }
        round++;
    }
}

function parseLines(inputString: string): Map<string, Elf> {
    const lines = inputString.split(/\r?\n/);
    const elfMap = new Map<string, Elf>();
    for (let j = 0; j < lines.length; j++) {
        for (let i = 0; i < lines[0].length; i++) {

            if (lines[j].charAt(i) === ".") {
                continue;
            }
            const dj = lines.length - 1 - j;
            //console.log(i, dj, lines[j].charAt(i))
            elfMap.set(i + "," + dj, new Elf(i, dj));
        }
    }

    return elfMap;
}

function getSmallestRectangle(elfMap: Map<string, Elf>): number {
    let maxX = Number.MIN_VALUE;
    let maxY = Number.MIN_VALUE;
    let minX = Number.MAX_VALUE;
    let minY = Number.MAX_VALUE;
    for (let [coord, elf] of elfMap) {
        if (elf.x < minX) {
            minX = elf.x;
        }
        if (elf.x > maxX) {
            maxX = elf.x;
        }
        if (elf.y < minY) {
            minY = elf.y;
        }
        if (elf.y > maxY) {
            maxY = elf.y;
        }
    }
    return (maxX - minX + 1) * (maxY - minY + 1) - elfMap.size;
}

class Elf {

    private proposedX: number
    private proposedY: number

    constructor(public x: number, public y: number) {
    }

    public move(elfMap: Map<string, Elf>) {

        for (let j = -1; j < 2; j++) {
            for (let i = -1; i < 2; i++) {
                const elf = elfMap.get((this.proposedX+i)+","+(this.proposedY+j));
                if (elf === undefined || elf === this) {
                    continue;
                }
                if (elf.proposedX === this.proposedX && elf.proposedY === this.proposedY) {
                    return false;
                }
            }
        }
        if (this.x === this.proposedX && this.y === this.proposedY) {
            return false;
        }
        elfMap.delete(this.x+","+this.y);
        this.x = this.proposedX;
        this.y = this.proposedY;
        elfMap.set(this.x+","+this.y, this);
        return true;
    }

    public proposeDirection(elfMap: Map<string, Elf>, round: number) {
        this.proposedX = this.x;
        this.proposedY = this.y;

        const directionList = [[true, 0, 1], [true, 0, -1], [true, -1, 0], [true, 1, 0]];

        for (let i = -1; i < 2; i++) {

            if (elfMap.get((this.x+i) + ","+(this.y+1)) !== undefined) {
                directionList[0][0] = false;
            }
            if (elfMap.get((this.x+i) + ","+(this.y-1)) !== undefined) {
                directionList[1][0] = false;
            }
            if (elfMap.get((this.x-1)+"," + (this.y+i)) !== undefined) {
                directionList[2][0] = false;
            }
            if (elfMap.get((this.x+1)+"," + (this.y+i)) !== undefined) {
                directionList[3][0] = false;
            }
        }

        if (directionList[0][0] && directionList[1][0] && directionList[2][0] && directionList[3][0]) {
            return;
        }

        for (let i = round; i < round + 4; i++) {
            if (directionList[i % 4][0]) {
                this.proposedX += directionList[i % 4][1] as number;
                this.proposedY += directionList[i % 4][2] as number;
                break;
            }
        }
    }
}

function printSet(elfMap: Map<string, Elf>, width, height, minX, minY) {
    const coordStrings = [];
    elfMap.forEach(elf => coordStrings.push((elf.x - minX) + "," + (elf.y - minY)));
    console.log(elfMap)
    console.log(coordStrings)
    for (let j = 0; j < height; j++) {
        let line = "";
        for (let i = 0; i < width; i++) {

            const dj = height - 1 - j;
            if (coordStrings.includes(i + "," + dj)) {
                line = line + "#";
            } else {
                line = line + ".";
            }
        }
        console.log(line);
    }
}