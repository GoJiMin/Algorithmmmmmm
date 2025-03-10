const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "input.txt")
  .toString()
  .trim()
  .split("\n");

const t = Number(input[0]);
const cases = [];

for (let i = 1; i <= t; i++) cases.push(Number(input[i]));
const maxN = Math.max(...cases);

const dp = Array.from({ length: maxN + 1 }, () => [0, 0]);

dp[0] = [1, 0];
dp[1] = [0, 1];

// Bottom-Up..
for (let i = 2; i <= maxN; i++) {
  dp[i][0] = dp[i - 1][0] + dp[i - 2][0];
  dp[i][1] = dp[i - 1][1] + dp[i - 2][1];
}

const result = cases.map((n) => dp[n].join(" ")).join("\n");
console.log(result);
