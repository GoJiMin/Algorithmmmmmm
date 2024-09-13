const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "input.txt")
  .toString()
  .trim();

const [n, m] = input.split(" ").map(Number);

const arr = [];

let result = "";

function solution(k, idx) {
  if (k === m) return (result += arr.join(" ") + "\n");

  for (let i = idx; i <= n; i++) {
    arr[k] = i;
    solution(k + 1, i);
  }
}

solution(0, 1);

console.log(result);
