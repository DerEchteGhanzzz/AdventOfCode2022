export function solveA(lines: string) {
    let network = parseLines(lines);
    //console.log(network);
    let answer: number = 0;
    const paths: Set<string[]> = new Set();
    const currentPosition = "AA";
    const currentPath = [];
    solveTSP(currentPosition, currentPath, paths, network, 30);

    for (let path of paths) {
        let pressure = 0;
        let timeLeft = 30;
        let previousValve = "AA";
        for (let valve of path) {
            timeLeft -= network.get(previousValve).distanceMatrix.get(valve) + 1;
            pressure += network.get(valve).flowRate * timeLeft;
            previousValve = valve;
        }

        if (pressure > answer) {
            //console.log(path)
            answer = pressure;
        }

    }

    return answer
}


export function solveB(lines: string) {
    let network: Map<string, Valve> = parseLines(lines);
    const unopenedValves = new Set<Valve>();
    network.forEach((value, key) => {
        if (value.flowRate > 0) {
            unopenedValves.add(value)
        }
    })
    
    return solveMTSP(["AA", "AA"], [26, 26], 0, unopenedValves, network, 0);
}


function solveMTSP(currentPositions: [string, string], timesLeft: [number, number], flow: number, unopenedValves: Set<Valve>, network, depth: number): number {

    if (unopenedValves.size === 0) {
        return flow;
    }

    const flowSet: Set<number> = new Set<number>();
    let combination: number;
    let haveHad: Set<string>;

    if (depth === 0) {
        combination = combinations(unopenedValves.size, 2);
        haveHad = new Set<string>();
        console.log(combination)
    }

    for (let valveOne of unopenedValves) {

        for (let valveTwo of unopenedValves) {

            if (valveTwo === valveOne) {
                continue;
            }

            if (depth === 0) {
                if (haveHad.has(valveOne.letter + "," + valveTwo.letter)) {
                    continue;
                }
                console.log(`Starting at: ${valveOne.letter} and ${valveTwo.letter}\nNow at ${haveHad.size / combination * 50}%`)
                haveHad.add(valveOne.letter + "," + valveTwo.letter);
                haveHad.add(valveTwo.letter + "," + valveOne.letter);
            }

            let currentFlow = flow;

            let myValve = network.get(currentPositions[0]);
            const myDistance = network.get(currentPositions[0]).distanceMatrix.get(valveOne.letter);
            let myTimeLeft = timesLeft[0] - myDistance - 1 > 0 ? timesLeft[0] - myDistance - 1 : 0;


            const elephantDistance = network.get(currentPositions[1]).distanceMatrix.get(valveTwo.letter);
            let elephantTimeLeft = timesLeft[1] - elephantDistance - 1 > 0 ? timesLeft[1] - elephantDistance - 1 : 0;
            let elephantValve = network.get(currentPositions[1]);

            if (myTimeLeft > 0) {
                myValve = valveOne;
            }

            if (elephantTimeLeft > 0) {

                elephantValve = valveTwo;
            }
            if (myTimeLeft <= 0 && elephantTimeLeft <= 0) {
                flowSet.add(currentFlow);
                continue;
            }

            //console.log(myValve.letter, elephantValve.letter)
            const copiedUnopenedValves: Set<Valve> = new Set<Valve>(unopenedValves);

            copiedUnopenedValves.delete(myValve);
            copiedUnopenedValves.delete(elephantValve);

            currentFlow += myTimeLeft * valveOne.flowRate + elephantTimeLeft * valveTwo.flowRate;

            flowSet.add(solveMTSP([myValve.letter, elephantValve.letter],  [myTimeLeft, elephantTimeLeft], currentFlow, copiedUnopenedValves, network, depth + 1));

        }
    }

    return Math.max(...flowSet);

}


function solveTSP(currentPosition: string, currentPath: string[], paths: Set<string[]>, network: Map<string, Valve>, timeLeft: number) {

    let count = 0;

    for (let [letter, distance] of network.get(currentPosition).distanceMatrix) {

        if (currentPath.includes(letter) || network.get(letter).flowRate === 0) {
            count++;

            if (count === network.get(letter).distanceMatrix.size) {
                paths.add(currentPath);
                return;
            }

            continue;
        }

        if (timeLeft - distance - 1 < 0) {
            paths.add(currentPath);
            continue;
        }

        const copyPath = [...currentPath];

        copyPath.push(letter);
        solveTSP(letter, copyPath, paths, network, timeLeft - distance - 1);
    }

}


function parseLines(inputString: string): Map<string, Valve> {
    const lines = inputString.split(/\r?\n/);
    const network = new Map<string, Valve>();
    for (let line of lines) {

        const letter = line.match(/([A-Z]{2})/g)[0];
        const neighbours = line.match(/([A-Z]{2})/g);
        const flowRate = parseInt(line.match(/([0-9]+)/)[0]);

        const valve = new Valve(letter, flowRate, neighbours);
        network.set(letter, valve);
    }

    for (let [letter, valve] of network) {

        valve.generateMatrix(network);

    }

    return network;
}

class Valve {

    public distanceMatrix: Map<string, number>;

    constructor(public letter: string, public flowRate, public neighbours: string[]) {
    }

    public generateMatrix(network: Map<string, Valve>) {

        this.distanceMatrix = new Map<string, number>();
        this.distanceMatrix.set(this.letter, 0);
        goThroughNetwork(this.neighbours, network, this.distanceMatrix, 0);
        Array.from(this.distanceMatrix).filter(
            (value) => {
                if (network.get(value[0]).flowRate === 0) {
                    this.distanceMatrix.delete(value[0]);
                }
            });
    }

}

function goThroughNetwork(neighbours: string[], network: Map<string, Valve>, distanceMatrix: Map<string, number>, currentDistance: number) {

    currentDistance++;
    for (let neighbour of neighbours) {

        if (distanceMatrix.get(neighbour) === undefined || distanceMatrix.get(neighbour) > currentDistance) {

            distanceMatrix.set(neighbour, currentDistance);
            goThroughNetwork(network.get(neighbour).neighbours, network, distanceMatrix, currentDistance);
        }
    }

}

function product_Range(a, b) {
    var prd = a, i = a;

    while (i++ < b) {
        prd *= i;
    }
    return prd;
}

function combinations(n, r) {
    if (n == r || r == 0) {
        return 1;
    } else {
        r = (r < n - r) ? n - r : r;
        return product_Range(r + 1, n) / product_Range(1, n - r);
    }
}