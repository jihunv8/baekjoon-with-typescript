export {};

const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const solution = (cook: number[][]) => {
  const scoresOfCooks = cook.map((scores) => scores.reduce((sum, score) => sum + score, 0));

  let bestCookIndex = 0;

  scoresOfCooks.forEach((score, i) => {
    const bestCookScore = scoresOfCooks[bestCookIndex];
    if (score > bestCookScore) bestCookIndex = i;
  });

  console.log(`${bestCookIndex + 1} ${scoresOfCooks[bestCookIndex]}`);
};

const inputs: string[] = [];
rl.on('line', (input: string) => {
  inputs.push(input);

  if (inputs.length < 5) return;

  solution(inputs.map((el) => el.split(' ').map((e) => Number(e))));
  rl.close();
});

rl.on('close', () => {
  process.exit();
});
