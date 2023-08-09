export {};
// 수찾기 2트
// 객체(map)를 사용

const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const inputs: string[] = [];

rl.on('line', (input: string) => {
  inputs.push(input);
  if (inputs.length < 4) return;

  const nList: { [key: number]: true } = {};
  inputs[1].split(' ').forEach((num) => (nList[Number(num)] = true));

  let result = '';
  inputs[3].split(' ').forEach((num) => {
    result += (nList[Number(num)] ? '1' : '0') + '\n';
  });

  console.log(result);
  rl.close();
});

rl.on('close', () => {
  process.exit();
});
