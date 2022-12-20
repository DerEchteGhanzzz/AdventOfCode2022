export function solveA(lines: string) {
    let network: Map<string, Valve> = parseLines(lines);
    const unopenedValves = new Set<string>();
    network.forEach((value, key) => {
        if (value.flowRate > 0) {
            unopenedValves.add(value.letter)
        }
    })
    return solveTSP("AA", 30, 0, unopenedValves, network, 0);
}


export function solveB(lines: string) {
    let network: Map<string, Valve> = parseLines(lines);
    const unopenedValves = new Array<string>();
    network.forEach((value, key) => {
        if (value.flowRate > 0) {
            unopenedValves.push(value.letter)
        }
    });
    const size = unopenedValves.length;
    const flowChart: number[] = [];
    const haveHad = new Set<string>();
    for (let i = Math.pow(2, size-1); i < Math.pow(2, size); i++ ) {

        let binaries = i.toString(2);
        const myUnopenedValves = new Set<string>();
        const elephantUnopenedValves = new Set<string>();

        for (let b = 0; b < size; b++){
            if (binaries.charAt(b) === "1"){
                myUnopenedValves.add(unopenedValves[b]);
            } else {
                elephantUnopenedValves.add(unopenedValves[b]);
            }
        }
        const myString = JSON.stringify([...myUnopenedValves]);
        const elephantString = JSON.stringify([...elephantUnopenedValves]);
        if (haveHad.has(myString + "," + elephantString)) {
            continue;
        }

        haveHad.add(myString + "," + elephantString);
        haveHad.add(elephantString + "," + myString);

        flowChart.push(
            solveTSP("AA", 26, 0, myUnopenedValves, network, 0) +
            solveTSP("AA", 26, 0, elephantUnopenedValves, network, 0)
        );

    }
    return Math.max(...flowChart);
}


function solveTSP(currentPosition: string, timeLeft: number, flow: number, unopenedValves: Set<string>, network, depth: number): number {

    if (unopenedValves.size === 0) {
        return flow;
    }
    const flowSet: Set<number> = new Set<number>();

    for (let letterOne of unopenedValves) {

            const myDistance = network.get(currentPosition).distanceMatrix.get(letterOne);
            let newTimeLeft = timeLeft - myDistance - 1 > 0 ? timeLeft - myDistance - 1 : 0;

            if (newTimeLeft <= 0) {
                flowSet.add(flow);
                continue;
            }
            //console.log(myValve.letter, elephantValve.letter)
            const copiedUnopenedValves = new Set<string>(unopenedValves);
            copiedUnopenedValves.delete(letterOne);

            const newFlow = flow + newTimeLeft * network.get(letterOne).flowRate;

            flowSet.add(solveTSP(letterOne, newTimeLeft, newFlow, copiedUnopenedValves, network, depth + 1));
    }

    return Math.max(...flowSet);

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