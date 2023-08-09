export {};

const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const isAscending = (arr: number[]) => {
  for (let i = 0; i < arr.length - 1; i++) {
    if (arr[i] > arr[i + 1]) return false;
  }

  return true;
};
const isDescending = (arr: number[]) => {
  for (let i = 0; i < arr.length - 1; i++) {
    if (arr[i] < arr[i + 1]) return false;
  }

  return true;
};

const solution = (arr: number[]) => {
  if (isAscending(arr)) return 'ascending';
  if (isDescending(arr)) return 'descending';
  return 'mixed';
};

rl.on('line', (input: string) => {
  const result = solution(input.split(' ').map((str) => Number(str)));
  console.log(result);
  rl.close();
});
rl.on('close', () => {
  process.exit();
});
