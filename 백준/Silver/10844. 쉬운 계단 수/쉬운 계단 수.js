const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "input.txt")
  .toString()
  .trim();

/**
 * N = 1일 때, 계단 수는 9.
 * N = 2일 때, 계단 수는 각 자릿수의 차이가 1이어야 한다..
 * 1 => 10, 12
 * 2 => 21, 23
 * 3 => 32, 34
 * 4 => 43, 45
 * 5 => 54, 56
 * 6 => 65, 67
 * 7 => 78, 76
 * 8 => 87, 89
 * 9 => 98
 */

/**
 * dp[2][1] = 1 => 2의 자리수에서 마지막 자릿수가 1인 계단의 수는 1개이다.
 * 왜? 1의 자릿수가 0 혹은 2인 경우에만 마지막 자릿수가 1이 될 수 있기 때문임..
 *
 * 그럼 dp[2][2] = 2
 * 왜? 1의 자릿수가 1 혹은 3인 경우에만 마지막 자릿수가 2가 될 수 있기 때문임..
 * dp[i][j] = dp[i - 1][j - 1] + dp[i - 1][j + 1]
 *
 * 그럼 dp[2][0] = 1
 * 왜? 1의 자릿수가 1인 경우에만 마지막 자릿수가 0이 될 수 있기 때문임..
 * if(j === 0) dp[i][j] = dp[i - 1][1]
 *
 * 그럼 dp[2][9] = 1
 * 왜? 1의 자릿수가 8인 경우에만 마지막 자릿수가 9가 될 수 있기 때문임..
 * if(j === 9) dp[i][j] = dp[i - 1][8]
 *
 */

const n = Number(input);
const MOD = 1000000000;

const dp = Array.from({ length: n + 1 }, () => Array(10).fill(0));

// 길이가 1인 계단 수는 모두 1이다.
for (let i = 1; i <= 9; i++) {
  // 1의 자리에 0은 없다.
  dp[1][i] = 1;
}

for (let i = 2; i <= n; i++) {
  for (let j = 0; j <= 9; j++) {
    if (j === 0) {
      // 0이 되려면 이전 자릿수가 1이어야만 한다.
      dp[i][j] = dp[i - 1][1] % MOD;
    } else if (j === 9) {
      // 9가 되려면 이전 자릿수가 8이어야만 한다.
      dp[i][j] = dp[i - 1][8] % MOD;
    } else {
      // 그게 아니라면?
      dp[i][j] = (dp[i - 1][j - 1] + dp[i - 1][j + 1]) % MOD;
    }
  }
}

const result = dp[n].reduce((acc, cur) => (acc + cur) % MOD, 0);

console.log(result);
