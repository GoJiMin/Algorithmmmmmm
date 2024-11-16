const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "input.txt")
  .toString()
  .trim();

let n = Number(input);

let cnt = 0;

while (n) {
  cnt += n--;
}

console.log(cnt);
