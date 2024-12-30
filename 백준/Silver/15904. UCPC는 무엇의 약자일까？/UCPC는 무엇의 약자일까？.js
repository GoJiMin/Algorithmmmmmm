const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "input.txt")
  .toString()
  .trim();

const UCPC = "UCPC";
let idx = 0;

for (let i = 0; i < input.length; i++) {
  if (input[i] === UCPC[idx]) idx++;

  if (idx === 4) break;
}

console.log(idx === 4 ? "I love UCPC" : "I hate UCPC");
