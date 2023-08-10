export {};

const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

class IntegerStack {
  private _stack: number[] = [];

  push(num: number) {
    this._stack.push(num);
  }

  pop(): number {
    const num = this._stack.pop();
    return num ?? -1;
  }

  size(): number {
    return this._stack.length;
  }

  empty(): number {
    return this._stack.length <= 0 ? 1 : 0;
  }

  top(): number {
    const num = this._stack[this._stack.length - 1];
    return num ?? -1;
  }
}

let inputMax = -1;
const inputs: string[] = [];

rl.on('line', (input: string) => {
  if (inputMax <= -1) {
    const num = Number(input);

    if (num <= 0) {
      rl.close();
    }

    inputMax = num;

    return;
  }

  inputs.push(input);

  if (inputs.length >= inputMax) {
    const stack = new IntegerStack();

    let result = '';
    inputs.forEach((i) => {
      const [command, value] = i.split(' ');
      switch (command) {
        case 'push':
          stack.push(Number(value));
          break;
        case 'pop':
          result += stack.pop() + '\n';
          break;
        case 'size':
          result += stack.size() + '\n';
          break;
        case 'empty':
          result += stack.empty() + '\n';
          break;
        case 'top':
          result += stack.top() + '\n';
          break;
        default:
          throw new Error(`사용할 수 없는 명령어: ${command}`);
      }
    });

    console.log(result);

    rl.close();
  }
});

rl.on('close', () => {
  process.exit();
});
