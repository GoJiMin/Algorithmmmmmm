const input = require('fs')
  .readFileSync(process.platform === 'linux' ? '/dev/stdin' : 'input.txt')
  .toString()
  .trim()
  .split('\n');

/**
 * 문제에서 무엇을 요구하고 있을까요..
 *
 * 처음에 피어의 좌표가 s개만큼 주어집니다..
 * 이 최초 피어는 한 칸으로, 1 사이클마다 좌표를 기준으로 한 바뀌를 둘러 더 밝은 색을 칠한다고 합니다..
 *
 * 사이클마다 결국
 * 0 0 0      2 2 2
 * 0 1 0  =>  2 1 2
 * 0 0 0      2 2 2
 * 이렇게 변한다는 건데요..
 *
 * 추가로 겹치는 부분이 있으면 밝은 색을 칠하지 않고 그냥 더 어두운 색을 칠한다고 합니다.
 * 근데 사진 보니까 더 어두운 색이라는게 결국 그 사이클의 색이라는 거 같네요.
 *
 * 근데 그러면 그냥 bfs로 좌표 돌리면 그만 아닌가? bfs 돌려서
 * 거리 배열 업데이트했을 때 제일 큰 수가 결국 나올 수 있는 색조의 수일텐데..
 */

let idx = 0;
const result = [];
while (true) {
  const line = input[idx++].trim();
  if (line === '') continue;

  const [n, m, s] = line.split(' ').map(Number);

  if (n === 0 && m === 0 && s === 0) {
    break;
  }

  const map = Array.from({length: n}, () => Array(m).fill(0));
  const queue = [];

  for (let i = 0; i < s; i++) {
    const [x, y] = input[idx++].split(' ').map(Number);

    map[x - 1][y - 1] = 1;

    queue.push([x - 1, y - 1]);
  }

  // 어차피 해당 좌표에서 들어가서 bfs가 돌았으면 이전 색상보단 큰 값을 주위에 두르게 됨..
  let head = 0;
  while (queue.length > head) {
    const [x, y] = queue[head++];

    for (const [nx, ny] of [
      [x + 1, y],
      [x - 1, y],
      [x, y + 1],
      [x, y - 1],
      [x + 1, y + 1],
      [x + 1, y - 1],
      [x - 1, y - 1],
      [x - 1, y + 1],
    ]) {
      if (nx < 0 || nx >= n || ny < 0 || ny >= m) continue;
      if (map[nx][ny] > 0) continue;

      map[nx][ny] = map[x][y] + 1;
      queue.push([nx, ny]);
    }
  }

  let max = -1;
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < m; j++) {
      max = Math.max(map[i][j], max);
    }
  }

  result.push(max);
}

console.log(result.join('\n'));
