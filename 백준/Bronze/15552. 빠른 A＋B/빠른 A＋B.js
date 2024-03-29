const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "script.txt")
  .toString()
  .trim()
  .split("\n")
  .map((el) => el.split(" ").map(Number));

const [n, ...arr] = input;
let answer = ''

for (let i = 0; i < n; i++) {
  answer += arr[i][0] + arr[i][1] + "\n"
}

console.log(answer)