const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "input.txt")
  .toString()
  .trim()
  .split("\n");

/**
 * 포인터를 옮기면서 똑같은 원소는 k개 이하로 들어있도록 제한을 걸어야겠네요..
 */

const [n, k] = input[0].split(" ").map(Number);
const arr = input[1].split(" ").map(Number);

const numCnt = Array(100001).fill(0);

let en = 0;
numCnt[arr[en]]++;

let cnt = 1;
let ans = 0;

for (let st = 0; st < n; st++) {
  while (en < n - 1 && numCnt[arr[en + 1]] < k) {
    en++;

    cnt++;
    numCnt[arr[en]]++;
  }

  ans = Math.max(ans, cnt);

  cnt--;
  numCnt[arr[st]]--;
}

console.log(ans);