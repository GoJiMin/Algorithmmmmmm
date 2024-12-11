const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "input.txt")
  .toString()
  .trim()
  .split("\n");

/**
 * 하 너무 어려워서 2시간 걸려서 풀었습니다..
 *
 * 우선 문제에선 모든 구간에 대해 M으로 나누어 떨어지는 구간의 개수를 묻고 있습니다.
 *
 * 접근 방식은 다음과 같았습니다..
 *
 * 구간 누적합에 대해 M으로 나누었을 때 같은 나머지를 같는 누적합 구간은 M으로 나누어 떨어진다..입니다..
 *
 * 주어진 예제는....... 1 2 3 1 2 입니다..
 * 예제의 누적합은..... 1 3 6 7 9 입니다..
 * M으로 나눈 나머지는. 1 0 0 1 0 입니다..
 *
 * 자 그럼 위의 경우에 대해 S_0은 0번 인덱스까지의 누적 구간 1, S_3은 3번 인덱스까지의 누적 구간 7로
 * 이 구간 사이인 7 - 1 = 6, 6 % 3 = 0으로 M으로 나누어 떨어짐을 알 수 있습니다..
 *
 * S_3 - S_3 = (1 + 2 + 3 + 1) - 1 = 2 + 3 + 1 = 6.. 그쵸?
 *
 * 즉 우리는 같은 나머지를 가지는 구간의 개수만큼 더한 값을 출력하면 됩니다..
 */

const [n, m] = input[0].split(" ").map(Number);
const nums = input[1].split(" ").map(Number);

let sum = 0;
let cnt = 0;

// 나머지별 개수를 카운트하는 배열 (0부터 M-1까지의 나머지)
const remainderCounts = Array(m).fill(0);

remainderCounts[0] = 1;

for (let i = 0; i < n; i++) {
  sum += nums[i];

  const remainder = sum % m;

  // 이 나머지를 갖는 누적합의 개수만큼 카운트 추가
  cnt += remainderCounts[remainder];

  // 이 나머지를 하나 더 추가 (현재 누적합의 나머지 기록)
  remainderCounts[remainder]++;
}

console.log(cnt);
