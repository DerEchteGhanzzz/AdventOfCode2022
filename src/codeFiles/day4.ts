export function solveA(lines: string) {
    const input = parseLines(lines);
    let answer: number = 0;
    for (let line of input) {
        let strElves = line.split(',');
        const elfOne: number[] = strElves[0].split('-').map(function (x) {
            return parseInt(x, 10);
        });
        const elfTwo: number[] = strElves[1].split('-').map(function (x) {
            return parseInt(x, 10);
        });

        const elfOneAmount = elfOne[1] - elfOne[0];
        const elfTwoAmount = elfTwo[1] - elfTwo[0];
        const smallest = elfOneAmount < elfTwoAmount ? elfOne : elfTwo;
        const biggest = elfOneAmount < elfTwoAmount ? elfTwo : elfOne;

        if (biggest[0] <= smallest[0] && smallest[1] <= biggest[1]) {
            answer++;
        }
    }

    return answer;
}

export function solveB(lines: string) {
    const input = parseLines(lines);
    let answer: number = 0;
    for (let line of input) {
        let strElves = line.split(',');
        const elfOne: number[] = strElves[0].split('-').map(function (x) {
            return parseInt(x, 10);
        });
        const elfTwo: number[] = strElves[1].split('-').map(function (x) {
            return parseInt(x, 10);
        });

        if (elfOne[0] <= elfTwo[1] && elfOne[0] >= elfTwo[0] ||
            elfTwo[0] <= elfOne[1] && elfTwo[0] >= elfOne[0] ||
            elfOne[1] <= elfTwo[1] && elfOne[1] >= elfTwo[0] ||
            elfTwo[1] <= elfOne[1] && elfTwo[1] >= elfOne[0]) {
            answer++;
        }
    }

    return answer;
}

function parseLines(inputString: string): string[] {
    return inputString.split(/\r?\n/);
}