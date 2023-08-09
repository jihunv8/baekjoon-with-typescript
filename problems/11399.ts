export {};

//greedy algorithm

const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// const solution = (times: number[]) => {
//   times.sort((a, b) => a - b);
//   const [result] = times.reduce(
//     ([totalTime, wait], time) => {
//       const timeTaken = wait + time;
//       return [totalTime + timeTaken, timeTaken];
//     },
//     [0, 0]
//   );

//   return result;
// };

const solution = (times: number[]) => {
  times.sort((a, b) => a - b);
  const result = times.reduce((totalTime, time, i) => {
    return totalTime + time * (times.length - i);
  }, 0);

  return result;
};

const inputs: number[][] = [];

rl.on('line', (input: string) => {
  inputs.push(input.split(' ').map((num) => Number(num)));
  if (inputs.length === 2) return rl.close();
});

rl.on('close', () => {
  console.log(solution(inputs[1]));
  process.exit();
});
