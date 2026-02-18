const input = require('fs')
  .readFileSync(process.platform === 'linux' ? '/dev/stdin' : 'input.txt')
  .toString()
  .trim()
  .split('\n');

const [r, c] = input[0].split(' ').map(Number);
const graph = [];

for (let i = 1; i <= r; i++) graph.push(input[i].trim().split(''));

const dirs = [
  [0, 1],
  [0, -1],
  [1, 0],
  [-1, 0],
];
const vis = Array.from({length: r}, () => Array(c).fill(false));

let cntK = 0;
let cntV = 0;

for (let i = 0; i < r; i++) {
  for (let j = 0; j < c; j++) {
    if (vis[i][j] || graph[i][j] === '#') continue;

    const count = {
      k: 0,
      v: 0,
    };

    if (graph[i][j] !== '.') count[graph[i][j]]++;

    const queue = [[i, j]];
    vis[i][j] = true;

    let head = 0;
    while (head < queue.length) {
      const [x, y] = queue[head++];

      for (const [dx, dy] of dirs) {
        const nx = x + dx;
        const ny = y + dy;

        if (nx < 0 || nx >= r || ny < 0 || ny >= c || vis[nx][ny]) continue;

        const nxtP = graph[nx][ny];

        if (nxtP === '#') continue;
        if (nxtP !== '.') count[nxtP]++;

        queue.push([nx, ny]);
        vis[nx][ny] = true;
      }
    }

    if (count.v < count.k) {
      cntK += count.k;
    } else {
      cntV += count.v;
    }
  }
}

console.log(cntK, cntV);
