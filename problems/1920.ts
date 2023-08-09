export {};
//수찾기
//이진탐색

const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const binarySearch = (arr: number[], target: number) => {
  let leftPoint = 0;
  let rightPoint = arr.length - 1;

  while (leftPoint <= rightPoint) {
    const midPoint = Math.floor((leftPoint + rightPoint) / 2);
    if (target === arr[midPoint]) return 1;

    if (target < arr[midPoint]) rightPoint = midPoint - 1;
    else leftPoint = midPoint + 1;
  }

  return 0;
};

const inputs: number[][] = [];

rl.on('line', (input: string) => {
  inputs.push(input.split(' ').map((e) => Number(e)));

  if (inputs.length === 4) {
    //inputs[0]과 inputs[1]은 필요 없을듯
    const arr = inputs[1];
    const targets = inputs[3];

    let result = '';
    arr.sort((a, b) => a - b);
    targets.forEach((target) => {
      result += binarySearch(arr, target) + '\n';
    });

    console.log(result);
    rl.close();
  }
});

rl.on('close', () => {
  process.exit();
});
