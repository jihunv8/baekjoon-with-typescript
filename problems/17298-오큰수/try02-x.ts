export {};
//문제에선 A1, A2, A3...이지만 여기선 A0, A1, A2...으로 함

const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const solution = (sequence: number[]) => {
  let result = '-1';
  let prevNum = sequence[sequence.length - 1];
  let prevNge = -1;

  for (let i = sequence.length - 2; i >= 0; i--) {
    const num = sequence[i];
    let nge = -1;
    if (num < prevNum) {
      nge = prevNum;
    } else if (num < prevNge) {
      nge = prevNge;
    }
    result = `${nge} ${result}`;

    prevNum = num;
    prevNge = nge;
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
