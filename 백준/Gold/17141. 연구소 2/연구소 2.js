const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "input.txt")
  .toString()
  .trim()
  .split("\n");

/**
 * 바이러스가 퍼지는 최단 속도가 얼마인지 구해라..
 *
 * 0은 바이러스가 퍼질 수 있는..
 * 1은 벽..
 * 2는 바이러스를 놓을 수 있는..
 *
 * 바이러스는 인접한 영역으로 1만큼 동시에 퍼진다..
 */

const [n, m] = input[0].split(" ").map(Number);

const map = [];
for (let i = 1; i <= n; i++) map.push(input[i].trim().split(" "));

// 바이러스 먼저 배열에 넣어놓고 bfs?
const viruses = [];
for (let i = 0; i < n; i++) {
  for (let j = 0; j < n; j++) {
    if (map[i][j] === "2") viruses.push([i, j]);
  }
}

/**
 * 이렇게 하면 바이러스의 좌표는 모두 한 배열에 담기게 됨.
 *
 * 근데 문제는 이 바이러스 좌표들로부터 m개씩 놓을 수 있는 모든 경우의 수를 찾아낼 수 있어야 함.
 *
 * 예를 들자면, O A D F가 있을 때 2개씩 고른다면 4C2.. nCr = n!/r!(n-r)! = 4!/2!(4-2)! = 24/4 = 6
 * OA, OD, OF, AD, AF, DF 이렇게 6개..
 *
 * 그럼 지금 예제 1의 경우 viruses.len C 3이니까 5C3 = 5!/3!(5-3)! = 120/12 = 10
 *
 * 10개의 조합수가 나와야 함.. 뭐 이론은 그렇다 치고 이거 조합은 그냥 백트래킹으로 간단히 구할 수 있을듯?
 */

const comb = [];
const arr = [];
function bt(k, idx) {
  if (k === m) {
    comb.push([...arr]);

    return;
  }

  for (let i = idx; i < viruses.length; i++) {
    arr[k] = viruses[i];
    bt(k + 1, i + 1);
  }
}

bt(0, 0); // 여기서 그럼 m개만큼 바이러스를 놓을 수 있는 모든 경우의 수가 담긴다.

const dirs = [
  [1, 0],
  [-1, 0],
  [0, -1],
  [0, 1],
];

let min = Infinity;
for (let c = 0; c < comb.length; c++) {
  const dist = Array.from({ length: n }, () => Array(n).fill(-1));

  const queue = [];
  let head = 0;

  for (let i = 0; i < m; i++) {
    const [x, y] = comb[c][i];

    queue.push([x, y]);
    dist[x][y] = 0;
  }

  while (queue.length > head) {
    const [x, y] = queue[head++];

    for (const [dx, dy] of dirs) {
      const nx = x + dx;
      const ny = y + dy;

      if (nx < 0 || nx >= n || ny < 0 || ny >= n) continue;
      if (map[nx][ny] === "1" || dist[nx][ny] !== -1) continue;

      dist[nx][ny] = dist[x][y] + 1;
      queue.push([nx, ny]);
    }
  }

  let max = 0;
  let isBreaked = false;
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      if (map[i][j] === "1") continue;
      if (dist[i][j] === -1) {
        isBreaked = true;
        break;
      }

      max = Math.max(max, dist[i][j]);
    }
  }

  // 벽을 만났었다면 min을 업데이트하지 않음.
  if (isBreaked) continue;

  min = Math.min(min, max);
}

// 그럼 결국 한 번도 성공하지 못한 케이스에선 -1이 출력.
if (min === Infinity) {
  console.log(-1);
} else {
  console.log(min);
}
