const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "input.txt")
  .toString()
  .trim()
  .split("\n");

const [n, m] = input[0].split(" ").map(Number);
const arr = [];

for (let i = 1; i <= n; i++) arr.push(Number(input[i]));

arr.sort((a, b) => a - b);

let ans = arr.length === 1 ? 0 : Number.MAX_SAFE_INTEGER;
for (let i = 0; i < n; i++) {
  let st = i;
  let en = n - 1;

  const target = arr[i] + m;

  while (st <= en) {
    const mid = Math.floor((st + en) / 2);

    if (arr[mid] >= target) {
      en = mid - 1;
    } else {
      st = mid + 1;
    }
  }

  if (st < n) {
    ans = Math.min(ans, arr[st] - arr[i]);
  }
}

console.log(ans);
