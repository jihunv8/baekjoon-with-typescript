export {};
/*
  2개의 해시 사용
  예시)
    시작 {networkKeyTable} {networkTable}
    a b  { a: 0, b: 0 }                                { 0: ['a', 'b'] }                                                                    새로운 network [a, b] 추가                   -> [a, b].length          = 2
    c d  { a: 0, b: 0, c: 1, d: 1 }                    { 0: ['a', 'b'], 1: ['c', 'd'] }                                                     새로운 network [c, d] 추가                   -> [c, d].length          = 2
    e d  { a: 0, b: 0, c: 1, d: 1, e: 1 }              { 0: ['a', 'b'], 1: ['c', 'd', 'e'] }                                                기존 network [c, d]에 e 추가                 -> [c, d, e].length       = 3
    g f  { a: 0, b: 0, c: 1, d: 1, e: 1, g: 2, f: 2 }  { 0: ['a', 'b'], 1: ['c', 'd', 'e'], 2: ['g', 'f'] }                                 새로운 network [g, f] 추가                   -> [g, f].length          = 2
    b c  { a: 3, b: 3, c: 3, d: 3, e: 3, g: 2, f: 2 }  { 0: ['a', 'b'], 1: ['c', 'd', 'e'], 2: ['g', 'f'], 3: ['a', 'b', 'c', 'd', 'e']}    기존 network [a, b]와 [c, d, e] 병합         -> [a, b, c, d, e].length = 5
    a e  { a: 3, b: 3, c: 3, d: 3, e: 3, g: 2, f: 2 }  { 0: ['a', 'b'], 1: ['c', 'd', 'e'], 2: ['g', 'f'], 3: ['a', 'b', 'c', 'd', 'e']}    a, e모두 같은 network이므로 아무것도 하지 않음 -> [a, b, c, d, e].length = 5

    반환 -> 2 2 3 2 5 5
*/

const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const solution = (logOfAddFriend: string[]) => {
  const result: number[] = [];
  const networkKeyTable: { [key: string]: number } = {};
  const networkTable: { [key: number]: string[] } = {};

  const genNetworkKey = (() => {
    let key = 0;
    return () => key++;
  })();

  const hookNetwork = (key: number, network: string[]) => {
    networkTable[key] = network;
    network.forEach((person) => {
      networkKeyTable[person] = key;
    });
  };

  logOfAddFriend.forEach((log) => {
    const [person1, person2] = log.split(' ');
    const person1NetworkKey = networkKeyTable[person1];
    const person2NetworkKey = networkKeyTable[person2];

    //그룹 생성
    if (person1NetworkKey === undefined && person2NetworkKey === undefined) {
      const newNetwork = [person1, person2];
      const newKey = genNetworkKey();
      hookNetwork(newKey, newNetwork);

      result.push(newNetwork.length);
      return;
    }

    //기존 그룹에 사람 추가
    if (person1NetworkKey !== undefined && person2NetworkKey === undefined) {
      const network = networkTable[person1NetworkKey];
      network.push(person2);
      networkKeyTable[person2] = person1NetworkKey;

      result.push(network.length);
      return;
    }

    if (person1NetworkKey === undefined && person2NetworkKey !== undefined) {
      const network = networkTable[person2NetworkKey];
      network.push(person1);
      networkKeyTable[person1] = person2NetworkKey;

      result.push(network.length);
      return;
    }

    if (person1NetworkKey !== undefined && person2NetworkKey !== undefined) {
      //그룹 병합
      if (person1NetworkKey !== person2NetworkKey) {
        const person1Network = networkTable[person1NetworkKey];
        const person2Network = networkTable[person2NetworkKey];
        const mergedNetwork = [...person1Network, ...person2Network];
        const newKey = genNetworkKey();
        hookNetwork(newKey, mergedNetwork);

        result.push(mergedNetwork.length);
        return;
      }

      //행동 없음
      result.push(networkTable[person1NetworkKey].length);
    }
  });

  console.log(result.join('\n'));
};

class InputManager {
  private _inputs: string[] = [];
  private _inputMax = 1;

  input(value: string) {
    if (this.isDone()) return;

    if (this._inputs.length <= 0) {
      this._inputs.push(value);
      this._inputMax += Number(value);
      return;
    }

    const isNumber = (num: number) => !Number.isNaN(num) && typeof num === 'number';
    const num = Number(value);

    if (isNumber(num)) {
      this._inputMax += num;
    }

    this._inputs.push(value);
  }

  isDone(): boolean {
    if (this._inputs.length < this._inputMax) return false;
    return true;
  }

  getTestCases(): string[][] {
    const testCases: string[][] = [];

    for (let i = 1; i < this._inputs.length; i += Number(this._inputs[i]) + 1) {
      const relations = this._inputs.slice(i + 1, i + 1 + Number(this._inputs[i]));
      testCases.push(relations);
    }

    return testCases;
  }
}

const inputManager = new InputManager();

rl.on('line', (input: string) => {
  inputManager.input(input);

  if (inputManager.isDone()) {
    inputManager.getTestCases().forEach((testCase) => {
      solution(testCase);
    });
    rl.close();
  }
});

rl.on('close', () => {
  process.exit();
});
