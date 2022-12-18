export function solveA(lines: string) {
    let lavaBlocks: Set<string> = parseLines(lines);
    let answer = 0;
    for (let entry of lavaBlocks) {
        answer += getAirNeighs(entry, lavaBlocks).length;
    }

    return answer
}

export function solveB(lines: string) {
    let lavaBlocks: Set<string> = parseLines(lines);
    let exposedSides = 0;

    const totalAirSet = getAirSet(lavaBlocks);
    const trappedAirSet = new Set<string>();
    const freeAirSet = new Set<string>();

    for (let airBlock of totalAirSet){
        // lelijke hardcode
        AstarToOrigin(airBlock,18, lavaBlocks, freeAirSet, trappedAirSet);
    }

    trappedAirSet.forEach((k) => lavaBlocks.add(k));

    for (let entry of lavaBlocks) {
        exposedSides += getAirNeighs(entry, lavaBlocks).length;
    }

    return exposedSides;
}

function AstarToOrigin(start, finish, lavaBlocks: Set<string>, freeAir: Set<string>, trappedAir: Set<string>): boolean {

    if (freeAir.has(start)) {
        return true;
    } else if (trappedAir.has(start)) {
        return false;
    }

    const distanceDict = new Map<string, number>();
    distanceDict.set(start, 0);

    let queue: Map<string, number> = new Map();
    queue.set(start, 0);

    let visited = new Set<string>(lavaBlocks);

    while (queue.size > 0) {

        queue = new Map([...queue].sort((a, b) => (a[1] > b[1] ? 1 : -1))); // sort queue on distance
        let currentNode: string = [...queue][0][0]; // get node with the shortest path

        if (manhattan(currentNode, start) > finish) {
            visited.forEach((v) => freeAir.add(v));
            return true;
        }

        queue.delete(currentNode);
        visited.add(currentNode);

        for (let neigh of getAirNeighs(currentNode, lavaBlocks)) {

            if (visited.has(neigh)) {
                continue;
            }

            distanceDict.set(neigh, 1 + distanceDict.get(currentNode))
            queue.set(neigh, distanceDict.get(neigh) - manhattan(start, neigh));

        }
    }

    visited.forEach((v) => trappedAir.add(v));
    return false;

}

function manhattan(start: string, neigh: string) {

    const startCoords = JSON.parse(start);
    const neighCoords = JSON.parse(neigh);

    return Math.abs(startCoords[0] - neighCoords[0]) + Math.abs(startCoords[1] - neighCoords[1]) + Math.abs(startCoords[2] - neighCoords[2])

}
function getAirNeighs(coord: string, lavaBlocks: Set<string>): string[] {

    const coordArr = JSON.parse(coord);
    let adjacentAir = [];
    let count = 0
    //console.log(coord)
    for (let k = -1; k < 2; k++) {

        for (let j = -1; j < 2; j++) {

            for (let i = -1; i < 2; i++) {


                if ((i === j && j === k) || !(Math.abs(i) + Math.abs(j) + Math.abs(k) === 1)) {
                    count++;
                    continue;
                }
                //console.log(coordArr[0]+i,coordArr[1]+j,coordArr[2]+k, i, j, k)
                if (!lavaBlocks.has(JSON.stringify([coordArr[0] + i, coordArr[1] + j, coordArr[2] + k]))) {
                    adjacentAir.push(JSON.stringify([coordArr[0] + i, coordArr[1] + j, coordArr[2] + k]));
                }
            }
        }
    }
    return adjacentAir;
}


function getAirSet(lavaBlocks: Set<string>): Set<string> {

    const totalAirSet = new Set<string>();
    for (let lavaBlock of lavaBlocks) {
        const coordArr = JSON.parse(lavaBlock);
        //console.log(coord)
        for (let k = -1; k < 2; k++) {

            for (let j = -1; j < 2; j++) {

                for (let i = -1; i < 2; i++) {


                    if (i === j && j === k && i === 0) {
                        continue;
                    }
                    //console.log(coordArr[0]+i,coordArr[1]+j,coordArr[2]+k, i, j, k)
                    const neighbour = JSON.stringify([coordArr[0] + i, coordArr[1] + j, coordArr[2] + k]);

                    if (!lavaBlocks.has(neighbour)) {
                        totalAirSet.add(neighbour);
                    }
                }
            }
        }
    }
    return totalAirSet;
}

function parseLines(inputString: string): Set<string> {
    const lines = inputString.split(/\r?\n/);
    const input = new Set<string>()
    for (let line of lines) {
        input.add("[" + line + "]");
    }

    return input;
}