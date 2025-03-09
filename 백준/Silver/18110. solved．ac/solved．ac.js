const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "input.txt")
  .toString()
  .trim()
  .split("\n");

let idx = 0;

const n = Number(input[idx++]);
const exc = Math.round(n * 0.15);
const difficulty = [];

for (let i = 0; i < n; i++) {
  difficulty.push(Number(input[idx++]));
}

difficulty.sort((a, b) => a - b);

let trimmedMean = 0;
for (let i = 0 + exc; i < n - exc; i++) {
  trimmedMean += difficulty[i];
}

if (trimmedMean === 0) {
  console.log(0);
} else {
  console.log(Math.round(trimmedMean / (n - exc * 2)));
}
