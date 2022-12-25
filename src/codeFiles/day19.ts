export function solveA(lines: string) {
    let blueprintBook = parseLines(lines);
    let totalQuality: number = 0;

    let blueprintCount = 1;
    for (let blueprint of blueprintBook) {
        GlobalMax.value = 0;
        getMaxQuality([1, 0, 0, 0, 0], [0, 0, 0, 0], 1, 24, blueprint);
        totalQuality += blueprintCount * GlobalMax.value;
        blueprintCount++;
    }
    return totalQuality
}

export function solveB(lines: string) {
    let blueprintBook = parseLines(lines);
    let totalQuality: number = 1;

    let blueprintCount = 1;
    for (let blueprint of blueprintBook) {
        GlobalMax.value = 0;
        getMaxQuality([1, 0, 0, 0, 0], [0, 0, 0, 0], 1, 32, blueprint);
        totalQuality *= GlobalMax.value;
        blueprintCount++;
        if (blueprintCount > 3){
            break;
        }
    }
    return totalQuality
}


function getMaxQuality(robots: number[], resources: number[], round: number, maxRounds: number, blueprint: number[][]) {

    if (GlobalMax.value < resources[3]) {   // anti-Tim
        GlobalMax.value = resources[3];
    }
    if (round > maxRounds) {
        return;
    }

    let nextActions = getPossibleActions(robots, blueprint);

    let roundsLeft = maxRounds + 1 - round;
    const maximalPossible = roundsLeft * (roundsLeft + 1) / 2 * (robots[3] + 1) + resources[3];
    if (maximalPossible <= GlobalMax.value) {
        return;
    }
    /*if (robots[3] !== 0){
        console.log(robots, resources, round)
    }*/
    for (let action of nextActions) {

        const newResources = Array.from(resources);
        let newRound = round;
        const newRobots = Array.from(robots);

        while (newRound < maxRounds) {

            if (canAfford(newResources, blueprint[action])){
                newRobots[action]++;
                break;
            }
            newResources.forEach((r, idx) => newResources[idx] = newResources[idx] + robots[idx]);
            newRound++;
        }

        newResources.forEach((r, idx) => newResources[idx] = newResources[idx] + robots[idx] - blueprint[action][idx]);
        getMaxQuality(newRobots, newResources, newRound + 1, maxRounds, blueprint);
    }
    return;
}


function canAfford(resources: number[], robotCost: number[]): boolean{

    for (let i = 0; i < 4; i++){
        if (resources[i] < robotCost[i]){
            return false;
        }
    }
    return true;
}


function getPossibleActions(robots: number[], blueprint: number[][]): number[] {
    const nextActions: number[] = [];
    if (robots[2] !== 0) {
        nextActions.push(3);
    }
    if (robots[1] !== 0) {
        nextActions.push(2);
    }
    if (robots[1] < blueprint[2][1]){
        nextActions.push(1);
    }
    if (robots[0] < Math.max(blueprint[0][0], blueprint[1][0], blueprint[2][0], blueprint[3][0])){
        nextActions.push(0);
    }


    return nextActions;
}


function parseLines(inputString: string) {
    const lines = inputString.split(/\r?\n/);
    const blueprintBook: number[][][] = [];
    for (let line of lines) {
        const blueprint: number[][] = [];
        for (let robotMap of line.split(": ")[1].split('. ')) {

            const costs = robotMap.match(/\d+/g).map(a => parseInt(a));
            const robot = robotMap.match(/(ore|clay|obsidian|geode)/)[0];
            let costTable: number[];
            switch (robot) {
                case "ore":
                    costTable = [costs[0], 0, 0, 0];
                    break;
                case "clay":
                    costTable = [costs[0], 0, 0, 0];
                    break;
                case "obsidian":
                    costTable = [costs[0], costs[1], 0, 0];
                    break;
                case "geode":
                    costTable = [costs[0], 0, costs[1], 0];
                    break;
            }

            blueprint.push(costTable);
        }
        blueprint.push([0, 0, 0, 0]);   // do-nothing cost table (doing nothing costs nothing)
        blueprintBook.push(blueprint);
    }
    return blueprintBook;
}

export class GlobalMax {
    public static value: number;
}