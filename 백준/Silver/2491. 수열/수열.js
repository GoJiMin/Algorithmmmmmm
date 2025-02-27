const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "input.txt")
  .toString()
  .trim()
  .split("\n");

const n = Number(input[0]);
const arr = input[1].split(" ").map(Number);

if (n === 1) {
  console.log(1);
  process.exit();
}

// 결국 모든 수열은 자기 자신을 포함하기 때문에 1
let incLen = 1;
let decLen = 1;

let ans = 1;

for (let i = 1; i < n; i++) {
  if (arr[i] >= arr[i - 1]) incLen++;
  else incLen = 1;

  if (arr[i] <= arr[i - 1]) decLen++;
  else decLen = 1;

  ans = Math.max(ans, incLen, decLen);
}

console.log(ans);
