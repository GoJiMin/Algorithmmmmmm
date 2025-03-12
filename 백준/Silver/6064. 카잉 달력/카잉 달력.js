const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "input.txt")
  .toString()
  .trim()
  .split("\n");

/**
 * 우선 실버 1이라고 까불었다가 지금 1시간 넘게 풀고 있는데요..
 *
 * 먼저 우리는 <x:y>의 해인 k를 구해야 돼요.
 * 그런데 M = 10, N = 12, x = 3, y = 9일 때, <1:1>부터 카잉 달력의 마지막 해인 <10:12>까지
 * x가 3으로 나오는 해는 <3:3>인 3번째 해부터 13번째 해인 <3:1>, 23번째 해인 <3:11>
 * 일정한 주기를 가지는데요. x, x + M, x + 2M 식으로 나와서 결국 <3:9>인 33번째 해를 찾을 수 있게 됩니다.
 *
 * 그럼 k를 x부터 시작해서 M과 N의 주기상 최소공배수까지만 돌리면 되는데 그럼 gcd까지 구하니까 M * N까지 돌려버립니다.
 *
 * 그럼 x = 3인 해만 순회하니 y 값만 찾으면 되겠죠?
 * M씩 증가하는 해인 k를 N으로 나눈 나머지가 y를 나눈 나머지와 같을 때 찾았다고 말할 수 있겠네요..
 */

const T = Number(input[0]);
const answers = [];

for (let t = 1; t <= T; t++) {
  const [M, N, x, y] = input[t].split(" ").map(Number);
  let answer = -1;

  for (let k = x; k <= M * N; k += M) {
    if (k % N === y % N) {
      answer = k;
      break;
    }
  }

  answers.push(answer);
}

console.log(answers.join("\n"));
