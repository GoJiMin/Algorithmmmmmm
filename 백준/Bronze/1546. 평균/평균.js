const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "script.txt")
  .toString()
  .trim()
  .split("\n")
  .map((el) => el.trim().split(" ").map(Number));

const [N, scores] = input;
const maxScore = Math.max(...scores);

const result =
  scores
    .map((score) => (score / maxScore) * 100)
    .reduce((acc, cur) => acc + cur, 0) / N;

console.log(result);