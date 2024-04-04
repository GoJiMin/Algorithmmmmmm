const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "script.txt")
  .toString()
  .trim()
  .split("\n")
  .map(Number);

const [n, ...arr] = input;

const stack = [];
let answer = "";
let num = 1;

for (let i = 0; i < n; i++) {
  while (num <= arr[i]) {
    stack.push(num++);
    answer += "+\n";
  }

  const poped = stack.pop();
  if (poped !== arr[i]) {
    console.log("NO");
    return;
  }
  answer += "-\n";
}

console.log(answer);
