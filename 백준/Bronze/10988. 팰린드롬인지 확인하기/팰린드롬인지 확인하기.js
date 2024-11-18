const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "input.txt")
  .toString()
  .trim();

let lidx = 0;
let ridx = input.length - 1;

const mid = Math.floor((lidx + ridx) / 2);

while (lidx <= mid && mid < ridx) {
  if (input[lidx++] !== input[ridx--]) return console.log(0);
}

console.log(1);
