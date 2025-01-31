const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "input.txt")
  .toString()
  .trim();

const n = Number(input);

const dp = Array(n + 1).fill(Infinity);

dp[0] = 0;

for (let i = 1; i <= n; i++) {
  if (i - 2 >= 0 && dp[i - 2] !== Infinity) {
    dp[i] = Math.min(dp[i], dp[i - 2] + 1);
  }

  if (i - 5 >= 0 && dp[i - 5] !== Infinity) {
    dp[i] = Math.min(dp[i], dp[i - 5] + 1);
  }
}

if (dp[n] === Infinity) {
  console.log(-1);
} else {
  console.log(dp[n]);
}
