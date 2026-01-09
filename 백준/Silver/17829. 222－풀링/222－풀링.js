const input = require('fs')
  .readFileSync(process.platform === 'linux' ? '/dev/stdin' : 'input.txt')
  .toString()
  .trim()
  .split('\n');

const n = Number(input[0]);

const arr = [];
for (let i = 1; i <= n; i++) arr.push(input[i].split(' ').map(Number));

// 2 * 2 행렬에서 두 번째로 큰 값 찾기
function findSecondValue(x, y) {
  let first = -10_001;
  let second = -10_001;

  for (let i = x; i < x + 2; i++) {
    for (let j = y; j < y + 2; j++) {
      const cur = arr[i][j];

      if (first <= cur) {
        second = first;
        first = cur;
      } else if (cur <= first && second <= cur) {
        second = cur;
      }
    }
  }

  return second;
}

// n * n 행렬에서 1 * 1 행렬이 됐을 때 어떤 값이 남을지 찾는게 목표.
// 행렬은 항상 2 * 2 행렬로 나뉨. 결국 나뉜 행렬을 탐색하기 위해선 x, y 좌표가 필요함.
// 추가로 얼마나 분할됐는지에 대한 값도 필요.
// 또 추가로, 지금 분할된 행렬에 어떤 값이 들어왔는지도 필요.

function rec(x, y, n) {
  // base condition..
  // 우리는 2 * 2 행렬일 때 특정한 값을 반환받길 원한다.
  if (n === 2) {
    return findSecondValue(x, y);
  }

  const half = n / 2;
  const subResult = [];

  for (let i = 0; i < 2; i++) {
    for (let j = 0; j < 2; j++) {
      subResult.push(rec(x + i * half, y + j * half, half));
    }
  }

  // 여기까지 오면 subResult 배열에 분할된 영역에서 2번째로 큰 값들이 담기니까 여기서 다시 찾기
  let first = -10_001;
  let second = -10_001;

  for (const cur of subResult) {
    if (first <= cur) {
      second = first;
      first = cur;
    } else if (cur <= first && second <= cur) {
      second = cur;
    }
  }

  return second;
}

console.log(rec(0, 0, n));
