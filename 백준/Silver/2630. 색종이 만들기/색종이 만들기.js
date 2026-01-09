const input = require('fs')
  .readFileSync(process.platform === 'linux' ? '/dev/stdin' : 'input.txt')
  .toString()
  .trim()
  .split('\n');

/**
 * N = 2일 때의 종이 모양
 * 0 0
 * 0 0
 * 이 종이는 0으로 이루어진 1장의 종이.
 *
 * N = 2일 때 다른 종이 모양
 * 0 1
 * 0 1
 * 이 종이는 0으로 이루어진 2장의 종이, 1로 이루어진 2장의 종이.
 *
 * 분할정복..
 */

const n = Number(input[0]);

const paper = [];
for (let i = 1; i <= n; i++) paper.push(input[i].trim().split(' '));

function check(x, y, n) {
  for (let i = x; i < x + n; i++) {
    for (let j = y; j < y + n; j++) {
      if (paper[x][y] !== paper[i][j]) return false;
    }
  }

  return true;
}

const result = [0, 0];

// 함수의 정의
// 주어진 [x, y] 좌표 내에서 n 크기 만큼의 종이 갯수가 얼마나 있는가?
// 필요한 인자는 x, y, n
function rec(x, y, n) {
  // 재귀 함수의 탈출문인 base condition 정의
  // 이 영역이 주어진 좌표와 n에 비례해 같은 종이라면 종이의 수를 카운트하고 종료.
  if (check(x, y, n)) {
    const cur = Number(paper[x][y]);

    result[cur]++;
    return;
  }

  // 탈출하지 못해 종이를 분할
  const z = n / 2;

  // 1장의 종이를 다시 4번 탐색하니 반복문은 총 4회.
  for (let i = 0; i < 2; i++) {
    for (let j = 0; j < 2; j++) {
      rec(x + i * z, y + j * z, z);
    }
  }
}

rec(0, 0, n);
console.log(result.join('\n'));
