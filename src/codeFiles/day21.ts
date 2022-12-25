export function solveA(lines: string) {
    let monkeyMap: Map<string, string[]> = parseLines(lines);

    MonkeyMap.monkeyMap = monkeyMap;

    return shoutAnswer("root");
}

export function solveB(lines: string) {
    let monkeyMap: Map<string, string[]> = parseLines(lines);

    MonkeyMap.monkeyMap = monkeyMap;
    let i = 0;
    MonkeyMap.monkeyMap.set("humn", ["humn"]);

    return solveForX(generateEquation(monkeyMap.get("root")[0]), generateEquation(monkeyMap.get("root")[2]), "humn");
}


function solveForX(equationOne: string, answer: number, x) {


    if (equationOne === x) {
        return answer;
    }
    equationOne = equationOne.substr(2, equationOne.length - 4);
    let brackets = 0;
    for (let i = 0; i < equationOne.length; i++) {
        if (equationOne.charAt(i) === "(") {
            brackets++;
        } else if (equationOne.charAt(i) === ")") {
            brackets--;
        }
        if (brackets === 0) {

            let operator = equationOne.charAt(i);
            if (!operator.match(/[+\-*\/]/)) {
                continue;
            }

            let leftHand = equationOne.substr(0, i - 1);
            let rightHand = equationOne.substr(i + 2, equationOne.length);
            let swapped = false;
            if (isNaN(parseInt(rightHand))) {
                swapped = true;
                [leftHand, rightHand] = [rightHand, leftHand];
            }

            let rightHandValue = parseInt(rightHand);

            switch (operator) {
                case "+":
                    rightHandValue *= -1;
                    break;
                case "-":
                    if (swapped) {
                        answer *= -1;
                    }
                    rightHandValue *= -1;
                    break;
                case "*":
                    rightHandValue = 1 / rightHandValue;
                    break;
                case "/":
                    if (swapped) {
                        answer = 1 / answer;
                    }
                    operator = "*";
                    break;
            }
            return solveForX(leftHand, eval(`${answer}
            ${operator}
            ${rightHandValue}
            `), x);
        }
    }
}


function shoutAnswer(monkeyName: string): number {

    if (MonkeyMap.monkeyMap.get(monkeyName).length === 1) {
        return parseInt(MonkeyMap.monkeyMap.get(monkeyName)[0]);
    }
    const operation = MonkeyMap.monkeyMap.get(monkeyName);

    return eval(`shoutAnswer("${operation[0]}")
    ${operation[1]}
    shoutAnswer("${operation[2]}")`)

}

function generateEquation(monkeyName: string) {

    if (monkeyName === "humn") {
        return "humn";
    }

    if (MonkeyMap.monkeyMap.get(monkeyName).length === 1) {
        return parseInt(MonkeyMap.monkeyMap.get(monkeyName)[0]);
    }

    const operation = MonkeyMap.monkeyMap.get(monkeyName);
    const answer = "( " + generateEquation(operation[0]) + " " + operation[1] + " " + generateEquation(operation[2]) + " )";
    if (answer.split(" ").includes("humn")) {
        return answer;
    }
    return eval(answer);
}


function parseLines(inputString: string) {
    const lines = inputString.split(/\r?\n/);
    const monkeyMap = new Map();
    for (let line of lines) {
        const name = line.split(": ")[0];
        const equation = line.split(": ")[1].split(" ");
        monkeyMap.set(name, equation);
    }

    return monkeyMap;
}

export class MonkeyMap {

    public static monkeyMap: Map<string, string[]>;

}