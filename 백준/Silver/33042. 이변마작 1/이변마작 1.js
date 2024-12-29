const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "input.txt")
  .toString()
  .trim()
  .split("\n");

const N = Number(input[0]);
const tiles = input[1].split(" ");

const tileMap = new Map();
let idx = 0;

["m", "p", "s", "z"].forEach((type) => {
  for (let i = 1; i <= (type === "z" ? 7 : 9); i++) {
    tileMap.set(`${i}${type}`, idx++);
  }
});

const count = Array(34).fill(0);

for (let i = 0; i < N; i++) {
  const tile = tiles[i];
  const index = tileMap.get(tile);
  count[index]++;
  if (count[index] >= 5) {
    console.log(i + 1);
    process.exit(0);
  }
}

console.log(0);
