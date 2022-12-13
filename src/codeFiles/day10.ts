export function solveA(lines: string) {
    const mySony = new CRT(parseLines(lines));
    return mySony.signalStrength;
}

export function solveB(lines: string) {
    const mySony = new CRT(parseLines(lines));
    return mySony.RenderScreen();
}

function parseLines(inputString: string): {operation: string, value: number}[] {
    let lines = inputString.split(/\r?\n/);

    const inputProgram: {operation: string, value: number}[] = []

    for (let line of lines){
        inputProgram.push({operation: line.split(' ')[0], value: parseInt(line.split(' ')[1])})
    }
    return inputProgram;
}

class CRT {

    private readonly program: {operation: string, value: number}[];
    private xValue: number;
    private clock: number;
    public signalStrength;
    private screen: string;
    public RenderScreen(){
        return this.screen;
    }

    constructor(program: {operation: string, value: number}[]) {
        this.program = program;
        this.xValue = 1;
        this.clock = 1;
        this.signalStrength = 0;
        this.screen = "";
        this.runProgram()
    }

    private runProgram() {

        let i = 0;
        let multiplier = 0;

        while (i < this.program.length) {
            const instruction = this.program[i];

            if ((this.clock - 20) % 40 === 0) {
                this.signalStrength += this.clock * this.xValue;
            }

            if ((this.clock - 1) % 40 === 0) {
                this.screen = this.screen + "\n";
            }
            if (Math.abs((this.clock - 1) % 40 - this.xValue) <= 1) {
                this.screen = this.screen + "@@@";
            } else {
                this.screen = this.screen + "---";
            }

            switch (instruction.operation){
                case "addx":
                    this.xValue += multiplier * instruction.value;
                    i += multiplier;
                    multiplier = multiplier === 0 ? 1 : 0;
                    break;
                case "noop":
                    i++;
                    break;
                default:
                    console.log("Syntax Error!");
                    break;
            }
            this.clock++;
        }
    }
}