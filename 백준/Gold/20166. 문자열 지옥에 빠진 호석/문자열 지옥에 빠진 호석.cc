// const input = require("fs")
//   .readFileSync(process.platform === "linux" ? "/dev/stdin" : "input.txt")
//   .toString()
//   .trim()
//   .split("\n");

// /**
//  * 문제 읽어봤는데, 진짜 너무 까다롭네요..
//  * 우선 환형으로 연결됐다.. 그러니까 그냥 옆이나 위로 올라갔을 때 -1이 되면 반대편으로 이동한다..
//  * n, m을 벗어나면 다시 왼쪽으로 혹은 위로 돌아온다.. 인데요..
//  *
//  * 모듈러로 처리하면 될 거 같아요.
//  * 예를 들면, 예제 1의 1행은 ["a", "a", "a"] 잖아요? 그럼 여기서 제가 2번 인덱스의 a를 보고 있어요.
//  * 그런데 오른쪽으로 이동한다면 2 + 1이면 3으로 조회할 수 없죠? 그럼 여기서 % n으로 모듈러 처리를 해준다면 0으로 다시 왼쪽으로 돌아오겠죠?
//  * 반대로 0번 인덱스의 a를 보고 있어요. 그럼 왼쪽으로 이동한다면 0 - 1로 -1이죠? 그럼 여기선
//  * + n을 해주고 다시 % n으로 모듈러 처리를 해주면 2번 인덱스로 이동할 수 있어요. 이걸 고려해서 풀어봅시다.
//  *
//  * 그리고 짜증나게 대각선으로도 이동이 가능하다는대요. 적당하게 좌표 계산해서 돌려줍시다.
//  *
//  * 그리고 전체적인 로직은 dfs로 k개만큼의 문자열 길이가 될 때까지 탐색하고, 문자열의 길이가 k가 됐을 때,
//  * 현재 문자열을 카운트해주면 되겠는데요.
//  * 카운트는 맵 객체로 하면 되겠죠?
//  *
//  * 이렇게 제출했는데, 시간 초과 당했습니다.. 아마 자바스크립트 특유의 느린 동작 때문인 거 같은데,
//  * dp로 접근해야되나..? 모든 범위를 탐색하느라 느린 건가..??
//  *
//  * 최적화 방법에 대해 찾아봤는데요. 정수 인코딩이란 방법도 있더라구요? 신기해라
//  * 문자열을 문자들의 위치 값으로 정수로 변환해서 처리하는 방법이라고 하는대, "a"를 0, "b"를 1, ... "z"를 25로 놓고 풀어보라고 합니다.
//  */

// // const [n, m, k] = input[0].split(" ").map(Number);

// // const board = [];

// // let idx = 1;

// // for (let i = 0; i < n; i++) board.push(input[idx++].trim().split(""));

// // const dx = [1, -1, 0, 0, -1, -1, 1, 1];
// // const dy = [0, 0, -1, 1, -1, 1, 1, -1];

// // const codeMap = new Map();

// // // 문자열을 정수로 변경..
// // function charToInt(ch) {
// //   return ch.charCodeAt(0) - 97;
// // }

// // function dfs(x, y, code, len) {
// //   if (len === k) {
// //     // 문자열을 카운트..
// //     codeMap.set(code, (codeMap.get(code) || 0) + 1);
// //     return;
// //   }

// //   for (let dir = 0; dir < 8; dir++) {
// //     // 모듈러 연산으로 환형 구조 처리..
// //     const nx = (x + dx[dir] + n) % n;
// //     const ny = (y + dy[dir] + m) % m;

// //     const nextCode = code * 26 + charToInt(board[nx][ny]);
// //     dfs(nx, ny, nextCode, len + 1);
// //   }
// // }

// // for (let i = 0; i < n; i++) {
// //   for (let j = 0; j < m; j++) {
// //     dfs(i, j, charToInt(board[i][j]), 1);
// //   }
// // }

// // const result = [];

// // for (let i = 0; i < k; i++) {
// //   const s = input[idx++].trim();

// //   let code = 0;

// //   for (const ch of s) {
// //     code = code * 26 + charToInt(ch);
// //   }

// //   result.push(codeMap.get(code) || 0);
// // }

// // console.log(result.join("\n"));

// 결국에 위와 같이 정수 인코딩까지 해봤는데 이건 JS로는 문자열 처리가 너무 느려 불가능할 거 같습니다.
// C++ 코드로 동일하게 로직을 짰을 때 통과되면 열이 정말 받을 거 같은데 일단 제출해보겠습니다..

#include <bits/stdc++.h>
using namespace std;

string board[10];
int n, m, k;
int dx[8] = {-1, -1, -1, 0, 0, 1, 1, 1};
int dy[8] = {-1, 0, 1, -1, 1, -1, 0, 1};
unordered_map<string, int> cnt;

void dfs(int i, int j, string s) {
  cnt[s]++;
  if (s.size() == 5) return;
  for (int dir = 0; dir < 8; dir++) {
    int nx = (i + dx[dir] + n) % n;
    int ny = (j + dy[dir] + m) % m;
    dfs(nx, ny, s + board[nx][ny]);
  }
}

int main(void) {
  ios::sync_with_stdio(0);
  cin.tie(0);
  cin >> n >> m >> k;
  for (int i = 0; i < n; i++) cin >> board[i];
  for (int i = 0; i < n; i++)
    for (int j = 0; j < m; j++) dfs(i, j, string(1, board[i][j]));
  while (k--) {
    string s;
    cin >> s;
    cout << cnt[s] << '\n';
  }
}