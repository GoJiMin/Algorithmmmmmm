const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "input.txt")
  .toString()
  .trim()
  .split("\n");

const [n, ...arr] = input;
const boards = arr.map((el) => el.trim().split(" "));

const result = [0, 0];

function check(r, c, n) {
  const start = boards[r][c];

  for (let i = r; i < r + n; i++) {
    for (let j = c; j < c + n; j++) {
      if (start !== boards[i][j]) return false;
    }
  }

  return true;
}

function solution(r, c, n) {
  if (check(r, c, n)) {
    result[Number(boards[r][c])]++;
    return;
  }

  const size = n / 2;

  for (let i = 0; i < 2; i++) {
    for (let j = 0; j < 2; j++) {
      solution(r + i * size, c + j * size, size);
    }
  }
}

solution(0, 0, +n);

console.log(result.join("\n"));
