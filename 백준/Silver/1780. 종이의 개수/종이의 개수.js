const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "input.txt")
  .toString()
  .trim()
  .split("\n");

const [n, ...arr] = input;
const paper = arr.map((el) => el.trim().split(" "));
const cnt = [0, 0, 0];

function check(x, y, n) {
  for (let i = x; i < x + n; i++) {
    for (let j = y; j < y + n; j++) {
      if (paper[x][y] !== paper[i][j]) return false;
    }
  }

  return true;
}

function solve(x, y, z) {
  if (check(x, y, z)) {
    cnt[Number(paper[x][y]) + 1] += 1;
    return;
  }

  let n = z / 3;

  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      solve(x + i * n, y + j * n, n);
    }
  }
}

solve(0, 0, +n);

console.log(cnt.join("\n"));
