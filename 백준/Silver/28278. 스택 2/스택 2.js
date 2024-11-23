const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "input.txt")
  .toString()
  .trim()
  .split("\n");

/**
  1 X: 정수 X를 스택에 넣는다. (1 ≤ X ≤ 100,000)
  2: 스택에 정수가 있다면 맨 위의 정수를 빼고 출력한다. 없다면 -1을 대신 출력한다.
  3: 스택에 들어있는 정수의 개수를 출력한다.
  4: 스택이 비어있으면 1, 아니면 0을 출력한다.
  5: 스택에 정수가 있다면 맨 위의 정수를 출력한다. 없다면 -1을 대신 출력한다.
 */

class MyStack {
  constructor() {
    this.stack = [];
    this.length = 0;
  }

  // 1
  push(num) {
    this.stack.push(num);
    this.length++;
  }

  // 2
  pop() {
    if (this.length === 0) return -1;

    this.length--;
    return this.stack.pop();
  }

  // 3
  getLength() {
    return this.length;
  }

  // 4
  empty() {
    return this.length === 0 ? 1 : 0;
  }

  // 5
  top() {
    if (this.length === 0) return -1;

    return this.stack[this.length - 1];
  }
}

const n = Number(input[0]);

const result = [];

const myStack = new MyStack();

function checkAction(action, num) {
  switch (action) {
    case "1":
      return myStack.push(num);
    case "2":
      return result.push(myStack.pop());
    case "3":
      return result.push(myStack.getLength());
    case "4":
      return result.push(myStack.empty());
    case "5":
      return result.push(myStack.top());
    default:
      throw "unknown action";
  }
}

for (let i = 1; i <= n; i++) {
  const [action, num] = input[i].trim().split(" ");

  checkAction(action, num);
}

console.log(result.join("\n"));
