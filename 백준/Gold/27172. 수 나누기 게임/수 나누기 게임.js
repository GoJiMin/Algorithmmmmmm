const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "input.txt")
  .toString()
  .trim()
  .split("\n");

/**
 * 그냥 단순하게 모든 숫자 쌍을 비교하면 10 ** 10라서 시간초과입니다..
 *
 * 만약 어떤 숫자 x가 주어졌을 때, 이 x가 이길 수 있는 숫자와 질 수 있는 숫자를 어떻게 알 수 있을까요?
 *
 * 우선 문제에서 승리 조건은 플레이어의 수로 다른 플레이어의 수를 나눴을 때, 나머지가 0이면 이긴답니다.
 * 그럼 x가 3일 때, 6, 9, 12, ... 30 등 3x에 해당하는 수가 나오면 이길 수 있겠죠?
 *
 * 그럼 반대로 패배 조건은 플레이어의 수가 다른 플레이어의 수로 나누어 떨어지면 진다고 합니다.
 * 그럼 x가 12일 때, 1, 2, 3, 4, 6, 12가 약수인데요. 그럼 12를 제외한 나머지 모든 수는 x를 이길 수 있고,
 * 반대로 x는 나머지 모든 수들에게 패배하겠죠?
 *
 * 그럼 이 x가 이길 수 있는 배수의 개수와 x가 질 수 있는 약수의 개수를 미리 다 구해놓으면 되겠죠?
 */

const n = Number(input[0]);
const cards = input[1].split(" ").map(Number);

const MAX_VAL = Math.max(...cards);

// 카드가 존재하는지 판단
// 1이면 해당 카드가 존재한다
const freq = Array(MAX_VAL + 1).fill(0);
for (let i = 0; i < n; i++) freq[cards[i]] = 1;

// i의 배수의 개수를 기록 mult[i]는 i의 배수를 이길 수 있죠?
/**
 * 예를 들어 cards = [3, 4, 12]일 때
 * 3은 3, 12를 나눌 수 있으니 mult[3] = 2
 * 4는 4, 12를 나눌 수 있으니 mult[4] = 2
 * 12는 아무것도 나눌 수 없으니 mult[12] = 1
 */

// i의 약수의 개수를 기록 div[j]는 j가 어떤 수 x에게 나누어질 개수
/**
 * 위에서 처럼 예를 들어봅시다.. card = [3, 4, 12]일 때
 * 3에 대해서 3, 6, 9, 12, 15 ... 30 ... 등등 3의 배수들은 모두 3에 의해 나누어 떨어지죠?
 * 그럼 결국 div[12]는 3과 4에 의해 2로 증가합니다.
 *
 * 즉 패배 횟수를 기록하게 되겠네요!
 */

const mult = Array(MAX_VAL + 1).fill(0);
const div = Array(MAX_VAL + 1).fill(0);
for (let i = 1; i <= MAX_VAL; i++) {
  // cards에 존재하면
  if (freq[i] === 1) {
    for (let j = i; j <= MAX_VAL; j += i) {
      mult[i] += freq[j];

      div[j]++; // div[j]는 cards[i]의 수로 나누어지니 증가
    }
  }
}

const scores = [];
for (let i = 0; i < n; i++) {
  scores.push(mult[cards[i]] - div[cards[i]]);
}

console.log(scores.join(" "));
