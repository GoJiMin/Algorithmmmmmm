const input = require('fs')
  .readFileSync(process.platform === 'linux' ? '/dev/stdin' : 'input.txt')
  .toString()
  .trim()
  .split('\n');

let idx = 0;
const t = Number(input[idx++]);

for (let test = 0; test < t; test++) {
  const n = Number(input[idx++]);
  const arr = input[idx++].split(' ').map(Number);

  // dp[i][j] => i번 index부터 j번 index 파일까지 합쳤을 때의 최소 비용
  const dp = Array.from({length: n}, () => Array(n).fill(0));
  const prefix = Array(n + 1).fill(0);

  for (let i = 0; i < n; i++) prefix[i + 1] = prefix[i] + arr[i];

  for (let len = 2; len <= n; len++) {
    for (let i = 0; i <= n - len; i++) {
      const j = i + len - 1;

      dp[i][j] = Number.MAX_SAFE_INTEGER;
      for (let k = i; k < j; k++) {
        const cost = dp[i][k] + dp[k + 1][j] + (prefix[j + 1] - prefix[i]);
        dp[i][j] = Math.min(dp[i][j], cost);
      }
    }
  }

  console.log(dp[0][n - 1]);
}
