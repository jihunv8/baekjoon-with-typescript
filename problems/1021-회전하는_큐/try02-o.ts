export {};

/*
  좀더 빠르게 해보려고 indexOf대신 이진탐색으로 index를 찾게 했다.
  문제에서 n이 최대 50이여서 그런지 별 속도 차이가 안났다.
  try01 = 148ms
  try02 = 144ms
*/
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const calcMinOfMovement = (len: number, from: number, to: number) => {
  const difference = Math.abs(from - to);
  return difference > len / 2 ? len - difference : difference;
};

const getIndex = (arr: number[], target: number) => {
  let l = 0;
  let r = arr.length - 1;

  while (l <= r) {
    const i = Math.floor((r - l) / 2) + l;
    const num = arr[i];

    if (target === num) return i;
    if (target > num) l = i + 1;
    else r = i - 1;
  }

  return -1;
};

const solution = (n: number, pickSequence: number[]) => {
  let result = 0;
  const arr: number[] = [];

  for (let i = 0; i < n; i++) {
    arr[i] = i + 1;
  }

  let from = 0;

  pickSequence.forEach((num) => {
    const to = getIndex(arr, num);
    result += calcMinOfMovement(arr.length, from, to);
    arr.splice(to, 1);
    from = to;
  });

  console.log(result);
};

let n = -1;

rl.on('line', (input: string) => {
  if (n <= -1) {
    n = Number(input.split(' ')[0]);
    return;
  }

  solution(
    n,
    input.split(' ').map((num) => Number(num))
  );

  rl.close();
});

rl.on('close', () => {
  process.exit();
});
