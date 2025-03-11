const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "input.txt")
  .toString()
  .trim()
  .split("\n");

const n = Number(input[0]);
const m = Number(input[1]);
const str = input[2];

let ans = 0;
let cnt = 0;

for (let i = 1; i < m - 1; i++) {
  if (str[i - 1] === "I" && str[i] === "O" && str[i + 1] === "I") {
    cnt++;
    i++;

    if (cnt === n) {
      ans++;
      cnt--;
    }
  } else {
    cnt = 0;
  }
}

console.log(ans);
