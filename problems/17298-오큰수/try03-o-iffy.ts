export {};
/* 수열의 뒤의 수부터 연결하는 방법
  9 4 3 5 10
  10 -> 10─-1       10의 오른쪽에는 수가 없으니 -1

  5  -> 5─10─-1     5의 바로 오른쪽 수 10은 5보다 크다. 5의 오큰수는 10

  3  -> 3─5─10─-1   3의 바로 오른쪽 수 5는 3보다 크다. 3의 오큰수는 5

  4  -> 3─5─10─-1   4의 바로 오른쪽 수 3은 4보다 작다. 3의 오큰수 5는 4보다 크다. 4의 오큰수는 5
        4─┘

  9  ->   9─┐       9의 바로 오른쪽 수 4는 9보다 작다. 4의 오큰수 5는 9보다 작다. 5의 오큰수 10은 9보다 크다. 9의 오큰수 10
        3─5─10─-1
        4─┘
*/

const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const solution = (sequence: number[]) => {
  if (sequence.length <= 0) console.log('');

  let result = '-1';
  const table: { [key: number]: number } = { [sequence[sequence.length - 1]]: -1 };

  for (let i = sequence.length - 2; i >= 0; i--) {
    const num = sequence[i];
    const rightNum = sequence[i + 1];

    if (rightNum > num) {
      table[num] = rightNum;
      result = `${rightNum} ${result}`;
      continue;
    }

    let currentRightNum = table[rightNum];
    while (currentRightNum > -1 && currentRightNum <= num) {
      currentRightNum = table[currentRightNum];
    }

    table[num] = currentRightNum;
    result = `${currentRightNum} ${result}`;
  }

  console.log(result);
};

let isFirstInput = true;

rl.on('line', (input: string) => {
  if (isFirstInput) {
    isFirstInput = false;
    return;
  }

  solution(input.split(' ').map((num) => Number(num)));
  rl.close();
});

rl.on('close', () => {
  process.exit();
});
