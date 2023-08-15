export {};
/*
  풀이 보고 다시 풀어봄
  스택사용
*/

const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const solution = (sequence: number[]) => {
  const stack: [number, number][] = [];
  const nges: number[] = [];
  nges.length = sequence.length;
  nges.fill(-1);

  sequence.forEach((num, i) => {
    while (stack.length > 0) {
      const [prev, j] = stack[stack.length - 1];

      if (prev >= num) break;

      nges[j] = num;
      stack.pop();
    }

    stack.push([num, i]);
  });

  console.log(nges.join(' '));
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
