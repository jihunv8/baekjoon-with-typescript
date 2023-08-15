const readline = require('readline');
/*
  틀린 이유: 
  반례: 2 3 2
  예상: 3 -1 -1
  결과: -1 -1 -1
  이유: ngeTable { 2: -1, 3: -1 }
  예상처럼 되려면 ngeTable이 {2(첫번째): 3, 3: -1, 2(두번째): -1} 이렇게 되어야 하는데 이렇게는 될 수 없으니 틀림
*/
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const solution = (sequence: number[]) => {
  const stack: number[] = [];

  const ngeTable: { [key: number]: number } = {};

  sequence.forEach((num) => {
    while (stack.length > 0) {
      const top = stack[stack.length - 1];
      if (top >= num) break;

      ngeTable[top] = num;
      stack.pop();
    }

    stack.push(num);
  });

  stack.forEach((num) => (ngeTable[num] = -1));

  console.log(sequence.map((num) => ngeTable[num]).join(' '));
};

let isFirstInput = true;

rl.on('line', (input: string) => {
  if (isFirstInput) {
    isFirstInput = false;
    return;
  }

  const sequence = input.length > 0 ? input.split(' ').map((num) => Number(num)) : [];

  solution(sequence);
  rl.close();
});

rl.on('close', () => {
  process.exit();
});
