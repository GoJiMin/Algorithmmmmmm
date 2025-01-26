const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "input.txt")
  .toString()
  .trim()
  .split("\n");

/**
 * 사실 투 포인터로 어떻게 풀어야되나 고민을 좀 해봤는데요..
 *
 * 문제에선 항상 짝수로 이루어진 부분 수열의 길이를 물어봅니다. 그렇다면 포인터를 옮기면서,
 * 현재 짝수 수열의 길이에서 홀수의 개수를 빼주면 되는 거 아닐까요?
 *
 * 일단 그렇게 구현했고, 맞은 거 같은데요.
 * 먼저 최대 짝수 수열의 길이를 저장할 ans, 홀수의 개수를 저장할 cnt를 초기화합니다.
 * 이후에 주어진 배열의 첫 번재 요소가 홀수면 cnt를 증가시킵니다..
 *
 * 이제 다음엔 전형적인 투 포인터인데요. while문 내부를 보면요.
 * 다음 포인터를 조회하기 위해 en을 n - 1까지만 돌려야 돼요. 이후에 cnt + arr[en + 1] % 2는요.
 * 만약 arr[en + 1] 즉, 다음 포인터의 수를 2로 나눈 나머지가 1이라면 홀수죠? 기록한 홀수 개수와 다음 포인터의
 * 홀수 유무가 k 이하라면, 우리는 수열의 길이를 더 증가시킬 수 있습니다. 그쵸?
 *
 * cnt += arr[en] % 2.. 홀수여도 k개만큼 삭제할 수 있으니까요?
 * 그리고 ans를 업데이트.. 해준다 입니다.
 */

const [n, k] = input[0].split(" ").map(Number);
const arr = input[1].split(" ").map(Number);

let ans = 0;
let cnt = 0;
if (arr[0] % 2 === 1) cnt++;

let en = 0;
for (let st = 0; st < n; st++) {
  while (en < n - 1 && cnt + (arr[en + 1] % 2) <= k) {
    en++;

    cnt += arr[en] % 2;
  }

  ans = Math.max(ans, en - st + 1 - cnt);
  cnt -= arr[st] % 2;
}

console.log(ans);
