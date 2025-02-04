const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "input.txt")
  .toString()
  .trim()
  .split("\n");

/**
 * 문제 읽어봤는데, 진짜 너무 까다롭네요..
 * 우선 환형으로 연결됐다.. 그러니까 그냥 옆이나 위로 올라갔을 때 -1이 되면 반대편으로 이동한다..
 * n, m을 벗어나면 다시 왼쪽으로 혹은 위로 돌아온다.. 인데요..
 *
 * 모듈러로 처리하면 될 거 같아요.
 * 예를 들면, 예제 1의 1행은 ["a", "a", "a"] 잖아요? 그럼 여기서 제가 2번 인덱스의 a를 보고 있어요.
 * 그런데 오른쪽으로 이동한다면 2 + 1이면 3으로 조회할 수 없죠? 그럼 여기서 % n으로 모듈러 처리를 해준다면 0으로 다시 왼쪽으로 돌아오겠죠?
 * 반대로 0번 인덱스의 a를 보고 있어요. 그럼 왼쪽으로 이동한다면 0 - 1로 -1이죠? 그럼 여기선
 * + n을 해주고 다시 % n으로 모듈러 처리를 해주면 2번 인덱스로 이동할 수 있어요. 이걸 고려해서 풀어봅시다.
 *
 * 그리고 짜증나게 대각선으로도 이동이 가능하다는대요. 적당하게 좌표 계산해서 돌려줍시다.
 *
 * 그리고 전체적인 로직은 dfs로 k개만큼의 문자열 길이가 될 때까지 탐색하고, 문자열의 길이가 k가 됐을 때,
 * 현재 문자열을 카운트해주면 되겠는데요.
 * 카운트는 맵 객체로 하면 되겠죠?
 */

const [n, m, k] = input[0].split(" ").map(Number);

const board = [];

let idx = 1;

for (let i = 0; i < n; i++) board.push(input[idx++].trim().split(""));

const dx = [1, -1, 0, 0, -1, -1, 1, 1];
const dy = [0, 0, -1, 1, -1, 1, 1, -1];

const strMap = new Map();

function dfs(x, y, s) {
  strMap.set(s, (strMap.get(s) || 0) + 1);

  if (s.length === 5) return;

  for (let dir = 0; dir < 8; dir++) {
    // 모듈러 연산으로 환형 구조 처리..
    const nx = (x + dx[dir] + n) % n;
    const ny = (y + dy[dir] + m) % m;

    dfs(nx, ny, s + board[nx][ny]);
  }
}

for (let i = 0; i < n; i++) {
  for (let j = 0; j < m; j++) {
    dfs(i, j, board[i][j]);
  }
}

const result = [];

for (let i = 0; i < k; i++) {
  result.push(strMap.get(input[idx++].trim()) || 0);
}

console.log(result.join("\n"));
