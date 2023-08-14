export {};
//문제에선 A1, A2, A3...이지만 여기선 A0, A1, A2...으로 함

const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const createNgeGetter = (sequence: number[]) => {
  return (i: number) => {
    const num = sequence[i];
    let nge = -1;

    for (let j = i + 1; j < sequence.length; j++) {
      if (sequence[j] > num) {
        nge = sequence[j];
        break;
      }
    }

    return nge;
  };
};

const solution = (sequence: number[]) => {
  const getNge = createNgeGetter(sequence);

  let result = '';
  sequence.forEach((num, i) => {
    const nge = getNge(i);
    result += `${nge} `;
  });

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
