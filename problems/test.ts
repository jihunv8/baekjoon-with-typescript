export {};

const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const solution = (sequence: number[]) => {
  const stack: [number, number][] = [];
  const NGE: number[] = [];

  for (let i = 0; i < sequence.length; i++) {
    NGE[i] = -1;
  }

  sequence.forEach((num, i) => {
    if (stack.length === 0 || stack[stack.length - 1][0] >= num) {
      stack.push([num, i]);
    } else {
      while (stack.length > 0) {
        const poped = stack.pop();

        if (!poped) throw new Error('에러');

        const [prev, j] = poped;

        if (prev >= num) {
          stack.push([prev, j]);
          break;
        } else {
          NGE[j] = num;
        }
      }
      stack.push([num, i]);
    }
  });

  console.log(NGE.join(' '));
};

let isFirstInput = true;

rl.on('line', (input: string) => {
  if (isFirstInput) {
    isFirstInput = false;
    return;
  }

  solution(input.split(' ').map((num) => Number(num)));
  rl.close();
});

rl.on('close', () => {
  process.exit();
});
