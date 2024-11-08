const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "input.txt")
  .toString()
  .trim()
  .split("\n")
  .map(Number);

const [n, ...arr] = input;

const stack = [];

for (let i = 0; i < n; i++) {
  if (arr[i] === 0) {
    stack.pop();
  } else {
    stack.push(arr[i]);
  }
}

if (stack.length === 0) {
  console.log(0);
} else {
  console.log(stack.reduce((acc, cur) => acc + cur));
}
