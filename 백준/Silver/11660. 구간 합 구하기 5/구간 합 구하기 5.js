const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "input.txt")
  .toString()
  .trim()
  .split("\n");

/**
 * 이번 문제는 2차원 배열에서의 구간합을 구하는 문제입니다..
 *
 * 이전에 1차원 배열에서 구간합을 어떻게 구했었나요?
 *
 * 1 2 3 4 5의 배열이 존재할 때 누적합 배열은 1 3 6 10 15로 구성됩니다.
 *
 * 각 구간은 S_1 = 1, S_2 = 3 ... S_5 = 15로 구성되겠죠?
 *
 * 그럼 이 때, 배열의 인덱스 2부터 4까지의 구간합을 알고 싶다면 S_4에서 S_2 - 1을 빼면 됐었죠??
 *
 * S_4 = 10, S_1 = 1 => 10 - 1 = 9, 실제로 2 + 3 + 4 = 9니까요..
 *
 * 그럼 이 문제는 어떻게 접근할까요?? 우선 문제의 입력 조건에 (x1 ≤ x2, y1 ≤ y2) 이 조건을 주목합시다..
 *
 * 그리고 저는 이렇게 생각했습니다..
 * x1 = 2, y1 = 2, x2 = 3, y2 = 4가 주어지면 2행 2열부터 3행 4열까지 구하고 싶다는거죠??
 * 그럼 y2는 항상 y1보다 큽니다.. 그럼 우선 각 행마다 누적합을 모두 구합니다..
 *
 * 그럼 x1행의 y2열까지의 구간합을 구합니다.. 마찬가지로 x2행에선 x1부터 시작하는 열부터 y2열까지 구간합을 구해 더합니다.
 *
 * 일단 가능한지 먼저 구현해보고 오겠습니다..
 */

const [n, m] = input[0].split(" ").map(Number);

const table = [];

for (let i = 1; i <= n; i++) {
  table.push(input[i].split(" ").map(Number));
}

// 이제 table의 각 행마다 누적합을 모두 계산합니다.
/**
 * 예제 1의 경우 아래와 같이 누적됩니다.
  [ 1, 3, 6, 10 ],
  [ 2, 5, 9, 14 ],
  [ 3, 7, 12, 18 ],
  [ 4, 9, 15, 22 ]
 */
for (let i = 0; i < n; i++) {
  for (let j = 1; j < n; j++) {
    table[i][j] += table[i][j - 1];
  }
}

const ans = [];

for (let idx = n + 1; idx <= n + m; idx++) {
  const [x1, y1, x2, y2] = input[idx]
    .trim()
    .split(" ")
    .map((v) => Number(v) - 1); // 형변환 하는김에 인덱스 좀 낮춰놓읍시다.. 참..

  let result = 0;

  for (let i = x1; i <= x2; i++) {
    // x1부터 x2까지 반복문으로 돌려주기
    const prefix = table[i][y2] - (table[i][y1 - 1] || 0);

    result += prefix;
  }

  ans.push(result);
}

console.log(ans.join("\n"));
