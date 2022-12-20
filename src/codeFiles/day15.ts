export function solveA(lines: string) {

    let answer = 0;
    const yLevel = 2000000;

    const sensors = parseLines(lines, yLevel);

    const rangeSet = new Set<{ begin: number, end: number }>();
    for (let sensor of sensors) {

        sensor.determineYrange(yLevel);
        insertRange(sensor.range, rangeSet);

    }

    for (let range of rangeSet) {
        answer += range.end - range.begin + 1;
    }

    return answer - getYbeacons(sensors, yLevel);
}

export function solveB(lines: string) {
    const sensors = parseLines(lines, 0);

    for (let yLevel = 0; yLevel <= 4000000; yLevel++) {

        const rangeSet = new Set<{ begin: number, end: number }>();
        for (let sensor of sensors) {

            sensor.determineYrange(yLevel);
            insertRange(sensor.range, rangeSet);

        }

        let ranges: { begin: number, end: number }[] = [];

        if (rangeSet.size > 1) {

            for (let range of rangeSet) {
                ranges.push(range);
            }

            return (Math.max(ranges[0].begin, ranges[1].begin) - 1) * 4000000 + yLevel
        }
    }
}


function insertRange(newRange: { begin: number, end: number }, rangeSet: Set<{ begin: number, end: number }>) {

    if (newRange === undefined) {
        return;
    }

    let overlap = false;
    for (let range of rangeSet) {

        if (range.begin <= newRange.begin - 1 && newRange.begin - 1 <= range.end) {
            newRange.begin = range.begin;
            overlap = true;
        }
        if (range.begin <= newRange.end + 1 && newRange.end + 1 <= range.end) {
            newRange.end = range.end;
            overlap = true;
        }

        if (newRange.begin <= range.begin && range.end <= newRange.end) {
            overlap = true;
        }

        if (overlap) {
            rangeSet.delete(range);
            insertRange(newRange, rangeSet);
            return;
        }
    }
    rangeSet.add(newRange);
    return;

}


function parseLines(inputString: string, yLevel): Sensor[] {
    const lines = inputString.split(/\r?\n/);
    const sensors = []

    for (let line of lines) {
        const sensorString = line.split(': ')[0];
        const beaconString = line.split(': ')[1];

        const sensorX = parseInt(sensorString.split(', ')[0].split("=")[1]);
        const sensorY = parseInt(sensorString.split(', ')[1].split("=")[1]);

        const beaconX = parseInt(beaconString.split(', ')[0].split("=")[1]);
        const beaconY = parseInt(beaconString.split(', ')[1].split("=")[1]);

        sensors.push(new Sensor(sensorX, sensorY, beaconX, beaconY, yLevel));

    }

    return sensors;
}

class Sensor {

    public beaconDistance: number;
    public range: { begin: number, end: number }

    constructor(public x: number, public y: number, public beaconX: number, public beaconY: number, yLevel: number) {

        this.beaconDistance = manhattanDistance(x, y, beaconX, beaconY);

    }

    public determineYrange(yLevel: number) {

        let xBegin = -Math.abs(this.x - this.beaconX) - Math.abs(this.y - this.beaconY) + Math.abs(this.y - yLevel) + this.x;
        let xEnd = Math.abs(this.x - this.beaconX) + Math.abs(this.y - this.beaconY) - Math.abs(this.y - yLevel) + this.x;

        if (manhattanDistance(xBegin, yLevel, this.x, this.y) !== this.beaconDistance || manhattanDistance(xEnd, yLevel, this.x, this.y) !== this.beaconDistance) {
            this.range = undefined;
        } else {
            this.range = {begin: xBegin, end: xEnd};
        }

    }
}

function manhattanDistance(xa, ya, xb, yb): number {

    return Math.abs(xa - xb) + Math.abs(ya - yb);

}

function getYbeacons(sensors: Sensor[], yLevel: number) {

    let beaconCount = 0;
    for (let sensor of sensors) {

        if (sensor.beaconY === yLevel) {
            beaconCount++;
        }

    }
    return beaconCount;
}

function getBeacons(yLevel: number, beaconSet: Set<string>) {

    let beaconCount = 0;
    for (let beacon of beaconSet) {

        if (parseInt(beacon.split(',')[1]) === yLevel) {

            beaconCount++;

        }

    }
    return beaconCount;
}