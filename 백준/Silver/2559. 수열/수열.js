const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "input.txt")
  .toString()
  .trim()
  .split("\n");

/**
 * 이 문제는 k만큼 누적시킨 값 중 최대값을 찾는 문제입니다..
 * 단순한 누적합 문제라고 생각했는데.. 슬라이딩 윈도우라는 개념을 처음 접했습니다.
 *
 * k가 2일 때 아래의 배열이 주어진다면 최대값이 궁금합니다.
 * 3 -2 -4
 * 3 + (-2) = 1, -2 + (-4) = -6 으로 1이겠네요.
 *
 * 단순히 2중 for문을 돌려 문제의 답을 찾을 수 있지만 시간제한이 1초입니다.
 *
 * 그럼 이렇게 풀어보는건 어떨까요?
 *
 * k = 2일 때, k만큼 누적시킨다고 가정해봅시다.
 * 0번 인덱스와 1번 인덱스를 누적시킨 값은 1입니다.
 *
 * 그럼 이 누적된 값을 오른쪽으로 밀어봅시다.
 * 1에 -4를 더하고 3을 빼면 결국 -6으로 위에서 구한 값과 같죠..? 이게 슬라이딩 윈도우랍니다..
 *
 * 그럼 k만큼 누적 시킨 초기값을 설정하고, 이 값을 밀어서 해결해봅시다.
 */

const [n, k] = input[0].split(" ").map(Number);
const arr = input[1].split(" ").map(Number);

let cur = 0;

// k만큼 누적시킨 초기값
for (let i = 0; i < k; i++) {
  cur += arr[i];
}

let max = cur;

for (let i = k; i < n; i++) {
  /**
   * k = 2일 때,
   * arr[0] + arr[1]을 더한 값이 초기값.
   * cur + arr[2]를 더했으니 처음 arr[0]을 빼줘야겠죠?
   */
  cur = cur + arr[i] - arr[i - k];

  max = Math.max(max, cur);
}

console.log(max);
