const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "input.txt")
  .toString()
  .trim()
  .split("\n");

const N = Number(input);

let en = 0;
let sum = 0;

let ans = 0;
for (let st = 1; st <= N; st++) {
  while (en < N && sum + en + 1 <= N) {
    en++;

    sum += en;
  }

  if (sum === N) ans++;
  sum -= st;
}

console.log(ans);
