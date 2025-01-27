const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "input.txt")
  .toString()
  .trim()
  .split("\n");

const n = Number(input[0]);
const m = Number(input[1]);
const arr = input[2].split(" ").map(Number);

arr.sort((a, b) => a - b);

let cnt = 0;
for (let st = 0; st < n; st++) {
  let sumVal = arr[st];
  let en = st + 1;

  while (en < n - 1 && sumVal + arr[en + 1] <= m) {
    en++;
  }

  if (sumVal + arr[en] === m) cnt++;
}

console.log(cnt);
