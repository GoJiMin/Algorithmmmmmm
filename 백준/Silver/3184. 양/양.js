const input = require('fs')
  .readFileSync(process.platform === 'linux' ? '/dev/stdin' : 'input.txt')
  .toString()
  .trim()
  .split('\n');

/**
 * 문제를 보니 한 영역 내부에 양(o)과 늑대(v)를 카운트하고
 *
 * o <= v면 해당 영역은 늑대만 남고,
 * o > v면 해당 영역은 양만 남으면 되겠네요..
 */

const [n, m] = input[0].split(' ').map(Number);
const map = [];

for (let i = 1; i <= n; i++) {
  map.push(input[i].trim().split(''));
}

const vis = Array.from({length: n}, () => Array(m).fill(false));

const result = [0, 0]; // 양, 늑대

for (let i = 0; i < n; i++) {
  for (let j = 0; j < m; j++) {
    if (vis[i][j] || map[i][j] === '#') continue;

    const queue = [[i, j]];
    vis[i][j] = true;

    let o = 0;
    let v = 0;

    let head = 0;
    while (queue.length > head) {
      const [x, y] = queue[head++];

      if (map[x][y] === 'o') o++;
      else if (map[x][y] === 'v') v++;

      for (const [nx, ny] of [
        [x + 1, y],
        [x - 1, y],
        [x, y + 1],
        [x, y - 1],
      ]) {
        if (nx < 0 || nx >= n || ny < 0 || ny >= m) continue;
        if (map[nx][ny] === '#' || vis[nx][ny]) continue;

        queue.push([nx, ny]);
        vis[nx][ny] = true;
      }
    }

    if (o <= v) {
      result[1] += v;
    } else {
      result[0] += o;
    }
  }
}

console.log(result.join(' '));
