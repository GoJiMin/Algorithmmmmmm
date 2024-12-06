const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "input.txt")
  .toString()
  .trim()
  .split("\n");

/**
 * 포도주는 3잔을 연속으로 마실 수 없다..
 *
 * 6 10 13 9 8 1
 * 6 10 9 8을 골라 33이 최대값.
 *
 * i번째 잔을 마시지 않을 수도 있다..
 * i번째 마시는 잔이 연속으로 1잔째일 수도 있다..
 * i번째 마시는 잔이 연속으로 2잔째일 수도 있다..
 *
 * dp[i] = max(dp[i - 1], dp[i - 2] + arr[i], dp[i - 3] + arr[i - 1] + arr[i])
 */

const arr = input.map(Number);

if (arr[0] === 1) {
  console.log(arr[1]); // 한 잔만 있으면..
  return;
}

const dp = Array(arr[0] + 1).fill(0);

dp[1] = arr[1];
dp[2] = arr[1] + arr[2];

for (let i = 3; i <= arr[0]; i++) {
  dp[i] = Math.max(
    dp[i - 1], // i번째 잔을 마시지 않는 경우.
    dp[i - 2] + arr[i], // i번째의 잔을 연속으로 1잔째 마시는 경우.
    dp[i - 3] + arr[i - 1] + arr[i] // i번째 잔을 연속으로 2잔째 마시는 경우.
  );
}

console.log(dp[arr[0]]);
