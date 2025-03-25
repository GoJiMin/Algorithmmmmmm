const input = require('fs')
  .readFileSync(process.platform === 'linux' ? '/dev/stdin' : 'input.txt')
  .toString()
  .trim()
  .split('\n');

const [K, S, N] = input[0].trim().split(' ');

const rowTable = {
  A: 0,
  B: 1,
  C: 2,
  D: 3,
  E: 4,
  F: 5,
  G: 6,
  H: 7,
};

const colTable = {
  1: 7,
  2: 6,
  3: 5,
  4: 4,
  5: 3,
  6: 2,
  7: 1,
  8: 0,
};

const directions = {
  R: [0, 1],
  L: [0, -1],
  B: [1, 0],
  T: [-1, 0],
  RT: [-1, 1],
  LT: [-1, -1],
  RB: [1, 1],
  LB: [1, -1],
};

const [K_row, K_col] = K.split('');
const [S_row, S_col] = S.split('');

let K_loc = [colTable[K_col], rowTable[K_row]];
let S_loc = [colTable[S_col], rowTable[S_row]];

function isMovable(x, y) {
  if (x < 0 || x > 7 || y < 0 || y > 7) return false;

  return true;
}

for (let i = 1; i <= N; i++) {
  const mv = input[i].trim();

  const [k_x, k_y] = K_loc;
  const [s_x, s_y] = S_loc;

  const [dx, dy] = directions[mv];

  const nx_k = k_x + dx;
  const ny_k = k_y + dy;

  // 킹이 움직인 위치가 체스판 바깥이라면 건너뜀
  if (!isMovable(nx_k, ny_k)) continue;
  // 만약 킹이 움직인 위치에 돌이 있을 경우
  if (nx_k === s_x && ny_k === s_y) {
    const nx_s = s_x + dx;
    const ny_s = s_y + dy;

    // 돌을 같은 방향으로 움직일 건데 체스판 밖으로 나가면 그 이동은 건너뜀.
    if (!isMovable(nx_s, ny_s)) continue;

    K_loc = [nx_k, ny_k];
    S_loc = [nx_s, ny_s];
  } else {
    K_loc = [nx_k, ny_k];
  }
}

const convertRow = {
  7: 1,
  6: 2,
  5: 3,
  4: 4,
  3: 5,
  2: 6,
  1: 7,
  0: 8,
};

const convertCol = {
  0: 'A',
  1: 'B',
  2: 'C',
  3: 'D',
  4: 'E',
  5: 'F',
  6: 'G',
  7: 'H',
};

const resultK = `${convertCol[K_loc[1]]}${convertRow[K_loc[0]]}`;
const resultS = `${convertCol[S_loc[1]]}${convertRow[S_loc[0]]}`;

console.log(resultK + '\n' + resultS);
