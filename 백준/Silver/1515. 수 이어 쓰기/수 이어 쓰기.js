const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "input.txt")
  .toString()
  .trim();

/**
 * 문자열 문제는 언제 풀어도 풀기 싫고 짜증납니다.
 *
 * 그냥 예제로 이해하면,
 *
 * 234092의 답이 20인 이유는
 * 2, 3, 4, 10, 19 뒤에 나올 최소값은 20이니까..
 *
 * 제가 생각한 방법은 다음과 같은데요..
 *
 * 문제에서 1부터 N까지 수를 모두 붙였다고 하니 N이 12라면
 * 123456789101112 이렇게 붙어있겠죠? 그럼 1부터 시작해 이 부분수열에 포함이되는지 확인하는식으로
 * 풀면 될 거 같은데요..
 */

function findMin(target, n) {
  let curNum = 1;
  let idx = 0;

  while (idx < n) {
    const toStr = curNum.toString();

    for (const char of toStr) {
      if (char === target[idx]) {
        idx++;

        if (idx === n) break;
      }
    }

    curNum++;
  }

  return curNum - 1;
}

console.log(findMin(input, input.length));
