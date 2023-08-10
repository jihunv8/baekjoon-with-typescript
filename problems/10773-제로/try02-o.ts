export {};
//코드 정리

const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

class InputManager {
  private _inputMax = -1;
  private _inputs: string[] = [];

  private constructor() {}

  private static inputManager: InputManager;

  static getInputManage() {
    if (this.inputManager === undefined) {
      this.inputManager = new InputManager();
    }

    return this.inputManager;
  }

  getTestCase() {
    return this._inputs.map((input) => Number(input));
  }

  input(value: string) {
    if (this._inputMax <= -1) {
      this._inputMax = Number(value);
      return;
    }

    if (this.isDone()) return;

    this._inputs.push(value);
  }

  isDone(): boolean {
    return this._inputs.length >= this._inputMax;
  }
}

const solution = (testCase: number[]) => {
  const stack: number[] = [];

  testCase.forEach((num) => {
    if (num === 0) {
      stack.pop();
      return;
    }

    stack.push(num);
  });

  console.log(stack.reduce((sum, num) => sum + num, 0));
};

rl.on('line', (input: string) => {
  const inputManager = InputManager.getInputManage();
  inputManager.input(input);

  if (inputManager.isDone()) {
    solution(inputManager.getTestCase());
    rl.close();
  }
});

rl.on('close', () => {
  process.exit();
});
