const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "script.txt")
  .toString()
  .trim()
  .split("\n")
  .map(Number);

const [n, ...arr] = input;
const stack = [];
let answer = 0;

for (let i = 0; i < n; i++) {
  while (stack.length !== 0 && stack.at(-1) <= arr[i]) {
    stack.pop();
  }

  answer += stack.length;
  stack.push(arr[i]);
}

console.log(answer);