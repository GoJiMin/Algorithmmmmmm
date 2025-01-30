const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "input.txt")
  .toString()
  .trim()
  .split("\n");

/**
 * 음... 남은 간식이 i개일 때, 1 이상, k_i 이하 중 하나를 1/k_i 확률로 뽑아서 그만큼 가져간다..
 * 이 과정을 반복해서 간식을 받을 수 있는 생활관이 몇개인지 기대값을 구하라는 건데요..
 *
 * E[i].. i개의 간식이 남았을 때, 앞으로 간식을 받을 수 있는 생활관의 기대값을 나타내는 테이블이구요..
 * i > 0.. i가 1 이상.. 간식이 1개 이상 남아있다면 이번 생활관은 간식을 무조건 1개 가져갈 수 있죠? + 1..
 * 그리고 간식을 이 생활관이 몇 개(x) 가져갔냐.. 에 따라 남은 간식이 i - x개 남을 거예요
 *
 * 그럼 남은 i - x개의 간식부터 시작해서 최종적으로 간식이 모두 소진될 때 까지 생활관이 앞으로 얼마나 더 받을 수 있는지
 * 기대값이 필요한데요.
 * 그럼 이건 E[i - x]겠네요.
 *
 * 그럼 x = 1이라면, 남은 간식은 i - 1개 => E[i - 1]
 * x = 2라면, 남은 간식은 i - 2개 => E[i - 2]
 * x = k_i라면, 남은 간식은 i - k_i개 => E[i - k_i]
 */

let n = Number(input[0]);
const k = input[1].split(" ").map(Number);

const E = Array(n + 1).fill(0); // i개의 간식이 남았을 때 가져갈 수 있는 생활관의 기댓값..
const prefix = Array(n + 1).fill(0); // 모든 경우의 수를 구하면 O(n ** 2)니까 누적합 배열 만들어놓기.

for (let i = 1; i <= n; i++) {
  const k_i = k[i - 1];

  let left = i - 1 - k_i;
  if (left < 0) left = 0;

  const sum = prefix[i - 1] - prefix[left]; // 구간합 구하기
  E[i] = 1 + sum / k_i;

  prefix[i] = prefix[i - 1] + E[i];
}

console.log(E[n]);
