export {};
/*
  network 배열 사용
  예시)
    시작 []
    a b  [[a, b]]                     새로운 network [a, b] 추가                   -> [a, b].length          = 2
    c d  [[a, b], [c, d]]             새로운 network [c, d] 추가                   -> [c, d].length          = 2
    e d  [[a, b], [c, d, e]]          기존 network [c, d]에 e 추가                 -> [c, d, e].length       = 3
    g f  [[a, b], [c, d, e], [g, f]]  새로운 network [g, f] 추가                   -> [g, f].length          = 2
    b c  [[a, b, c, d, e], [g, f]]    기존 network [a, b]와 [c, d, e] 병합         -> [a, b, c, d, e].length = 5
    a e  [[a, b, c, d, e], [g, f]]    a, e모두 같은 network이므로 아무것도 하지 않음 -> [a, b, c, d, e].length = 5

    반환 -> 2 2 3 2 5 5
*/

const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const solution = (logOfAddFriend: string[]) => {
  const result: number[] = [];

  const relationGroupList: string[][] = [];

  logOfAddFriend.forEach((log) => {
    const [person1, person2] = log.split(' ');
    const relationGroupWithPerson1 = relationGroupList.find((relationGroup) => relationGroup.includes(person1));
    const relationGroupWithPerson2 = relationGroupList.find((relationGroup) => relationGroup.includes(person2));

    //그룹 생성
    if (relationGroupWithPerson1 === undefined && relationGroupWithPerson2 === undefined) {
      const newRelationGroup = [person1, person2];
      relationGroupList.push(newRelationGroup);
      result.push(newRelationGroup.length);
      return;
    }

    //기존 그룹에 사람 추가
    if (relationGroupWithPerson1 !== undefined && relationGroupWithPerson2 === undefined) {
      relationGroupWithPerson1.push(person2);
      result.push(relationGroupWithPerson1.length);
      return;
    }

    if (relationGroupWithPerson1 === undefined && relationGroupWithPerson2 !== undefined) {
      relationGroupWithPerson2.push(person1);
      result.push(relationGroupWithPerson2.length);
      return;
    }

    //그룹 병합
    if (relationGroupWithPerson1 !== undefined && relationGroupWithPerson2 !== undefined) {
      if (relationGroupWithPerson1 !== relationGroupWithPerson2) {
        relationGroupList.splice(relationGroupList.indexOf(relationGroupWithPerson1), 1);
        relationGroupList.splice(relationGroupList.indexOf(relationGroupWithPerson2), 1);
        const mergedRelationGroup = [...relationGroupWithPerson1, ...relationGroupWithPerson2];
        relationGroupList.push();
        result.push(mergedRelationGroup.length);
        return;
      }
      result.push(relationGroupWithPerson1.length);
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
