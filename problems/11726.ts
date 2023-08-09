export {};

//동적 계획법 문제

const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const solution = (n: number) => {
  const memo = [1, 2];

  for (let i = 2; i < n; i++) {
    memo[i] = (memo[i - 2] + memo[i - 1]) % 10007;
  }

  return memo[n - 1];
};

rl.on('line', (input: string) => {
  const n = Number(input);
  console.log(solution(n));
  rl.close();
});

rl.on('close', () => {
  process.exit();
});
