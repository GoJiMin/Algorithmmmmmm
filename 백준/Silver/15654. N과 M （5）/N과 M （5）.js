const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "input.txt")
  .toString()
  .trim()
  .split("\n");

const [n, m] = input[0].split(" ").map(Number);
const nums = input[1].split(" ").sort((a, b) => a - b);

const isUsed = Array(n).fill(0);

const arr = [];

let result = "";

function solution(k) {
  if (k === m) return (result += arr.join(" ") + "\n");

  for (let i = 0; i < n; i++) {
    if (!isUsed[i]) {
      arr[k] = nums[i];
      isUsed[i] = 1;
      solution(k + 1);
      isUsed[i] = 0;
    }
  }
}

solution(0);

console.log(result);
