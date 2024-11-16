const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "input.txt")
  .toString()
  .trim();

let [a, b] = input.split(" ");

// 무조건 3자리네..

let tmpA = "";
let tmpB = "";

for (let i = 2; i >= 0; i--) {
  tmpA += a[i];
  tmpB += b[i];
}

console.log(parseInt(tmpA - tmpB) > 0 ? tmpA : tmpB);
