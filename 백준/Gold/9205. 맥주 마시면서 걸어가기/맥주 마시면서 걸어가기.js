const input = require('fs')
  .readFileSync(process.platform === 'linux' ? '/dev/stdin' : 'input.txt')
  .toString()
  .trim()
  .split('\n');

/**
 * 맥주 한 박스.. 20병.. 한 병당 50m.. 한 번에 최대 1000m 이동 가능..
 *
 * 각 위치.. 집, 편의점, 페스티벌을 노드로 보기.. 1000m 이하면 이동 가능한 곳이니 간선으로 이어주기..
 *
 * 근데 t랑 n의 범위를 고려하면 완전탐색이 가능한 범위지 않나..?
 */

let idx = 0;

const T = Number(input[idx++]);
const result = [];

for (let t = 0; t < T; t++) {
  const n = Number(input[idx++]);

  const graph = Array.from({length: n + 2}, () => {
    const [x, y] = input[idx++].split(' ').map(Number);

    return {x, y};
  });

  const vis = Array(n + 2).fill(false);

  let head = 0;
  const queue = [0];

  while (head < queue.length) {
    const cur = queue[head++];

    for (let nxt = 0; nxt < n + 2; nxt++) {
      if (!vis[nxt]) {
        const dist = Math.abs(graph[cur].x - graph[nxt].x) + Math.abs(graph[cur].y - graph[nxt].y);

        if (dist <= 1000) {
          vis[nxt] = true;
          queue.push(nxt);
        }
      }
    }
  }

  result.push(vis[n + 1] ? 'happy' : 'sad');
}

console.log(result.join('\n'));
