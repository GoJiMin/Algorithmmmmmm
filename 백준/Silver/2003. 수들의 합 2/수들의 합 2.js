const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "input.txt")
  .toString()
  .trim()
  .split("\n");

const [n, m] = input[0].split(" ").map(Number);
const arr = input[1].split(" ").map(Number);

let en = 0;
let tot = arr[0];

let cnt = 0;
for (let st = 0; st < n; st++) {
  while (en < n && tot < m) {
    en++;

    if (en !== n) tot += arr[en];
  }

  if (en === n) break;
  if (tot === m) cnt++;

  tot -= arr[st];
}

console.log(cnt);
