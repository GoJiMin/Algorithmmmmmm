const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "script.txt")
  .toString()
  .trim();

function factorial(n) {
  let result = 1n;
  for (let i = 1n; i <= n; i++) {
    result *= i;
  }

  return result;
}

let facto = factorial(+input);
let cnt = 0;

while (facto % 10n === 0n) {
  facto = facto / 10n;
  cnt++;
}

console.log(cnt);
