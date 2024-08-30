const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "input.txt")
  .toString()
  .trim()
  .split("\n");

const [ns, nums] = input;

const [n, s] = ns.split(" ").map(Number);
const list = nums.split(" ").map(Number);

let cnt = 0;

function solution(cur, tot) {
  if (cur === +n) {
    tot === +s && cnt++;

    return;
  }

  solution(cur + 1, tot);
  solution(cur + 1, tot + list[cur]);
}

solution(0, 0);

if (s === 0) cnt--;

console.log(cnt);
