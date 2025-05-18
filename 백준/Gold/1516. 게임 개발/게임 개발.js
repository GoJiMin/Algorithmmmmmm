const input = require('fs')
  .readFileSync(process.platform === 'linux' ? '/dev/stdin' : 'input.txt')
  .toString()
  .trim()
  .split('\n');

const n = Number(input[0]);
const adj = Array.from({length: n + 1}, () => []);
const w = Array(n + 1);

for (let i = 1; i <= n; i++) {
  const line = input[i].split(' ').map(Number);

  // i번째 건물을 짓는데 걸리는 시간
  w[i] = line[0];

  // i번째 건물을 짓기 위해 선행되어야 하는 건물..
  for (let j = 1; j < line.length - 1; j++) {
    adj[i].push(line[j]);
  }
}

const dp = Array(n).fill(-1);
function dfs(v) {
  // 해당 노드에 대한 계산 값이 있다면 바로 리턴..
  if (dp[v - 1] !== -1) return dp[v - 1];

  // 선행 건물이 없다면 건설 시간 그자체로 종료..
  if (adj[v].length === 0) {
    dp[v - 1] = w[v];

    return dp[v - 1];
  }

  let maxPre = 0;
  for (const nxt of adj[v]) maxPre = Math.max(maxPre, dfs(nxt));

  dp[v - 1] = w[v] + maxPre;

  return dp[v - 1];
}

for (let i = 1; i <= n; i++) {
  if (dp[i - 1] === -1) dfs(i);
}

console.log(dp.join('\n'));
