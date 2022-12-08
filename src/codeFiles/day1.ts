export function solveA(lines: string[]){

    let max: number = 0
    let cur: number = 0
    for (let line of lines){
        if (line === ""){
            if (max < cur){
                max = cur
            }
            cur = 0
            continue
        }
        cur += parseInt(line)
    }
    return max
}

export function solveB(lines: string[]){

    const elves: number[] = []
    let cur: number = 0
    for (let line of lines){
        if (line === ""){
            elves.push(cur)
            cur = 0
            continue
        }
        cur += parseInt(line)
    }
    elves.sort()
    return elves[elves.length-1] + elves[elves.length-2] + elves[elves.length-3]
}