const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "input.txt")
  .toString()
  .trim()
  .split("\n");

const [nmk, ...arr] = input;

const [n, m, k] = nmk.split(" ").map(Number);

const boards = Array.from(Array(n), () => Array(m).fill(0));

// 회전 함수
function rotate(r, c, curBoards) {
  const rotated = Array.from(Array(c), () => Array(r).fill(0));
  const tmp = [r, c];

  for (let i = 0; i < r; i++) {
    for (let j = 0; j < c; j++) {
      rotated[j][r - 1 - i] = curBoards[i][j];
    }
  }

  return [tmp[1], tmp[0], rotated];
}

for (let i = 0; i < k; i++) {
  let [r, c] = arr.shift().split(" ").map(Number);

  let sticker = arr.splice(0, r).map((el) => el.trim().split(" "));

  // 해당 위치로부터 스티커를 붙일 수 있는지.
  function pastable(x, y) {
    for (let i = 0; i < r; i++) {
      for (let j = 0; j < c; j++) {
        if (boards[x + i][y + j] === 1 && sticker[i][j] === "1") return false;
      }
    }

    for (let i = 0; i < r; i++) {
      for (let j = 0; j < c; j++) {
        if (sticker[i][j] === "1") boards[x + i][y + j] = 1;
      }
    }

    return true;
  }

  for (let rot = 0; rot < 4; rot++) {
    let is_paste = false;
    for (let i = 0; i <= n - r; i++) {
      if (is_paste) break;
      for (let j = 0; j <= m - c; j++) {
        if (pastable(i, j)) {
          is_paste = true;
          break;
        }
      }
    }

    if (is_paste) break;
    [r, c, sticker] = rotate(r, c, sticker);
  }
}

let cnt = 0;

for (let i = 0; i < n; i++) {
  for (let j = 0; j < m; j++) {
    cnt += boards[i][j];
  }
}

console.log(cnt);
