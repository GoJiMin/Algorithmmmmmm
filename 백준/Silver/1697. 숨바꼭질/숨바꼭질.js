const input = require('fs')
  .readFileSync(process.platform === 'linux' ? '/dev/stdin' : 'input.txt')
  .toString()
  .trim();

const [n, k] = input.split(' ').map(Number);

/**
 * n은 수빈이가 위치한 지점..
 * k는 동생이 위치한 지점.. target..
 *
 * 수빈이가 움직일 수 있는 방법은 현재 위치 X일 때 x - 1, x + 1, x * 2..
 */

// 점의 최대값은 100_000..
const dist = Array(100_001).fill(-1);

const queue = [n];
dist[n] = 0;

let head = 0;
// K의 거리값이 변경된다면 종료..
while (dist[k] === -1) {
  const x = queue[head++];

  for (const nx of [x - 1, x + 1, x * 2]) {
    // 점의 범위를 벗어난다면 패스..
    if (nx < 0 || nx > 100_000) continue;
    if (dist[nx] === -1) {
      dist[nx] = dist[x] + 1;
      queue.push(nx);
    }
  }
}

console.log(dist[k]);
