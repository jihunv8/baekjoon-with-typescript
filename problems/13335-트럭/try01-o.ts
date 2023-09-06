export {};

const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

class Bridge {
  private maximumLoad: number;
  private bridge: number[];
  private numOfExitedTrucks = 0;

  constructor(length: number, maximumLoad: number) {
    this.bridge = [];
    this.bridge.length = length;
    this.bridge.fill(0);

    this.maximumLoad = maximumLoad;
  }

  getNumOfExitedTrucks() {
    return this.numOfExitedTrucks;
  }

  private move(): void {
    const exiedTruck = this.bridge[0];
    if (exiedTruck > 0) this.numOfExitedTrucks++;

    for (let i = 0; i < this.bridge.length - 1; i++) {
      this.bridge[i] = this.bridge[i + 1];
    }
    this.bridge[this.bridge.length - 1] = 0;
  }

  private getCurrentLoad() {
    return this.bridge.reduce((result, truckInBridge) => result + truckInBridge, 0);
  }

  private canEnter(truck: number): boolean {
    const currentLoad = this.getCurrentLoad();
    const loadWhenEnter = currentLoad - this.bridge[0] + truck;
    const isLoadOk = loadWhenEnter <= this.maximumLoad;

    return isLoadOk;
  }

  private enter(truck: number): boolean {
    if (!this.canEnter(truck)) return false;
    this.move();
    this.bridge[this.bridge.length - 1] = truck;
    return true;
  }

  passOneTime(truck?: number): boolean {
    let isEntrySuccessful = false;

    if (truck !== undefined) {
      isEntrySuccessful = this.enter(truck);
    }

    if (!isEntrySuccessful) this.move();

    return isEntrySuccessful;
  }
}

const solution = (length: number, maximumLoad: number, trucks: number[]) => {
  const bridge = new Bridge(length, maximumLoad);

  let totalTime = 0;

  for (let i = 0; i < trucks.length; ) {
    const truck = trucks[i];
    const isEntrySuccessful = bridge.passOneTime(truck);
    totalTime++;
    if (isEntrySuccessful) i++;
  }

  while (bridge.getNumOfExitedTrucks() < trucks.length) {
    bridge.passOneTime();
    totalTime++;
  }

  console.log(totalTime);
};

const inputs: string[] = [];
rl.on('line', (input: string) => {
  inputs.push(input);

  if (inputs.length < 2) return;

  const [_, length, maximumLoad] = inputs[0].split(' ').map((el) => Number(el));
  const trucks = inputs[1].split(' ').map((el) => Number(el));

  solution(length, maximumLoad, trucks);

  rl.close();
});

rl.on('close', () => {
  process.exit();
});
