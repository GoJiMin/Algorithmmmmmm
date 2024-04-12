const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "script.txt")
  .toString()
  .trim()
  .split("\n")
  .map((el) => el.trim());

class Arr {
  constructor() {
    this.arr = [];
    this.length = 0;
    this.isReverse = false;
    this.err = false;
  }

  size() {
    return this.arr.length;
  }

  push(data) {
    this.arr.push(data);
    this.length++;
  }

  pop() {
    if (this.isReverse) {
      this.arr.pop();
    } else {
      this.arr.shift();
    }

    this.length--;
  }

  reverse() {
    this.isReverse = !this.isReverse;
  }

  result() {
    if (this.isReverse) {
      this.swap();

      return this.arr;
    }

    return this.arr;
  }

  error() {
    this.err = true;
  }

  isError() {
    return this.err;
  }

  swap() {
    const len = this.size();
    const middle = len >> 1;

    for (let i = 0; i < middle; i++) {
      const upper = len - 1 - i;
      const upperVal = this.arr[upper];
      const lowerVal = this.arr[i];

      this.arr[upper] = lowerVal;
      this.arr[i] = upperVal;
    }
  }
}

const [_, ...commands] = input;
const result = [];

for (let i = 0; i < commands.length; i += 3) {
  const command = commands[i].split("");
  const n = commands[i + 1];
  const arr = JSON.parse(commands[i + 2]);

  const queue = new Arr();

  for (let i = 0; i < n; i++) {
    queue.push(Number(arr[i]));
  }

  for (let i = 0; i < command.length; i++) {
    if (command[i] === "R") {
      queue.reverse();
    }

    if (command[i] === "D") {
      if (queue.size() === 0) {
        queue.error();
        break;
      } else {
        queue.pop();
      }
    }
  }

  if (queue.isError()) {
    result.push("error");
  } else {
    result.push(JSON.stringify(queue.result()));
  }
}

console.log(result.join("\n"));