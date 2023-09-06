export {};

const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const solution = (n: number, k: number) => {
  let result: number[] = [];

  const arr: number[] = [];
  for (let i = 1; i <= n; i++) {
    arr.push(i);
  }

  let i = k - 1;

  while (arr.length > 0) {
    const out = arr.splice(i, 1)[0];
    result.push(out);

    const nextI = i + k - 1;
    i = nextI < arr.length ? nextI : nextI % arr.length;
  }

  console.log(`<${result.join(', ')}>`);
};

rl.on('line', (input: string) => {
  const [n, k] = input.split(' ').map((num) => Number(num));

  solution(n, k);
  rl.close();
});

rl.on('close', () => {
  process.exit();
});
