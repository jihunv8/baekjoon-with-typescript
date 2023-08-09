export {};
//키로거

const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

class ListNode {
  value: string;
  next: ListNode | undefined;
  prev: ListNode | undefined;

  constructor(value: string, prev?: ListNode, next?: ListNode) {
    this.value = value;
    this.prev = prev;
    this.next = next;
  }
}

class KeyLogParser {
  private head: ListNode | undefined;
  private cursor: ListNode | undefined;

  private add(value: string) {
    const newNode = new ListNode(value);

    if (this.head === undefined) {
      this.head = newNode;
      this.cursor = this.head;
      return;
    }

    if (this.cursor === undefined) {
      newNode.next = this.head;
      this.head.prev = newNode;

      this.head = newNode;
      this.cursor = newNode;
      return;
    }

    newNode.prev = this.cursor;
    newNode.next = this.cursor.next;
    if (this.cursor.next !== undefined) {
      this.cursor.next.prev = newNode;
    }
    this.cursor.next = newNode;
    this.cursor = newNode;
  }

  private remove() {
    if (this.cursor === undefined) return;
    const prev = this.cursor.prev;

    if (prev === undefined) {
      this.head = this.cursor.next;
      if (this.head !== undefined) {
        this.head.prev = undefined;
      }
    } else {
      prev.next = this.cursor.next;
      if (this.cursor.next !== undefined) {
        this.cursor.next.prev = prev;
      }
    }

    this.cursor = prev;
  }

  /** 커서를 오른쪽으로 이동합니다. */
  private next() {
    //head가 undefined가 아니고 cursor는 undefined라면 cursor는 가장 왼쪽에 위치함을 의미
    if (this.head !== undefined && this.cursor === undefined) {
      this.cursor = this.head;
      return;
    }

    if (this.cursor === undefined || this.cursor.next === undefined) return;

    this.cursor = this.cursor.next;
  }

  /** 커서를 왼쪽으로 이동합니다. */
  private prev() {
    //this.cursor가 undefined라면 커서가 가장 왼쪽에 있거나 head가 비어있음을 의미
    if (this.cursor === undefined) return;
    this.cursor = this.cursor.prev;
  }

  private getPassword(): string {
    let password = '';

    let current = this.head;

    while (current !== undefined) {
      password += current.value;
      current = current.next;
    }

    return password;
  }

  parse(keyLog: string) {
    for (let i = 0; i < keyLog.length; i++) {
      const key = keyLog[i];
      switch (key) {
        case '<':
          this.prev();
          break;
        case '>':
          this.next();
          break;
        case '-':
          this.remove();
          break;
        default:
          this.add(key);
      }
      // console.log('key: ' + key);
      // console.log('password: ' + this.getPassword());
      // console.log('cursor: ' + this.cursor?.value);
      // console.log();
    }
    return this.getPassword();
  }
}

const solution = (keyLog: string): string => {
  const keyLogParser = new KeyLogParser();
  return keyLogParser.parse(keyLog);
};

let caseLength = -1;
const caseList: string[] = [];

rl.on('line', (input: string) => {
  if (caseLength === -1) {
    caseLength = Number(input);
    if (caseLength === 0) {
      rl.close();
    }
    return;
  }

  caseList.push(input);
  if (caseList.length >= caseLength) {
    caseList.forEach((c) => {
      console.log(solution(c));
    });

    rl.close();
  }
});

rl.on('close', () => {
  process.exit();
});

// test case

// <<BP<A>>Cd-     -> BAPC
// BC<<D>E>>>FG    -> DBECFG
// A>BD>><<<G--H   -> HABD
// ABC<-><-        -> C
// A<B><C          -> BCA
// AB<C><D         -> ACDB
