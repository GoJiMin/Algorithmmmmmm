const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "input.txt")
  .toString()
  .trim()
  .split("\n");

const boards = input.map((el) => el.trim().split(" ").map(Number));

const max = [-1, [0, 0]];

for (let i = 0; i < 9; i++) {
  for (let j = 0; j < 9; j++) {
    if (boards[i][j] > max[0]) {
      max[0] = boards[i][j];
      max[1] = [i + 1, j + 1];
    }
  }
}

console.log(max[0]);
console.log(max[1].join(" "));
