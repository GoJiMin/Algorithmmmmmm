const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "input.txt")
  .toString()
  .trim()
  .split("\n");

/**
 * 가장 좋은 선택을 요구하니까 그리디 .. 겠죠..?
 * 이전까지 풀었던 문제들은 주어진 입력에 대해 최소, 최대의 선택을 요구했다면
 * 이번에 풀어볼 문제는 모두 겹치는 최선의 선택을 요구합니다.
 * 어떻게 풀어볼까요?
 */

// const [n, ...arr] = input;

// const timeTable = arr.map((el) => el.trim().split(" ").map(Number));

// 우선 오름차순으로 정렬해봅시다.
// timeTable.sort((a, b) => a[1] - b[1] || a[0] - b[0]);

/**
 * console.log(timeTable);
 * 결과는 다음과 같습니다.
 [
  [1, 4],
  [2, 4],
  [2, 5],
 ];
 0번 인덱스의 시작시간(s)은 1, 종료시간(e)은 4입니다.
 그럼 종료시간 값보다 큰 시작 시간을 가지는 시간 배열에 대해 count를 증가시키고 종료시간을 업데이트합시다.
 */

// let prevTimeE = timeTable[0][1]; // 이전 종료 시간, 초기값 0번

// let minT = 0;
// for (let i = 1; i < +n; i++) {
//   const [curS, curE] = timeTable[i];

//   // 이전 종료시간보다 현재 시작 시간이 클 경우.
//   if (prevTimeE < curS) {
//     minT += curS - prevTimeE;
//     prevTimeE = curE;
//   }
// }

// console.log(minT);

// 라고 생각했는데 틀렸고 다시 생각해보니 이렇게 풀 수 있네요.
/**
 * 욱제는 욕심쟁이라 모든 팬을 만나고 가야됩니다.
 * 누굴 선택하지 않고 그냥 모든 팬을 만나야만 합니다. 욕심쟁이네요.
 * 그럼 처음 만난 팬의 종료시간과 마지막으로 남아있는 팬의 시작시간만 알면 됩니다.
   3 3
   6 9
   6 7
   3 8
   9 11
 * 입력이 위와 같이 주어진다고 가정해봅시다.
 * 그럼 위의 정렬을 그대로 수행한다고 했을 때 timeTable은 아래와 같이 정렬됩니다.
 * [ [ 3, 3 ], [ 6, 7 ], [ 3, 8 ], [ 6, 9 ], [ 9, 11 ] ] 이제 이 시간을 그려봅시다.
 * 1 2 3 4 5 6 7 8 9 10 11
       o [3, 3]
             o o [6, 7]
       o o o o o o [3, 8]
             o o o o [6, 9]
                   o o o [9, 11]
 * 그럼 욱제는 욕심쟁이라 모든 팬을 만나고 싶어하니 가장 먼저 도착한 팬[3, 3]과 가장 늦게 도착한 팬[9, 11]이
   있는 시간 사이에 학교를 떠날 수 없으니, 자연스럽게 모든 팬을 만나게 됩니다.
   그럼 최소 시간은 9 - 3 = 6이 되겠군요.
 */

// const minEnd = timeTable[0][1];
// const maxStart = timeTable.at(-1)[0];

// const ans = maxStart - minEnd;

// if (ans < 0) {
//   console.log(0);
// } else {
//   console.log(maxStart - minEnd);
// }

// 라고~ 생각을 했는데 아래 반례를 통과하지 못합니다.
/**
 * 반례 아래에 그린 그림을 봅시다. 1, 9인 팬이 정렬되며 마지막 인덱스로 이동해버려 오동작이 일어납니다.
 * 그럼 어떻게 풀까요?
 * 정렬을 두번했어야 됩니다..
 * 잘못 생각하고 있었던게 학교에서 가장 빨리 떠나는 팬과 학교에 가장 늦게 오는 팬의 시간이 필요했습니다.
 * 그럼 당연히 그 사이에 있는 팬을 모두 만날 수 있겠죠?
 * 아래 예시에서 그럼 가장 빨리 떠나는 팬은 [2, 4]인 팬이고, 가장 늦게 오는 학생은 [6, 7]인 팬입니다..
 */
// [
//   [2, 4],
//   [1, 5],
//   [6, 7],
//   [1, 9],
// ];

// 1 2 3 4 5 6 7 8 9
//   o o o
// o o o o o
//           o o
// o o o o o o o o o

// 역대급 삽질..
const [_, ...arr] = input;

const timeTable = arr.map((el) => el.trim().split(" ").map(Number));

const earliest = timeTable.sort((a, b) => a[1] - b[1])[0][1]; // 가장 빨리 떠나는 팬
const theLatest = timeTable.sort((a, b) => b[0] - a[0])[0][0]; // 가장 늦게 도착한 팬

if (earliest >= theLatest) {
  console.log(0);
} else {
  console.log(theLatest - earliest);
}
