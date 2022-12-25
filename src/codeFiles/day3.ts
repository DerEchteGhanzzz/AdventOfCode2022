export function solveA(lines: string){
    const rucksacks = parseLines(lines);
    let answer: number = 0
    for (let rucksack of rucksacks){
        let compOne: string = rucksack.substring(0, rucksack.length/2)
        let compTwo: string = rucksack.substring(rucksack.length/2, rucksack.length)
        for (let item of compOne){
            if (compTwo.includes(item)){
                answer += priorityValue(item)
                break
            }
        }
    }
    return answer
}

export function solveB(lines: string){
    const rucksacks = parseLines(lines);
    let answer: number = 0
    for (let i = 0; i < rucksacks.length; i += 3){
        for (let item of rucksacks[i]){
            if (rucksacks[i+1].includes(item) && rucksacks[i+2].includes(item)){
                answer += priorityValue(item);
                break
            }
        }
    }
    return answer
}

function priorityValue(item: string): number{

    let value: number
    if (item === item.toUpperCase()){
        value = item.charCodeAt(0) - "A".charCodeAt(0) + 26 + 1
    } else {
        value = item.charCodeAt(0) - "a".charCodeAt(0) + 1
    }

    return value
}

function parseLines(inputString: string): string[]{
    return inputString.split(/\r?\n/);
}