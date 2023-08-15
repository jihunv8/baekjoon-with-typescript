export {};

const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const calcMinOfMovement = (len: number, from: number, to: number) => {
  const difference = Math.abs(from - to);
  return difference > len / 2 ? len - difference : difference;
};

const solution = (n: number, pickSequence: number[]) => {
  let result = 0;
  const arr: number[] = [];

  for (let i = 0; i < n; i++) {
    arr[i] = i + 1;
  }

  let from = 0;

  pickSequence.forEach((num) => {
    const to = arr.indexOf(num);
    result += calcMinOfMovement(arr.length, from, to);
    arr.splice(to, 1);
    from = to;
  });

  console.log(result);
};

let n = -1;

rl.on('line', (input: string) => {
  if (n <= -1) {
    n = Number(input.split(' ')[0]);
    return;
  }

  solution(
    n,
    input.split(' ').map((num) => Number(num))
  );

  rl.close();
});

rl.on('close', () => {
  process.exit();
});
