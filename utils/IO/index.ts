import readline, { ReadLine } from 'readline';
import chalk, { Color } from 'chalk';

export class IO {
    private readonly input: NodeJS.ReadableStream;
    private readonly output: NodeJS.WritableStream;

    public readonly rl: ReadLine;

    constructor(input: NodeJS.ReadableStream, output: NodeJS.WritableStream) {
        this.input = input;
        this.output = output;

        this.rl = readline.createInterface({
            input,
            output,
            prompt: chalk.cyan('You > ')
        });
    }

    getUsername(): Promise<string> {
        return new Promise(resolve => {
            this.rl.question('Enter you name: ', (username) => {
                this.rl.pause();
                resolve(username)
            });
        })
    }

    onLine(cb: (line: string) => any) {
        this.rl.prompt(true);
        this.rl.on('line', line => {
            cb(line);
            this.rl.prompt(true);
        })
    }

    write(color: typeof Color, ...args: string[]) {
        readline.clearLine(this.output, 0);
        readline.cursorTo(this.output, 0)

        const [name, ...message] = args;
        console.log(chalk[color](name) + ' > ' + message)

        this.rl.prompt(true);
    }

}