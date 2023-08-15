export {};

/*
  testcase 입력방식을 readline에서 readFile형식으로 바꿔봤다.
  128ms가 나왔다.
*/

const fs = require('fs');
const input = fs.readFileSync('/dev/stdin').toString().split('\n') as string;

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

const n = Number(input[0].split(' ')[0]);
const pickSequence = input[1].split(' ').map((num) => Number(num));

solution(n, pickSequence);
