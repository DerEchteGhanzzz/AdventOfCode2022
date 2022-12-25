const {modulo} = require('../aocUtils');

export function solveA(lines: string) {

    let [digitMap, digitOrders] = parseLines(lines);

    mixList(digitOrders, digitMap);

    return getGrove(digitOrders, digitMap);
}

export function solveB(lines: string) {
    let [digitMap, digitOrders] = parseLines(lines);

    const publicKey = 811589153;
    digitMap.forEach((v, k) => digitMap.set(k, v * publicKey));

    for (let i = 0; i < 10; i++) {
        mixList(digitOrders, digitMap);
    }

    return getGrove(digitOrders, digitMap);
}

function parseLines(inputString: string): [Map<number, number>, number[]] {
    const lines = inputString.split(/\r?\n/);
    const digitMap = new Map<number, number>();
    const digitOrderList: number[] = [];
    for (let i = 0; i < lines.length; i++) {
        const currentDigit = parseInt(lines[i]);
        digitMap.set(i, currentDigit);
        digitOrderList.push(i);
    }
    return [digitMap, digitOrderList];
}

function getGrove(digitOrders: number[], digitMap: Map<number, number>) {
    const finalArray = digitOrders.map(a => digitMap.get(a))
    let answer = 0;
    const zeroIndex = finalArray.indexOf(0);

    for (let i = 1000; i < 4000; i += 1000) {
        const groveDigit = finalArray[(zeroIndex + i) % (digitMap.size)];
        answer += groveDigit;
    }
    return answer;
}

function mixList(digitOrders: number[], digitMap: Map<number, number>) {
    for (let i = 0; i < digitMap.size; i++) {

        const currentIndex = digitOrders.indexOf(i);
        const currentDigit = digitMap.get(digitOrders.splice(currentIndex, 1)[0]);

        let negative = currentDigit < 0 ? -1 : 0;
        if (negative === -1 && currentIndex + currentDigit + negative < digitOrders.length) {
            negative = 0;
        }
        const newIndex = modulo(currentIndex + currentDigit + negative, digitOrders.length);

        digitOrders.splice(newIndex, 0, i);
    }
    return
}