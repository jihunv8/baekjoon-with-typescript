export {};

const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const moveLeft = <T>(arr: T[]) => {
  const temp = arr.shift();
  if (temp !== undefined) arr.push(temp);
};

const moveRight = <T>(arr: T[]) => {
  const temp = arr.pop();
  if (temp !== undefined) arr.unshift(temp);
};

const solution = (papersInBallons: number[]) => {
  const result: number[] = [];
  const balloons = papersInBallons.map((paper, i) => [i + 1, paper]);

  while (balloons.length > 0) {
    const balloon = balloons.shift();

    if (balloon === undefined) break;

    const [balloonNumber, numOnPaper] = balloon;
    result.push(balloonNumber);

    if (numOnPaper > 0) {
      for (let i = 0; i < numOnPaper - 1; i++) {
        moveLeft(balloons);
      }
      continue;
    }

    if (numOnPaper < 0) {
      for (let i = 0; i > numOnPaper; i--) {
        moveRight(balloons);
      }
    }
  }

  console.log(result.join(' '));
};

const inputs: string[] = [];

rl.on('line', (input: string) => {
  inputs.push(input);

  if (input.length < 2) return;

  solution(inputs[1].split(' ').map((num) => Number(num)));
  rl.close();
});

rl.on('close', () => {
  process.exit();
});
