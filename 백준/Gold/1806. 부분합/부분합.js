const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "input.txt")
  .toString()
  .trim()
  .split("\n");

const [n, s] = input[0].split(" ").map(Number);
const arr = input[1].split(" ").map(Number);

let en = 0;
let total = arr[0];
let ans = Number.MAX_SAFE_INTEGER;

for (let st = 0; st < n; st++) {
  while (en < n && total < s) {
    en++;

    if (en !== n) total += arr[en];
  }
  if (en === n) break;

  ans = Math.min(ans, en - st + 1);
  total -= arr[st];
}

console.log(ans === Number.MAX_SAFE_INTEGER ? 0 : ans);
