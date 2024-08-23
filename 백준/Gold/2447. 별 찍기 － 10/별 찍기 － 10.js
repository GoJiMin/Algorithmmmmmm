const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "input.txt")
  .toString()
  .trim();

const n = Number(input);
const boards = Array.from(Array(+n), () => Array(+n).fill("*"));

function swap(r, c, n) {
  if (n === 1) {
    return true;
  }

  const div = n / 3;

  for (let i = 0; i < div; i++) {
    for (let j = 0; j < div; j++) {
      boards[r + div + i][c + div + j] = " ";
    }
  }
}

function solution(r, c, n) {
  if (swap(r, c, n)) {
    return;
  }

  const size = n / 3;

  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      solution(r + i * size, c + j * size, size);
    }
  }
}

solution(0, 0, +n);

console.log(boards.join("\n").replaceAll(",", ""));
