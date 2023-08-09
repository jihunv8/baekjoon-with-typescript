export {};

//스택 수열

const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const solution = (n: number, sequence: number[]) => {
  let result = '';
  const stack: number[] = [];

  let j = 0;
  for (let i = 1; i <= n; i++) {
    stack.push(i);
    result += '+\n';
    while (stack.length > 0 && stack[stack.length - 1] === sequence[j]) {
      stack.pop();
      result += '-\n';
      j++;
    }
  }

  if (j < n - 1) result = 'NO';

  return result;
};

let n: number = 0;
const sequence: number[] = [];

rl.on('line', (input: string) => {
  const inputNum = Number(input);
  if (n === 0) {
    n = inputNum;
    return;
  }

  sequence.push(inputNum);
  if (sequence.length < n) return;

  console.log(solution(n, sequence));

  rl.close();
});

rl.on('close', () => {
  process.exit();
});
