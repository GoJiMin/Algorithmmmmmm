const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "input.txt")
  .toString()
  .trim()
  .split("\n");

const n = Number(input[0]);

const arr = input[1].split(" ").map(Number);

const dp = Array(n);

for (let i = 0; i < n; i++) {
  dp[i] = arr[i];

  for (let j = 0; j < i; j++) {
    if (arr[i] > arr[j]) dp[i] = Math.max(dp[i], dp[j] + arr[i]);
  }
}

console.log(Math.max(...dp));
