export function solveA(lines: string){
    const elves = parseLines(lines);
    const mappedElves = elves.map(elf => elf.reduce((total, lunch) => total + lunch, 0)).sort().reverse();
    return mappedElves[0];
}

export function solveB(lines: string){
    const elves = parseLines(lines);
    const mappedElves = elves.map(elf => elf.reduce((total, lunch) => total + lunch, 0)).sort().reverse();
    return mappedElves[0] + mappedElves[1] + mappedElves[2];
}

function parseLines(inputString: string): number[][]{
    const lines = inputString.split(/\r?\n\r?\n/);
    const elves = []
    for (let elfString of lines){
        const elf = elfString.split(/\r?\n/).map(str => parseInt(str));
        elves.push(elf);
    }
    return elves;
}