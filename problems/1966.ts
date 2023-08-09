export {};
//프린터 큐

const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// 배열의 처음과 끝이 연결되었다 가정 했을 때 startI부터 tartgetI의 순번을 계산합니다.
const calcNthInCircle = (startI: number, tartgetI: number, length: number) => {
  return (tartgetI + (length - startI)) % length;
};

const solution = (docs: number[], targetI: number) => {
  const targetPriority = docs[targetI];
  let result = 0;
  let startI = 0;

  for (let i = 9; i > 0; i--) {
    if (i === targetPriority) break;
    let indexOfLastDoc = startI;
    docs.forEach((doc, j) => {
      if (doc === i) {
        result++;
        const nthOfLastDoc = calcNthInCircle(startI, indexOfLastDoc, docs.length);
        const nthOfCurrent = calcNthInCircle(startI, j, docs.length);
        if (nthOfCurrent > nthOfLastDoc) {
          indexOfLastDoc = j;
        }
      }
    });

    startI = indexOfLastDoc;
  }

  for (let i = startI; i - startI < docs.length; i++) {
    let j = i % docs.length;
    if (docs[j] === targetPriority) result++;

    if (targetI === j) break;
  }

  return result;
};

let numOfCase: number = -1;
const cases: number[][] = [];

rl.on('line', (input: string) => {
  if (numOfCase === -1) {
    numOfCase = Number(input);
    return;
  }

  cases.push(input.split(' ').map((str) => Number(str)));
  if (cases.length < numOfCase * 2) return;

  for (let i = 0; i < cases.length; i += 2) {
    const targetI = cases[i][1];
    const docs = cases[i + 1];

    console.log(solution(docs, targetI));
  }

  rl.close();
});

rl.on('close', () => {
  process.exit();
});
