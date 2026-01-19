const input = require('fs')
  .readFileSync(process.platform === 'linux' ? '/dev/stdin' : 'input.txt')
  .toString()
  .trim()
  .split('\n');

/**
 * 징검다리의 개수가 10,000개 주어지고,
 *
 * 각 징검다리마다 배수만큼 점프를 뛸 수 있다.
 * 그럼 1이라면, 1의 배수인 10,000까지 모두 한 번에 뛰어넘을 수 있다.
 *
 * 각 징검다리마다 갈 수 있는 다리에 방문 표시를 위해 얼마만에 도착했는지 거리를 저장하고,
 * 도착 지점의 거리가 변경되면 종료하게 짜봅시다..
 *
 * 그런데 도착하지 못하는 경우도 있으니 모든 거리 배열을 다 업데이트하고 따로 break를 걸어줍시다..
 *
 * 제출했다가 틀렸는데.. 예제가 1개 뿐이라 좀 헷갈리네요.. 뒤로도 갈 수 있나?? 뒤로 가는 것도 해놓읍시다..
 */

const n = Number(input[0]);
const arr = input[1].split(' ').map(Number);
const [a, b] = input[2].split(' ').map(Number);

const dist = Array(n + 1).fill(-1);

const queue = [[a - 1, arr[a - 1]]];
dist[a - 1] = 0;

let head = 0;
while (queue.length > head) {
  const [pos, jump] = queue[head++];

  for (let i = 1; i < 10000; i++) {
    for (const next of [pos + i * jump, pos + i * jump * -1]) {
      if (next < 0 || next > n) continue;

      if (next === b - 1) {
        console.log(dist[pos] + 1);
        process.exit(0);
      }

      if (dist[next] === -1) {
        dist[next] = dist[pos] + 1;
        queue.push([next, arr[next]]);
      }
    }
  }
}

console.log(-1);
