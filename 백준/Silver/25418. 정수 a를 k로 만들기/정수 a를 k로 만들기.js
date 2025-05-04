const input = require('fs')
  .readFileSync(process.platform === 'linux' ? '/dev/stdin' : 'input.txt')
  .toString()
  .trim();

const [A, K] = input.split(' ').map(Number);

const dist = Array(K + 1).fill(-1);
dist[A] = 0;

const queue = [A];

while (dist[K] === -1) {
  const cur = queue.shift();

  for (const nxt of [cur + 1, cur * 2]) {
    if (nxt < 0 || nxt > K) continue;
    if (dist[nxt] === -1) {
      queue.push(nxt);
      dist[nxt] = dist[cur] + 1;
    }
  }
}

console.log(dist[K]);
