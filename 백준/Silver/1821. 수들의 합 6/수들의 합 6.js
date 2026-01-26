const input = require('fs')
  .readFileSync(process.platform === 'linux' ? '/dev/stdin' : 'input.txt')
  .toString()
  .trim();

const [N, F] = input.split(' ').map(Number);

const arr = new Array(N).fill(0);
const isUsed = new Array(N + 1).fill(false);

const combi = new Array(N).fill(0);

function getCombi() {
  for (let i = 0; i < N; i++) {
    combi[i] = combination(N - 1, i);
  }
}

function combination(n, r) {
  if (r === 0 || r === n) return 1;

  let up = 1;
  let down = 1;
  for (let i = 0; i < r; i++) {
    up *= n - i;
    down *= i + 1;
  }
  return up / down;
}

getCombi();

function dfs(depth, currentSum) {
  if (depth === N) {
    if (currentSum === F) {
      console.log(arr.join(' '));
      process.exit(0);
    }
    return;
  }

  for (let i = 1; i <= N; i++) {
    if (isUsed[i]) continue;

    isUsed[i] = true;
    arr[depth] = i;

    dfs(depth + 1, currentSum + i * combi[depth]);

    isUsed[i] = false;
  }
}

dfs(0, 0);
