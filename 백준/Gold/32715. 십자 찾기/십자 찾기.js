const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "input.txt")
  .toString()
  .trim()
  .split("\n");

const [n, m] = input[0].split(" ").map(Number);
const k = Number(input[1]);
const board = [];
for (let i = 2; i < 2 + n; i++) {
  board.push(input[i].split(" ").map(Number));
}

const up = Array.from({ length: n }, () => Array(m).fill(0));
const down = Array.from({ length: n }, () => Array(m).fill(0));
const left = Array.from({ length: n }, () => Array(m).fill(0));
const right = Array.from({ length: n }, () => Array(m).fill(0));

for (let i = 0; i < n; i++) {
  for (let j = 0; j < m; j++) {
    if (board[i][j] === 1) {
      up[i][j] = i > 0 ? up[i - 1][j] + 1 : 1;
      left[i][j] = j > 0 ? left[i][j - 1] + 1 : 1;
    }
  }
}

for (let i = n - 1; i >= 0; i--) {
  for (let j = m - 1; j >= 0; j--) {
    if (board[i][j] === 1) {
      down[i][j] = i < n - 1 ? down[i + 1][j] + 1 : 1;
      right[i][j] = j < m - 1 ? right[i][j + 1] + 1 : 1;
    }
  }
}

let count = 0;
for (let i = 0; i < n; i++) {
  for (let j = 0; j < m; j++) {
    if (up[i][j] > k && down[i][j] > k && left[i][j] > k && right[i][j] > k) {
      count++;
    }
  }
}

console.log(count);
