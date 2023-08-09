export {};
//BFS 사용

const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

interface Graph {
  nodes: { [key: string]: string[] };
  addNode: (value: string) => void;
  addEdge: (from: string, to: string) => void;
}

class FriendsNetwork implements Graph {
  nodes: { [key: string]: string[] } = {};

  addNode(value: string) {
    if (this.nodes[value] !== undefined) return;
    this.nodes[value] = [];
  }

  addEdge(from: string, to: string) {
    const fromNode = this.nodes[from];
    const toNode = this.nodes[to];

    if (fromNode !== undefined && fromNode.includes(to) === false) {
      fromNode.push(to);
    }

    if (toNode !== undefined && toNode.includes(from) === false) {
      toNode.push(from);
    }
  }

  calcNetwork(person: string) {
    const visits: string[] = [];
    const queue: string[] = [person];

    while (queue.length > 0) {
      const visit = queue.shift();
      if (visit === undefined) throw new Error('queue.length가 0보다 큰 상황에 undefined가 반환됨.');
      visits.push(visit);

      const node = this.nodes[visit];
      node.forEach((value) => {
        if (visits.includes(value)) return;
        queue.push(value);
      });
    }

    return visits.length;
  }
}

const solution = (relationCases: string[][]) => {
  let result = '';

  relationCases.forEach((relations) => {
    const friendsNetwork = new FriendsNetwork();

    relations.forEach((relation) => {
      const [from, to] = relation.split(' ');

      friendsNetwork.addNode(from);
      friendsNetwork.addNode(to);
      friendsNetwork.addEdge(from, to);
      result += String(friendsNetwork.calcNetwork(from)) + '\n';
    });
  });

  console.log(result);
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
    const relationCases: string[][] = [];

    for (let i = 1; i < this._inputs.length; i += Number(this._inputs[i]) + 1) {
      const relations = this._inputs.slice(i + 1, i + 1 + Number(this._inputs[i]));
      relationCases.push(relations);
    }

    return relationCases;
  }
}

const inputManager = new InputManager();

rl.on('line', (input: string) => {
  inputManager.input(input);

  if (inputManager.isDone()) {
    solution(inputManager.getTestCases());
    rl.close();
  }
});

rl.on('close', () => {
  process.exit();
});
