const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "input.txt")
  .toString()
  .trim()
  .split("\n");

const n = Number(input[0]);
const arr = input[1].split(" ").map(Number);

const dp = Array.from({ length: n }, () => Array(n).fill(0));

// 길이가 1인 구간의 경우엔 모두 팰린드롬임.
for (let i = 0; i < n; i++) {
  dp[i][i] = 1;
}

// 길이가 2일 때, 인접한 수가 같다면 팰린드롬임.
for (let i = 0; i < n - 1; i++) {
  if (arr[i] === arr[i + 1]) dp[i][i + 1] = 1;
}

for (let length = 3; length <= n; length++) {
  for (let s = 0; s <= n - length; s++) {
    const e = s + length - 1;

    // 양 끝의 수가 같으며, 내부 구간이 이미 팰린드롬이라면 팰린드롬임.
    if (arr[s] === arr[e] && dp[s + 1][e - 1]) dp[s][e] = 1;
  }
}

const m = Number(input[2]);
const result = [];

for (let i = 3; i < 3 + m; i++) {
  const [s, e] = input[i].split(" ").map(Number);

  result.push(dp[s - 1][e - 1]);
}

console.log(result.join("\n"));
