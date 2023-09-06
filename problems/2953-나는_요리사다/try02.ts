export {};
// try01에서 빠르게 풀려고 변수명을 대충 지음
// 좀 더 명확한 코드로 리팩토링

const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const sum = (arr: number[]) => {
  return arr.reduce((sum, num) => sum + num, 0);
};

const solution = (scoreBoard: number[][]) => {
  const sumOfScoreBoard = scoreBoard.map((scores) => sum(scores));

  let bestChefNumber = 1;

  sumOfScoreBoard.forEach((score, i) => {
    const bestChefScore = sumOfScoreBoard[bestChefNumber - 1];
    if (score > bestChefScore) bestChefNumber = i + 1;
  });

  console.log(`${bestChefNumber} ${sumOfScoreBoard[bestChefNumber - 1]}`);
};

const inputs: string[] = [];
rl.on('line', (input: string) => {
  inputs.push(input);

  if (inputs.length < 5) return;

  const scoreBoard = inputs.map((scoresOfChef) => scoresOfChef.split(' ').map((score) => Number(score)));

  solution(scoreBoard);
  rl.close();
});

rl.on('close', () => {
  process.exit();
});
