const input = require('fs')
  .readFileSync(process.platform === 'linux' ? '/dev/stdin' : 'input.txt')
  .toString()
  .trim()
  .split('\n');

/**
 * n, m 격자 정보
 * a, b 유닛 크기
 * k 장애물 설치 위치
 * 그 다음 마지막 줄 2개가 시작점, 도착점
 *
 * 사실 도착점과 끝점의 왼쪽 최상단 좌표를 줬기 때문에 굳이 유닛이나 도착점에 대한 처리를 미리 할 필요는 없고
 * 그냥 그 좌표에서 a, b 값만큼 장애물이 있는지 확인만 하면 될듯하네요..
 */
let idx = 0;
const [n, m, a, b, k] = input[idx++].split(' ').map(Number);

const map = Array.from({length: n}, () => Array(m).fill(0));

for (let i = 0; i < k; i++) {
  const [x, y] = input[idx++].split(' ').map(Number);

  map[x - 1][y - 1] = 1;
}

// 입력을 아주 더럽게 주시네요..
const [sr, sc] = input[idx++].split(' ').map(Number);
const [er, ec] = input[idx++].split(' ').map(Number);

const startX = sr - 1;
const startY = sc - 1;

const endX = er - 1;
const endY = ec - 1;

const dist = Array.from({length: n}, () => Array(m).fill(-1));

// 유닛의 기준점은 왼쪽 상단이니 이 유닛이 움직일 수 있는지 판단합시다.
function canMove(x, y) {
  /**
   * 예제 1을 생각해봅시다.
   * 맵의 크기가 5 * 5, 유닛의 크기가 2 * 2인데요..
   *
   * 현재 기준점이 만약 [3, 4]라고 생각해봅시다. 그럼 오른쪽 끝에 붙어있는 모양일텐데요..
   * 여기서 3 + 2 - 1은 6으로 5 * 5 크기인 맵을 벗어나게 됩니다.. 마찬가지로 [4, 3]일 때는 y가 벗어나고..
   *
   * a랑 b에 -1을 해주는 이유는 기준점도 크기에 포함이 되니까.. you know..?
   */
  if (x + a - 1 >= n || y + b - 1 >= m) return;

  for (let i = x; i < x + a; i++) {
    for (let j = y; j < y + b; j++) {
      // 장애물이면..
      if (map[i][j] === 1) return false;
    }
  }

  return true;
}

function bfs() {
  const queue = [[startX, startY]];
  dist[startX][startY] = 0;

  let head = 0;
  while (queue.length > head) {
    const [x, y] = queue[head++];

    // 만약 도착점에 도달했다면
    if (x === endX && y === endY) {
      return dist[x][y];
    }

    for (const [nx, ny] of [
      [x + 1, y],
      [x - 1, y],
      [x, y - 1],
      [x, y + 1],
    ]) {
      if (nx < 0 || nx >= n || ny < 0 || ny >= m) continue;
      if (dist[nx][ny] > -1) continue;

      if (canMove(nx, ny)) {
        dist[nx][ny] = dist[x][y] + 1;
        queue.push([nx, ny]);
      }
    }
  }

  return -1;
}

console.log(bfs());
