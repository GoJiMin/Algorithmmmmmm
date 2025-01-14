const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "input.txt")
  .toString()
  .trim()
  .split("\n");

const [n, s] = input[0].split(" ").map(Number);
const arr = input[1].split(" ").map(Number);

for (let i = 1; i < n; i++) {
  arr[i] = arr[i] + arr[i - 1];
}

/**
 * 1 3 6 10 12 17 20 21 22 24 일 때,
 *
 * 3부터 4까지의 구간합을 구하고 싶다면, prefix[4] - prefix[2] 12 - 6 => 4 + 2 구간..
 */
let ans = 0;
for (let i = 0; i < n; i++) {
  // 구간을 모두 돌면서, s 값에 해당하는 구간을 찾으면 ans를 증가.
  if (arr[i] === s) ans++;

  for (let j = 0; j < i; j++) {
    if (arr[i] - arr[j] === s) ans++;
  }
}

console.log(ans);
