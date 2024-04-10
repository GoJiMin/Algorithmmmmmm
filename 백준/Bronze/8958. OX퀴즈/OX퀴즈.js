const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "script.txt")
  .toString()
  .trim()
  .split("\n")
  .map((el) => el.trim());

const [n, ...results] = input;
const ans = [];

for (let result of results) {
  let score = 0;
  let acc = 1;

  for (let i = 0; i < result.length; i++) {
    if (result[i] === "X") {
      acc = 1;
    } else {
      score += acc++;
    }
  }

  ans.push(score);
}

console.log(ans.join("\n"));
