const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "input.txt")
  .toString()
  .trim()
  .split("\n");

const [nm, ...arr] = input;

const [n, m] = nm.split(" ").map(Number);
const boards = arr.map((el) => el.trim().split(" ").map(Number));

const cctv = [];

// CCTV의 감시 방향으로 0번째 인덱스부터 90도로 회전함.
const dir = [
  [0, 1],
  [-1, 0],
  [0, -1],
  [1, 0],
];

let mn = 0;

// CCTV가 감시하는 방향으로 벽이 아니라면 모두 7로 바꿈.
function watch(x, y, i, newBoards) {
  i %= 4;

  while (1) {
    x += dir[i][0];
    y += dir[i][1];

    if (x < 0 || x >= n || y < 0 || y >= m || newBoards[x][y] === 6) return;
    if (newBoards[x][y] > 0 && newBoards[x][y] < 6) continue;

    newBoards[x][y] = 7;
  }
}

// CCTV를 배열에 넣음.
for (let i = 0; i < n; i++) {
  for (let j = 0; j < m; j++) {
    if (boards[i][j] > 0 && boards[i][j] < 6) cctv.push([i, j]);
    // 감시 이전의 사각지대.
    if (boards[i][j] === 0) mn++;
  }
}

for (let tmp = 0; tmp < 1 << (2 * cctv.length); tmp++) {
  // 매 반복문마다 새로운 board 사용 깊은 복사.
  const newBoards = boards.map((row) => [...row]);

  let brute = tmp;

  for (let i = 0; i < cctv.length; i++) {
    // 예제 3의 경우 모든 1번 카메라가 계속해서 같은 방향을 보는데 CCTV마다 보는 각도를 다르게 함.
    const cur = brute % 4;
    brute = Math.floor(brute / 4);

    const x = cctv[i][0];
    const y = cctv[i][1];

    if (boards[x][y] === 1) {
      watch(x, y, cur, newBoards);
    }

    if (boards[x][y] === 2) {
      watch(x, y, cur, newBoards);
      watch(x, y, cur + 2, newBoards);
    }

    if (boards[x][y] === 3) {
      watch(x, y, cur, newBoards);
      watch(x, y, cur + 3, newBoards);
    }

    if (boards[x][y] === 4) {
      watch(x, y, cur, newBoards);
      watch(x, y, cur + 2, newBoards);
      watch(x, y, cur + 3, newBoards);
    }

    if (boards[x][y] === 5) {
      watch(x, y, cur, newBoards);
      watch(x, y, cur + 1, newBoards);
      watch(x, y, cur + 2, newBoards);
      watch(x, y, cur + 3, newBoards);
    }

    let val = 0;

    newBoards.forEach((row) => {
      val += row.filter((n) => n === 0).length;
    });

    mn = Math.min(mn, val);
  }
}

console.log(mn);
