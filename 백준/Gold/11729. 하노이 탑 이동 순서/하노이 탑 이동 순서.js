const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "input.txt")
  .toString()
  .trim();

const k = Number(input);
const result = [];

/**
 * 원판이 옮겨질 수 있는 3개의 장대가 있음.
 * 하노이 탑의 규칙으로 자신보다 작은 원판은 아래에 올 수 없음.
 * 가장 아래는 n번 원판이 자리하고, 위로 n-1개의 원판이 쌓이게 됨.
 * 그럼 n-1개의 원판이 2번 장대로 가야 n번 원판은 3번 장대로 갈 수 있음.
 * 이후 2번 장대의 쌓인 n-1개의 원판들이 3번 장대로 옮겨지면 됨.
 *
 * 함수는 func(a = 시작 장대, b = 옮겨질 장대, n = 원판)으로 구성.
 * base condition은 n === 1 이면 마지막 원판이 움직였다고 판단한 뒤 마지막으로 시작 장대와 최종 장대를 출력.
 * n-1개의 원판은 어떻게 움직이는지 ? func(a, 6 - a - b, n - 1) why? 장대의 합의 숫자는 6으로 1번 장대도 아닌 3번 장대도 아닌
 * 장대의 위치를 6 - a - b의 위치로 움직임.
 * n개의 원판은 어떻게 움직이는지 출력 console.log(a, b)
 * 마지막으로 6 - a - b의 위치에서 b로 n-1개의 원판을 옮긴다.
 */

function func(a, b, n) {
  if (n === 1) {
    result.push(`${a} ${b}`);
    return;
  }

  func(a, 6 - a - b, n - 1);
  result.push(`${a} ${b}`);
  func(6 - a - b, b, n - 1);
}

result.push((1 << k) - 1);
func(1, 3, k);

console.log(result.join("\n"));
