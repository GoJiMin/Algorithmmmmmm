const input = require('fs')
  .readFileSync(process.platform === 'linux' ? '/dev/stdin' : 'input.txt')
  .toString()
  .trim();

/**
 * 그냥 BFS 문제인데 역추적이 필요한 문제 같네요..
 */

const [n, k] = input.split(' ').map(Number);
const MAX = 100_001;

const dist = Array(MAX).fill(-1);
const prev = Array(MAX).fill(-1); // 각 지점마다 이전 위치가 어딘지..

dist[n] = 0;
const queue = [n];

while (dist[k] === -1) {
  const cur = queue.shift();

  for (const nxt of [cur - 1, cur + 1, cur * 2]) {
    if (nxt < 0 || nxt >= MAX) continue;
    if (dist[nxt] !== -1) continue;

    dist[nxt] = dist[cur] + 1;
    prev[nxt] = cur;
    queue.push(nxt);
  }
}

const path = [];
// 역추적
for (let cur = k; cur !== -1; cur = prev[cur]) {
  path.push(cur);
}

console.log(dist[k] + '\n' + path.reverse().join(' '));
