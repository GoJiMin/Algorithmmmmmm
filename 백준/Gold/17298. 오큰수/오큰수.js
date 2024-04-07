const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "script.txt")
  .toString()
  .trim()
  .split("\n");

const n = +input[0];
const arr = input[1].split(" ").map(Number);

const stack = [];
let answer = Array(n).fill(0);

for (let i = n - 1; i >= 0; i--) {
  while (stack.length > 0 && stack.at(-1) <= arr[i]) stack.pop();

  if (!stack.at(-1)) {
    answer[i] = -1;
  } else {
    answer[i] = stack.at(-1);
  }

  stack.push(arr[i]);
}

console.log(answer.join(" "));
