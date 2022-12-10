export function solveA(lines: string) {
    const myMotorola = new WalkieTalkie(parseLines(lines));
    return myMotorola.signalStrength;
}

export function solveB(lines: string) {
    const myMotorola = new WalkieTalkie(parseLines(lines));
    return myMotorola.RenderScreen();
}

function parseLines(inputString: string): [string, number][] {
    let lines = inputString.split(/\r?\n/);

    const inputProgram: [string, number][] = []

    for (let line of lines){
        inputProgram.push([line.split(' ')[0], parseInt(line.split(' ')[1])])
    }
    return inputProgram;
}

class WalkieTalkie {

    private readonly program: [string, number][];
    private xValue: number;
    private clock: number;
    public signalStrength;
    private screen: string;
    public RenderScreen(){
        return this.screen;
    }

    constructor(program: [string, number][]) {
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
            const [operation, value] = this.program[i];

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

            switch (operation){
                case "addx":
                    this.xValue += multiplier * value;
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