const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "input.txt")
  .toString()
  .trim();

/**
 * 서로 다른 N개의 자연수의 합이 S인데, S를 알고 있다.. N의 최댓값..?
 *
 * 우선 N이 많이 나오려면 최대한 작은 수들로 구성해야겠죠?
 *
 * 그럼 예를 들어, S가 200이라면 1, 2, 3, 4, 5, ... 이렇게 더하다가 마지막에 200을 초과할 때 마지막 수를 빼고
 * 딱 맞아 떨어지는 수를 더해주면 최댓값이 나올 거 같은데요?
 */

let S = Number(input);
let cur = 1;

let cnt = 0;
while (true) {
  if (S - cur >= 0) {
    S -= cur;
    cur++;
    cnt++;
  } else {
    break;
  }
}

console.log(cnt);
