const input = require('fs')
  .readFileSync(process.platform === 'linux' ? '/dev/stdin' : 'input.txt')
  .toString()
  .trim()
  .split('\n');

const [r, c, k] = input[0].split(' ').map(Number);

const map = [];
for (let i = 1; i <= r; i++) map.push(input[i].trim().split(''));

const vis = Array.from({length: r}, () => Array(c).fill(false));
let ans = 0;

const dx = [-1, 1, 0, 0];
const dy = [0, 0, -1, 1];

function dfs(x, y, d) {
  // 집에 도착했는데 k만큼 걸었니?
  if (x === 0 && y === c - 1) {
    if (d === k) ans++;

    return;
  }

  // 집 도착도 못했는데 k 이상이면 볼 필요 없음
  if (d >= k) return;

  for (let dir = 0; dir < 4; dir++) {
    const nx = x + dx[dir];
    const ny = y + dy[dir];

    // 갈 수 있니?
    if (nx < 0 || nx >= r || ny < 0 || ny >= c || map[nx][ny] === 'T' || vis[nx][ny]) continue;

    // bt + dfs
    vis[nx][ny] = true;
    dfs(nx, ny, d + 1);
    vis[nx][ny] = false;
  }
}

vis[r - 1][0] = true;
dfs(r - 1, 0, 1);

console.log(ans);
