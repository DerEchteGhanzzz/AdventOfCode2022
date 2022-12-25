export function solveA(lines: string): number{
    return getMessageID(parseLines(lines), 4);
}

export function solveB(lines: string){
    return getMessageID(parseLines(lines), 14);
}

function getMessageID(message: string, length: number): number{
    let code = message.slice(0, length)
    for (let i = code.length; i < message.length; i++){
        if (!hasDuplicates(code.slice(code.length-length))){
            return code.length;
        }
    }
    return code.length
}

function hasDuplicates(array: string) {
    return (new Set(array)).size !== array.length;
}

function parseLines(inputString: string): string{
    const lines = inputString.split(/\r?\n/);
    return lines[0];
}