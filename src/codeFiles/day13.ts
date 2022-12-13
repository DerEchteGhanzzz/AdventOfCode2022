export function solveA(lines: string){
    let signal = parseLines(lines);
    let answer: number = 0;

    for (let i = 0; i < signal.length; i+=2){
        //console.log(i / 2 + 1)
        const packageOne = signal[i];
        const packageTwo = signal[i+1];

        if (comparePackages(packageOne, packageTwo) >= 0){

            answer += i / 2 + 1;
        }
    }

    return answer
}

export function solveB(lines: string){
    let input = parseLines(lines);
    let answer: string

    const distressOne = [[2]];
    const distressTwo = [[6]];

    input.push(distressOne)
    input.push(distressTwo)

    input = input.sort((a, b) => {
        if (comparePackages(a, b) < 0) {
            return 1
        } else {
            return -1
        }
    });

    return (input.indexOf(distressOne) + 1) * (input.indexOf(distressTwo) + 1)
}

function parseLines(inputString: string) {
    const lines = inputString.split(/\r?\n/);
    const input = []
    for (let line of lines){
        if (line.length === 0) {
            continue;
        }
        input.push(JSON.parse(line))
    }
    return input;
}


function  comparePackages(packageLeft, packageRight) {

    //console.log("comparing ", packageLeft, " with ", packageRight)

    let sum = 0;
    let i = 0;

    packageLeft = Number.isInteger(packageLeft) ? [packageLeft] : packageLeft;
    packageRight = Number.isInteger(packageRight) ? [packageRight] : packageRight;

    while (sum == 0) {

        if (i == packageLeft.length && i < packageRight.length) {
            return 1;
        } else if (i == packageLeft.length && i == packageRight.length) {
            return 0;
        } else if (i < packageLeft.length && i == packageRight.length) {
            return -1;
        }

        if ( Number.isInteger(packageLeft[i]) && Number.isInteger(packageRight[i]) ) {

            if (packageLeft[i] < packageRight[i]) {
                return 1;
            } else if (packageLeft[i] > packageRight[i]) {
                return -1;
            }

        } else {

            sum = comparePackages(packageLeft[i], packageRight[i]);

        }
        i++;

    }
    return sum;
}