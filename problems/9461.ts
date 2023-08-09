export {};

const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const padoban = (n: number) => {
  const memo = [1, 1, 1, 2, 2, 3, 4, 5];

  for (let i = 8; i < n; i++) {
    memo[i] = memo[i - 5] + memo[i - 1];
  }

  return memo[n - 1];
};

const inputs: string[] = [];

rl.on('line', (input: string) => {
  inputs.push(input);
  if (inputs.length > Number(inputs[0])) {
    for (let i = 1; i < inputs.length; i++) {
      console.log(padoban(Number(inputs[i])));
    }

    rl.close();
  }
});

rl.on('close', () => {
  process.exit();
});
