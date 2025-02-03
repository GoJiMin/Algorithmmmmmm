const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "input.txt")
  .toString()
  .trim()
  .split("\n");

/**
 * 하 이거 LCS 문제인데요, 그냥 제일 긴 공통 부분 수열의 길이만 구하면 진짜 쉬운데,
 * 이거 그 문자열이 뭔지까지 구하라니까 벌써 열이 받네요.
 *
 * 우선 dp[i][j] 테이블을 정의할 건데요. 무슨 의미냐! i번째까지의 문자열A와 j번째까지의 문자열B 부분에서
 * 찾을 수 있는 공통 부분 수열의 길이를 넣을 겁니다.
 *
 * 그럼 strA[i] === strB[i]라면, dp[i - 1][j - 1] + 1이겠죠? 이전의 공통 부분 수열에서 1개 더 추가할 수 있으니까요.
 * 그럼 반대의 경우엔 dp[i][j] = max(dp[i - 1][j], dp[i][j - 1]) 둘 중에 큰 쪽으로 붙으면 되겠죠?
 *
 * 우선 이 방법으로 제일 긴 부분 문자열의 길이를 구해봅시다.
 *
 * 잘 나오죠? 5.. 근데 이제 이걸 어떻게 lcs 문자열로 복원할까요?
 * 그냥 역순으로 인덱스 돌리면 됩니다.. 위에서 두 문자열이 같을 때와 다를 때를 모두 정해놨죠?
 * 그럼 반대로 인덱스 끝부터 돌리는데, str[i - 1] === str[j - 1] => lcs = str[i - 1] + lcs..
 * 여기서도 두 문자열이 다르다면, 우리 위에서 max로 dp 테이블을 채웠죠? 그럼 큰 쪽 따라서 이동하면 됩니다.
 */

const strA = input[0].trim();
const strB = input[1].trim();

const lenA = strA.length;
const lenB = strB.length;

// 공통 부분 수열이 없을 수도 있으니 초기값은 모두 0
const dp = Array.from({ length: lenA + 1 }, () => Array(lenB + 1).fill(0));

for (let i = 1; i <= lenA; i++) {
  for (let j = 1; j <= lenB; j++) {
    // 두 문자열이 같다면.
    if (strA[i - 1] === strB[j - 1]) {
      dp[i][j] = dp[i - 1][j - 1] + 1;
    } else {
      dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
    }
  }
}

let lcs = "";

let i = lenA;
let j = lenB;

// 역추적..
while (i > 0 && j > 0) {
  if (strA[i - 1] === strB[j - 1]) {
    lcs = strA[i - 1] + lcs;
    i--;
    j--;
  } else {
    if (dp[i - 1][j] > dp[i][j - 1]) {
      i--;
    } else {
      j--;
    }
  }
}

console.log(lcs);
