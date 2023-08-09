export {};
//블랙잭

const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const solution = (cards: number[], M: number) => {
  let result = 0;

  for (let i = 0; i < cards.length; i++) {
    for (let j = i + 1; j < cards.length; j++) {
      for (let k = j + 1; k < cards.length; k++) {
        const sum = cards[i] + cards[j] + cards[k];

        if (result < sum && sum <= M) {
          result = sum;
        }
      }
    }
  }

  return result;
};

const input1: number[] = [];

rl.on('line', (input: string) => {
  if (input1.length <= 0) input.split(' ').forEach((str) => input1.push(Number(str)));
  else {
    const cards = input.split(' ').map((str) => Number(str));
    const M = input1[1];
    console.log(solution(cards, M));
    rl.close();
  }
});
rl.on('close', () => {
  process.exit();
});
