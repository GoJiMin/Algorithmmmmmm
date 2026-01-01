const input = require('fs')
  .readFileSync(process.platform === 'linux' ? '/dev/stdin' : 'input.txt')
  .toString()
  .trim()
  .split('\n');

/**
 * 익은 토마토(1)가 있다면 주위에 익지 않은 토마토(0)가 전염 당한다..!
 * 하지만 -1은 벽이기 때문에 갈 수 없다..!!
 *
 * 사짜 큐로 풀어버려
 */

const [m, n] = input[0].split(' ').map(Number);

const board = [];
for (let i = 1; i <= n; i++) board.push(input[i].trim().split(' '));

const dirs = [
  [1, 0],
  [-1, 0],
  [0, -1],
  [0, 1],
];

const dist = Array.from({length: n}, () => Array(m).fill(-1));

/**
 * 먼저 배열을 모두 순회해서 토마토의 좌표를 모두 큐에 넣어버립시다..
 *
 * 한 사이클마다 토마토들을 전염시켜야 하기 때문..! 큐는 FIFO잖아요? 먼저 들어간 토마토가 먼저 나옵니다.
 * 벽은 통과할 수 없기 때문에 벽에 대한 적절한 처리도 필요합니다.
 */

const queue = [];
for (let i = 0; i < n; i++) {
  for (let j = 0; j < m; j++) {
    if (board[i][j] === '-1') {
      dist[i][j] = 0; // 통과 못 하게 벽은 방문 표시해놓기..
    } else if (board[i][j] === '1') {
      queue.push([i, j]);
      dist[i][j] = 0;
    }
  }
}

let head = 0;
while (head !== queue.length) {
  const [x, y] = queue[head++];

  for (const [dx, dy] of dirs) {
    const nx = x + dx;
    const ny = y + dy;

    if (nx < 0 || nx >= n || ny < 0 || ny >= m) continue;
    if (dist[nx][ny] === -1) {
      queue.push([nx, ny]);
      dist[nx][ny] = dist[x][y] + 1;
    }
  }
}

/**
 * 다 돌렸으면 dist 배열에 토마토가 전염되는데 걸리는 거리가 모두 담겨있겠죠?
 *
 * 만약 벽에 가로막힌 토마토가 있다면 아래와 같이 나올 거 같은데용
 * -1 0 1
 * 0 1 1
 * 1 1 1
 *
 * 그럼 -1이 있다면 -1을 출력하고 그게 아니라면 최대값을 출력하면 되겠죠?
 */

let max = 0;
for (let i = 0; i < n; i++) {
  for (let j = 0; j < m; j++) {
    if (dist[i][j] === -1) {
      console.log(-1);
      process.exit(0); // 그냥 -1 출력하고 종료 시그널 보내버리죠
    } else {
      max = Math.max(dist[i][j], max);
    }
  }
}

/**
 * 아니 2중 for문을 2번이나 돌리다니!! 라고 생각한 당신!
 *
 * 대충 시간제한 1초면 1억번 정도 돌아가야 하는데, 지금 N과 M의 최대값이 1000이죵?
 * 1000000 * 2니까 대충 시간 복잡도는 문제 없습니다.
 */
console.log(max);
