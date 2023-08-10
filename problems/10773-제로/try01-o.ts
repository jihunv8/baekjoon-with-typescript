export {};

const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let inputMax = -1;
const inputs: string[] = [];

rl.on('line', (input: string) => {
  if (inputMax <= -1) {
    const num = Number(input);

    if (num <= 0) rl.close();
    inputMax = num;
    return;
  }

  inputs.push(input);

  if (inputs.length >= inputMax) {
    const stack: number[] = [];

    inputs.forEach((numAsString) => {
      const num = Number(numAsString);

      if (num === 0) {
        stack.pop();
        return;
      }

      stack.push(num);
    });

    console.log(stack.reduce((sum, num) => sum + num, 0));

    rl.close();
  }
});

rl.on('close', () => {
  process.exit();
});
