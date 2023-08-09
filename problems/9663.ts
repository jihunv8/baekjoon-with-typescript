export {};

const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const nQueen = (n: number) => {
  let result = 0;

  const canPlace = (currentX: number, candidatesX: number[]) => {
    const currentY = candidatesX.length;

    for (let y = 0; y < candidatesX.length; y++) {
      const candidateX = candidatesX[y];
      const candidateY = y;

      //수직 검사
      if (currentX === candidateX) return false;

      //대각선 검사
      if (Math.abs(currentX - candidateX) === Math.abs(currentY - candidateY)) return false;
    }

    return true;
  };

  const nQ = (candidatesX: number[] = []) => {
    if (candidatesX.length === n) {
      result++;
      return;
    }

    for (let x = 0; x < n; x++) {
      if (canPlace(x, candidatesX)) {
        nQ([...candidatesX, x]);
      }
    }
  };

  nQ();

  return result;
};

rl.on('line', (input: string) => {
  const n = Number(input);
  console.log(nQueen(n));
  rl.close();
});

rl.on('close', () => {
  process.exit();
});
