const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "input.txt")
  .toString()
  .trim()
  .split("\n");

/**
 * 격자의 행과 열은 1번부터 N번까지 번호가 매겨져 있고, 1번 행은 N번과 연결되어 있고, 1번 열은 N번 열과 연결되어 있다.
 * 이 말이 곧 원형 상태로 모두 이어져있다는 의미인데요..
 *
 * 모듈러 연산으로 다시 되돌아오게 만들면 되겠죠..?
 *
 * r, c가 있을 때, r + x가 n보다 커지면 모듈러 n 연산을 해주면 다시 돌아갈 겁니다. 만약 격자가 3 * 3 크기일 때,
 * 0 0 0
 * 0 0 0
 * 0 0 0
 * 이렇게 구성이 되겠죠? (2, 2) 위치에서 (1, 1)만큼 이동하면, ((2 + 1) % 3, (2 + 1) % 3) => (0, 0) 위치로 이동하죠?
 * 그럼 반대로 (2, 2) 위치에서 (1, 0)만큼 이동하면 ((2 + 1) % 3, 2) => (0, 2) 그쵸??
 * 그럼 (0, 0) 위치에서 (1, 1)만큼 이동하면요? ((0 + 1) % 3, (0 + 1) % 3) => (1, 1) 잘 이동하죠?
 *
 * 다음으로 0부터 7까지 이동 범위를 미리 다 구해놔야겠어요. 상, 하, 좌, 우와 각 대각 행동도 미리 구해놓으면 좋겠죠?
 */

const [n, m, k] = input[0].split(" ").map(Number);

// 격자의 위치에 파이어볼이 2개 이상 들어올 수 있으니, 동적 배열로 만들어야할듯?
let board = Array.from({ length: n }, () =>
  Array.from({ length: n }, () => [])
);

let fireBalls = [];

for (let i = 1; i <= m; i++) {
  const [r, c, m, s, d] = input[i].split(" ").map(Number);

  board[r - 1][c - 1].push([m, s, d]);
  fireBalls.push([r - 1, c - 1]); // 이 위치에 볼이 있다.
}

// 방향
const directions = {
  0: [-1, 0], // 상
  1: [-1, 1], // 우상
  2: [0, 1], // 우
  3: [1, 1], // 우하
  4: [1, 0], // 하
  5: [1, -1], // 좌하
  6: [0, -1], // 좌
  7: [-1, -1], // 좌상
};

// 속력만큼 해당 방향으로 움직이기 - 모듈러로 원형 처리
function move(r, c, dir, s) {
  const [nx, ny] = directions[dir];

  const new_X = (r + ((nx * s) % n) + n) % n;
  const new_Y = (c + ((ny * s) % n) + n) % n;

  return [new_X % n, new_Y % n];
}

// 일단 한 턴에 모두 이동을 시켜놓고, 마지막에 이동한 지역들에 대해 파이어볼이 몇 개 있는지 확인해야할듯?
// k번 만큼 명령을 수행하니까..
for (let t = 0; t < k; t++) {
  // 파이어볼 배열 다 꺼내기
  while (fireBalls.length) {
    const [r, c] = fireBalls.shift();
    const [m, s, d] = board[r][c].shift();

    const [movedR, movedC] = move(r, c, d, s);

    board[movedR][movedC].push([m, s, d]);
  }

  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      if (board[i][j].length === 1) {
        fireBalls.push([i, j]);
        continue;
      } else if (board[i][j].length > 1) {
        // 볼이 2개 이상 있다면..
        let isOdd = false;
        let isEven = false;

        const size = board[i][j].length;
        let sumMass = 0;
        let sumSpeed = 0;

        while (board[i][j].length) {
          const [m, s, d] = board[i][j].shift();

          if (d % 2 === 1) isOdd = true;
          else isEven = true;

          sumMass += m;
          sumSpeed += s;
        }

        const splittedM = Math.floor(sumMass / 5);
        const newSpeed = Math.floor(sumSpeed / size);

        // 질량이 0이라면 소멸되니까..
        if (splittedM > 0) {
          for (const newDir of isOdd !== isEven ? [0, 2, 4, 6] : [1, 3, 5, 7]) {
            board[i][j].push([splittedM, newSpeed, newDir]);
            fireBalls.push([i, j]);
          }
        }
      }
    }
  }
}

let sum = 0;
for (let i = 0; i < fireBalls.length; i++) {
  const [x, y] = fireBalls[i];

  while (board[x][y].length) {
    const [m, s, d] = board[x][y].pop();

    sum += m;
  }
}

console.log(sum);
