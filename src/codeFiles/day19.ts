import {match} from "assert";
import {isNull} from "util";

export function solveA(lines: string) {
    let blueprintBook = parseLines(lines);
    let totalQuality: number

    let blueprintCount = 1;
    for (let blueprint of blueprintBook) {
        totalQuality = blueprintCount * getMaxQuality([1, 0, 0, 0], [0, 0, 0, 0], 0, blueprint);
        console.log(blueprintCount, "done");
        blueprintCount++;
    }
    return totalQuality
}

export function solveB(lines: string) {
    let input = parseLines(lines);
    let answer: string

    for (let entry of input) {

    }
    return answer
}


function getMaxQuality(robots: number[], resources: number[], round, blueprint: number[][]): number {

    const decisions = 4;
    const qualityArray = new Set<number>();
    for (let decision = decisions - 1; decision >= 0; decision--) {
        //console.log()
        // turn begin: build a new robot
        let timeDelta = 0;
        for (let i = 0; i < decisions; i++) {

            let robotWorkTime = Math.ceil(blueprint[decision][i] / robots[i]);
            let resourceTimeSpare = Math.floor((robotWorkTime * robots[i] - blueprint[decision][i]) / resources[i])
            resourceTimeSpare = Number.isInteger(resourceTimeSpare) ? resourceTimeSpare : 0;
            const calcTime = Math.max(robotWorkTime - resourceTimeSpare + 1, 1);
            //console.log(calcTime)
            if (calcTime > timeDelta && !isNaN(calcTime)) {
                timeDelta = calcTime;
            }
        }
        if (timeDelta === 0) {
            timeDelta = 1;
        }
        if (timeDelta === Infinity) {
            qualityArray.add(0);
            continue;
        }

        const newRound = round + timeDelta;

        const newResources: number[] = new Array(...resources).map(function (oldResource, idx) {
            return oldResource + robots[idx] * timeDelta - blueprint[decision][idx];
        });

        if (newRound >= 24) {
            //console.log("score: ", resources[3] + (24 - round) * robots[3])
            qualityArray.add(newResources[3] + (23 - round) * robots[3])
            continue;
        }

        // turn end: new robot.
        const newRobots = [robots[0], robots[1], robots[2], robots[3]];
        newRobots[decision]++;
        //if (newResources[1] < 0){
            console.log()
            console.log(resources, robots);
            console.log(newResources, newRobots);
            console.log(timeDelta, blueprint[decision])
        //}
        const quality = getMaxQuality(newRobots, newResources, newRound, blueprint);
        qualityArray.add(quality);
    }
    return Math.max(...qualityArray);
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
        blueprintBook.push(blueprint);
    }
    return blueprintBook;
}