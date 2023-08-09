export {};
// 수찾기 3트
// Set을 사용

const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const inputs: string[] = [];

rl.on('line', (input: string) => {
  inputs.push(input);
  if (inputs.length < 4) return;
  const set = new Set(inputs[1].split(' ').map((n) => Number(n)));

  let result = '';
  inputs[3].split(' ').forEach((n) => {
    const num = Number(n);
    result += (set.has(num) ? '1' : '0') + '\n';
  });

  console.log(result);
  rl.close();
});

rl.on('close', () => {
  process.exit();
});
