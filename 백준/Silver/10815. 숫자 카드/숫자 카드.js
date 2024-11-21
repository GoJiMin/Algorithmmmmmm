const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "input.txt")
  .toString()
  .trim()
  .split("\n");

const n = Number(input[0]);
const m = Number(input[2]);

const cards = input[1].trim().split(" ");
const hasCards = input[3].trim().split(" ");

const map = new Map();

for (let i = 0; i < n; i++) {
  map.set(cards[i]);
}

const result = [];
for (let i = 0; i < m; i++) {
  result.push(map.has(hasCards[i]) ? 1 : 0);
}

console.log(result.join(" "));
