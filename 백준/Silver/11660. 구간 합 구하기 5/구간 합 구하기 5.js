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

// const [n, m] = input[0].split(" ").map(Number);

// const table = [];

// for (let i = 1; i <= n; i++) {
//   table.push(input[i].split(" ").map(Number));
// }

// 이제 table의 각 행마다 누적합을 모두 계산합니다.
/**
 * 예제 1의 경우 아래와 같이 누적됩니다.
  [ 1, 3, 6, 10 ],
  [ 2, 5, 9, 14 ],
  [ 3, 7, 12, 18 ],
  [ 4, 9, 15, 22 ]
 */
// for (let i = 0; i < n; i++) {
//   for (let j = 1; j < n; j++) {
//     table[i][j] += table[i][j - 1];
//   }
// }

// const ans = [];

// for (let idx = n + 1; idx <= n + m; idx++) {
//   const [x1, y1, x2, y2] = input[idx]
//     .trim()
//     .split(" ")
//     .map((v) => Number(v) - 1); // 형변환 하는김에 인덱스 좀 낮춰놓읍시다.. 참..

//   let result = 0;

//   for (let i = x1; i <= x2; i++) {
//     // x1부터 x2까지 반복문으로 돌려주기
//     const prefix = table[i][y2] - (table[i][y1 - 1] || 0);

//     result += prefix;
//   }

//   ans.push(result);
// }

// console.log(ans.join("\n"));

/**
 * 위에처럼 풀었는데 시간이 어마무시하게 오래 걸려서 찾아보니까 2차원 누적합도 있더라구요..
 */

const [n, m] = input[0].split(" ").map(Number);

const table = [];

for (let i = 1; i <= n; i++) {
  table.push(input[i].split(" ").map(Number));
}

const prefix = Array.from({ length: n + 1 }, () => Array(n + 1).fill(0));

// 2차원 누적합 계산
/**
 * 다음과 같은 배열이 있다고 가정해봅시다.
 [
  1 2 3 4
  2 3 4 5
 ]

 그럼 이 때 P[2][2]는 1, 1부터 2, 2까지의 구간합을 의미합니다.
 이게 1, 2, 3, 4, 2, 3을 구하는게 아니라 좌표를 기반으로 만든 사각형이라고 생각하는게 좋습니다.
 그럼 1 2 2 3을 구해야겠죠?
 그럼 P[2][2]는 A[2][2]에 P[2][1]을 더하고, P[1][2]의 값을 더하는데 P[2][1], P[1][2]에는 P[1][1]이
 중복으로 들어가있으니 빼줘야곘죠??

 그러니까 P[2][2] = A[2][2] + P[2][1] + P[1][2] - P[1][1]이렇게 나올 겁니다.
 prefix[i][j] = table[i][j] + prefix[i - 1][j] + prefix[i][j - 1] - prefix[i - 1][j - 1]
 그럼 이런 공식으로 2차원 누적합을 계산할 수 있겠네요!
 */
for (let i = 1; i <= n; i++) {
  for (let j = 1; j <= n; j++) {
    prefix[i][j] =
      table[i - 1][j - 1] + // prefix 배열의 인덱스와 맞추기 위해 -1..
      prefix[i][j - 1] +
      prefix[i - 1][j] -
      prefix[i - 1][j - 1];
  }
}

/**
 * 자 그럼 위의 반복문을 통해 2차원 누적합 배열이 생성되었습니다.
 [
  [ 0, 0, 0, 0, 0 ],
  [ 0, 1, 3, 6, 10 ],
  [ 0, 3, 8, 15, 24 ],
  [ 0, 6, 15, 27, 42 ],
  [ 0, 10, 24, 42, 64 ]
 ]
  이렇게 나왔죠?? 그럼 입력 예제 1의 경우를 다시 생각해봅시다.

  2,2부터 3,4 어떻게 다시 구할까요?

  자 P[3][4]는 1,1부터 3,4까지의 모든 누적합입니다. 똑 잘라서 가져오면 이렇게 나옵니다.

  [ 0, 1, 3, 6, 10 ],
  [ 0, 3, 8, 15, 24 ],
  [ 0, 6, 15, 27, 42 ],
  
  우리한테 필요없는 부분이 어딜까요? 우선 1행은 필요없죠?

  P[3][4] - P[1][4]

  [ 0, 3, 8, 15, 24 ],
  [ 0, 6, 15, 27, 42 ],
  
  아 좋습니다. 그럼 다음으로 1열도 필요없죠??

  P[3][4] - P[1][4] - P[3][1]

  [8, 15, 24]
  [15, 27, 42]

  마지막으로 1, 1부터 시작하는데 1, 1에 해당하는 값을 2번 빼버렸죠??

  P[3][4] - P[1][4] - P[3][1] + P[1][1]로 우리는 2,2부터 3,4까지의 구간합을 구해버렸습니다.

  그럼.. x1, y1 = [2, 2] x2, y2 = [3, 4] 
  result = P[x2][y2] - P[x1 - 1][y2] - P[x2][y1 - 1] + P[x1 - 1][y1 - 1] 이겠죠??
  */

const ans = [];

const queries = input.slice(n + 1);

for (const query of queries) {
  const [x1, y1, x2, y2] = query.split(" ").map(Number);

  ans.push(
    prefix[x2][y2] -
      prefix[x1 - 1][y2] -
      prefix[x2][y1 - 1] +
      prefix[x1 - 1][y1 - 1]
  );
}

console.log(ans.join("\n"));
