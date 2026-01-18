const input = require('fs')
  .readFileSync(process.platform === 'linux' ? '/dev/stdin' : 'input.txt')
  .toString()
  .trim()
  .split('\n');

/**
 * 문제를 이해해보자면, i만큼 현재 위치에서 오른쪽이나 아래로 이동이 가능하다.
 * i가 2일 때, 정확히 2만큼만 움직이는게 가능. 2 적혀있는데 살살 뛰어서 1만큼 점프? 이거 안됨.
 *
 * [0, 0]에서 시작하며, [n - 1, n - 1] 위치에 갈 수 있는 경로의 개수를 출력하면 된다.
 *
 * 흠 일단 현재 좌표 값대로 아래, 오른쪽으로 이동하다가 [n - 1, n - 1]에 도착하면 카운트되도록 짜봅시다.
 *
 * 역시나 단순히 dfs로 경로만 탐색하게 짰더니 시간초과가 발생했읍니다..
 * 아마 N은 100으로 작긴 하지만, 문제의 조건에 경로의 개수가 2 ** 63 - 1까지 있다니 중복 경로가 많다는 의미 같네요.
 *
 * 아마 [50, 50]이 중간 지점이라고 헀을 때, 여기까지 도착하는 경로가 1억개면 중복 경로만큼 다시 계산하니 터지는 거 같습니다..
 *
 * 그럼 아마 각 지점마다 오는 방법의 수를 기억해야 할 거 같네요.. dp?
 *
 * 테이블을 먼저 정의해봅시다. 아마 각 지점마다 도달할 수 있는 경우의 수를 기억해야 하니 2차원 배열..
 * dp[i][j] = [i, j] 좌표에 도달할 수 있는 모든 경우의 수
 *
 * [i, j]일 때, jump = map[i][j], dp[i][j] = 해당 지점에 도달 가능한 경우의 수..
 * if jump + i < n; then dp[i + n][j] += dp[i][j]
 * why? 현재 점프 가능한 영역일 경우 [i + n, j] 좌표에 현재까지 도달한 경우의 수만큼 더함..
 *
 * j도 마찬가지?
 */

const n = Number(input[0]);
const map = [];

for (let i = 1; i <= n; i++) map.push(input[i].split(' ').map(Number));

const dp = Array.from({length: n}, () => Array(n).fill(0n));
dp[0][0] = 1n; // 시작점은 도착하는 방법이 1개

for (let i = 0; i < n; i++) {
  for (let j = 0; j < n; j++) {
    const currentPaths = dp[i][j];

    // 이 지점에 도착이 불가능하거나 도착점이면 패스..
    if (currentPaths === 0n || (i === n - 1 && j === n - 1)) continue;

    const jump = map[i][j];

    if (jump === 0) continue;

    if (i + jump < n) {
      dp[i + jump][j] += currentPaths;
    }

    if (j + jump < n) {
      dp[i][j + jump] += currentPaths;
    }
  }
}

console.log(dp[n - 1][n - 1].toString());
