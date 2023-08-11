export {};
/* 
  스택 사용하지않고 공식(?)으로 풀기 
  잘못된 접근법같다.
  수열 5 3 2 1 4이 있을 때
  5를 stack에서 pop할 경우 stack은 [1, 2, 3, 4]이다.
  다음으로 3을 pop해야하는데 4가 최상위에 있다.
  그러므로 NO를 반환해야한다.

  해당 접근법을 사용할 경우 이렇게 다른 숫자에 가로막혀 pop하지 못하는 경우를 알기 힘들다.
  물론 방법이 있겠지만 스택을 사용할 경우보다 더 복잡해질 것 같다.
*/
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const solution = (sequence: number[]) => {
  let result = '';
  let maxOfPop = 0;

  for (let i = 0; i < sequence.length; i++) {
    const current = sequence[i];

    if (current > maxOfPop) {
      for (let j = 0; j < current - maxOfPop; j++) result += '+' + '\n';
      result += '-' + '\n';
      maxOfPop = current;
      continue;
    }

    if (maxOfPop >= sequence.length && current < sequence[i + 1]) {
      result = 'NO';
      break;
    }

    result += '-' + '\n';
  }

  console.log(result);
};

let inputMax: number = -1;
const inputs: string[] = [];

rl.on('line', (input: string) => {
  if (inputMax <= -1) {
    if (Number(input) <= 0) rl.close();
    inputMax = Number(input);
    return;
  }

  inputs.push(input);

  if (inputs.length >= inputMax) {
    solution(inputs.map((input) => Number(input)));
    rl.close();
  }
});

rl.on('close', () => {
  process.exit();
});
