const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "script.txt")
  .toString()
  .trim()
  .split("\n")
  .map((el) => el.trim());

const [N, M] = input[0].split(" ");
const [_, ...board] = input;

const board_B = [
  ["B", "W", "B", "W", "B", "W", "B", "W"],
  ["W", "B", "W", "B", "W", "B", "W", "B"],
  ["B", "W", "B", "W", "B", "W", "B", "W"],
  ["W", "B", "W", "B", "W", "B", "W", "B"],
  ["B", "W", "B", "W", "B", "W", "B", "W"],
  ["W", "B", "W", "B", "W", "B", "W", "B"],
  ["B", "W", "B", "W", "B", "W", "B", "W"],
  ["W", "B", "W", "B", "W", "B", "W", "B"],
];

let minChanges = 100000;

for (let startX = 0; startX < N - 7; startX++) {
  for (let startY = 0; startY < M - 7; startY++) {
    let cntB = 0;
    let cntW = 0;
    for (let x = 0; x < 8; x++) {
      for (let y = 0; y < 8; y++) {
        const cur = board[startX + x][startY + y];

        cur !== board_B[x][y] ? cntB++ : cntW++;
      }
    }

    minChanges = Math.min(minChanges, cntB, cntW);
  }
}

console.log(minChanges);
