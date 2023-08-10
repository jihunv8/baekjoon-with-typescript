export {};

const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const solution = (n: number, sequence: number[]) => {
  let result = '';
  const stack: number[] = [];
  let sequenceIndex = 0;

  for (let i = 1; i <= n; i++) {
    stack.push(i);
    result += '+' + '\n';

    while (
      sequence[sequenceIndex] !== undefined &&
      stack[stack.length - 1] !== undefined &&
      sequence[sequenceIndex] === stack[stack.length - 1]
    ) {
      stack.pop();
      sequenceIndex++;
      result += '-' + '\n';
    }
  }

  if (sequenceIndex < n) {
    console.log('NO');
  } else {
    console.log(result);
  }
};

let inputMax: number = -1;
const inputs: string[] = [];

rl.on('line', (input: string) => {
  if (inputMax <= -1) {
    if (Number(input) <= 0) rl.close();
    inputMax = Number(input);
    return;
  }

  inputs.push(input);

  if (inputs.length >= inputMax) {
    solution(
      inputMax,
      inputs.map((input) => Number(input))
    );
    rl.close();
  }
});

rl.on('close', () => {
  process.exit();
});
