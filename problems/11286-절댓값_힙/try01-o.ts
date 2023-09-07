export {};

const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

class Heap {
  private arr: number[] = [];

  private swap(i1: number, i2: number) {
    const temp = this.arr[i1];
    this.arr[i1] = this.arr[i2];
    this.arr[i2] = temp;
  }

  //더 위에 있어야하는 index를 반환한다.
  private getTopIndex(i1: number, i2: number): number {
    const num1 = this.arr[i1];
    const num2 = this.arr[i2];

    const num1Abs = Math.abs(num1);
    const num2Abs = Math.abs(num2);
    const difference = num1Abs - num2Abs;

    if (difference < 0) return i1;
    if (difference > 0) return i2;

    return num1 < num2 ? i1 : i2;
  }

  private calcParentIndex(index: number) {
    if (index <= 0) return -1;
    return Math.floor((index - 1) / 2);
  }

  private calcLeftChildIndex(index: number) {
    const leftChildIndex = index * 2 + 1;
    if (leftChildIndex >= this.arr.length) return -1;
    return leftChildIndex;
  }

  private calcRightChildIndex(index: number) {
    const rightChildIndex = index * 2 + 2;
    if (rightChildIndex >= this.arr.length) return -1;
    return rightChildIndex;
  }

  pop(): number | undefined {
    if (this.arr.length <= 1) {
      return this.arr.pop();
    }

    const poped = this.arr[0];
    const lastNum = this.arr.pop();

    if (lastNum === undefined) throw new Error();

    this.arr[0] = lastNum;
    let currentIndex = 0;

    while (currentIndex < this.arr.length) {
      const leftChildIndex = this.calcLeftChildIndex(currentIndex);
      const rightChildIndex = this.calcRightChildIndex(currentIndex);

      if (leftChildIndex <= -1 && rightChildIndex <= -1) break;

      let targetIndex: number;

      if (leftChildIndex > -1 && rightChildIndex > -1) {
        targetIndex = this.getTopIndex(leftChildIndex, rightChildIndex);
      } else if (leftChildIndex > -1) {
        targetIndex = leftChildIndex;
      } else {
        targetIndex = rightChildIndex;
      }

      const topIndex = this.getTopIndex(currentIndex, targetIndex);

      if (topIndex === currentIndex) break;

      this.swap(currentIndex, targetIndex);
      currentIndex = targetIndex;
    }

    return poped;
  }

  push(num: number) {
    this.arr.push(num);
    let pushedNumIndex = this.arr.length - 1;

    while (this.calcParentIndex(pushedNumIndex) >= 0) {
      const parentIndex = this.calcParentIndex(pushedNumIndex);

      const topIndex = this.getTopIndex(pushedNumIndex, parentIndex);

      if (topIndex === parentIndex) break;

      this.swap(pushedNumIndex, parentIndex);
      pushedNumIndex = parentIndex;
    }
  }
}

const solution = (commands: number[]) => {
  let result = '';
  const heap = new Heap();

  commands.forEach((command) => {
    if (command === 0) {
      const poped = heap.pop() ?? 0;
      result += `${poped}\n`;
      return;
    }

    heap.push(command);
  });

  console.log(result);
};

let inputsLength = -1;
const inputs: string[] = [];

rl.on('line', (input: string) => {
  if (inputsLength < 0) {
    inputsLength = Number(input);
    return;
  }

  inputs.push(input);

  if (inputs.length < inputsLength) return;

  solution(inputs.map((el) => Number(el)));
  rl.close();
});

rl.on('close', () => {
  process.exit();
});
