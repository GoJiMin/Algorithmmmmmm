const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "input.txt")
  .toString()
  .trim();

const n = Number(input);

const map = Array.from(Array(+n), () => Array(+n).fill("*"));

function addPad(r, c, n) {
  const div = n / 3;
  const ny = r + div;
  const nx = c + div;

  for (let i = 0; i < div; i++) {
    for (let j = 0; j < div; j++) {
      map[ny + i][nx + j] = " ";
    }
  }
}

function solution(r, c, n) {
  if (n === 1) {
    return;
  }

  addPad(r, c, n);
  const size = n / 3;

  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      solution(r + i * size, c + j * size, size);
    }
  }
}

solution(0, 0, +n);

for (let i = 0; i < map.length; i++) {
  console.log(map[i].join(""));
}
