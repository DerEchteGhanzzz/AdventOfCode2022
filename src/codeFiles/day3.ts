export function solveA(lines: string[]){

    let answer: number = 0
    for (let line of lines){
        let compOne: string = line.substring(0, line.length/2)
        let compTwo: string = line.substring(line.length/2, line.length)
        for (let item of compOne){
            if (compTwo.includes(item)){
                answer += priorityValue(item)
                break
            }
        }
    }
    return answer
}

export function solveB(lines: string[]){

    let answer: number = 0
    for (let i = 0; i < lines.length; i += 3){
        for (let item of lines[i]){
            if (lines[i+1].includes(item) && lines[i+2].includes(item)){
                answer += priorityValue(item)
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