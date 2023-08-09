export {};
//이름

const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.on('line', (input: string) => {
  rl.close();
});

rl.on('close', () => {
  process.exit();
});
