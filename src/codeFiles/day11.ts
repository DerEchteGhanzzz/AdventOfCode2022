export function solveA(lines: string) {
    let monkeys: Monkey[] = parseLines(lines, true);
    for (let i = 0; i < 20; i++) {
        for (let monkey of monkeys) {
            monkey.act();
        }
    }
    return shenanigans(monkeys);
}

export function solveB(lines: string) {
    let monkeys: Monkey[] = parseLines(lines, false);

    for (let i = 0; i < 10000; i++) {
        for (let monkey of monkeys) {
            monkey.act();
        }
    }
    return shenanigans(monkeys);
}

function parseLines(inputString: string, starOne: boolean): Monkey[] {
    const lines = inputString.split(/\r?\n/);
    const monkeyList: Monkey[] = []
    let totalDivisor: number = 1;
    for (let i = 0; i < lines.length; i++) {

        const line = lines[i];
        if (line.split(' ')[0] === "Monkey") {
            const items: number[] = lines[i + 1].split(": ")[1].split(", ").map(item => parseInt(item))

            let [old, inspectionOperator, inspectionValue] = lines[i + 2].split(": ")[1].split(" = ")[1].split(" ");
            let operation;
            if (starOne){
                operation = eval(`(old) => Math.floor(old ${inspectionOperator} ${inspectionValue} / 3)`);
            } else {
                operation = eval(`(old) => old ${inspectionOperator} ${inspectionValue}`);
            }
            const divisor = parseInt(lines[i + 3].split(" divisible by ")[1]);
            const trueMonkey = parseInt(lines[i + 4].split("throw to monkey ")[1]);
            const falseMonkey = parseInt(lines[i + 5].split("throw to monkey ")[1]);

            totalDivisor *= divisor;

            monkeyList.push(new Monkey(items, operation, divisor, trueMonkey, falseMonkey, monkeyList))
        }
    }

    for (let monkey of monkeyList){
        monkey.totalDivisor = totalDivisor;
    }

    return monkeyList;
}

class Monkey {

    public startingItems: number[];
    private readonly operation;
    public testDivisor: number;
    private readonly trueMonkey: number;
    private readonly falseMonkey: number;
    public monkeyLevel: number = 0;
    public readonly monkeyList: Monkey[];
    public totalDivisor: number;

    constructor(startingItems: number[], operation, testDivisor: number, trueMonkey: number, falseMonkey: number, monkeyList: Monkey[]) {
        this.startingItems = startingItems;
        this.operation = operation;
        this.testDivisor = testDivisor;
        this.trueMonkey = trueMonkey;
        this.falseMonkey = falseMonkey;
        this.monkeyList = monkeyList;
    }

    public act() {

        for (let item of this.startingItems) {
            this.monkeyLevel += 1;
            item = this.operation(item) % this.totalDivisor;
            const nextMonkey = item % this.testDivisor === 0 ? this.trueMonkey : this.falseMonkey;
            this.monkeyList[nextMonkey].startingItems.push(item);
        }
        this.startingItems = [];
    }
}

function shenanigans(monkeys: Monkey[]) {

    const inspections: number[] = []
    for (let monkey of monkeys) {
        inspections.push(monkey.monkeyLevel)
    }
    inspections.sort(function (a, b) {
        if (a < b) return 1;
        if (a > b) return -1;
        return 0;
    });
    return inspections[0] * inspections[1];
}