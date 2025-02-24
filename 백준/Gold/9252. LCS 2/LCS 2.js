const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "input.txt")
  .toString()
  .trim()
  .split("\n");

/**
 * strA[i] == strB[i] then dp[i][j] = dp[i - 1][j - 1] + 1
 * strA[i] != strB[i] then dp[i][j] = max(dp[i - 1][j], dp[i][j - 1])
 */

const strA = input[0].trim();
const strB = input[1].trim();

const lenA = strA.length;
const lenB = strB.length;

const dp = Array.from({ length: lenA + 1 }, () => Array(lenB + 1).fill(0));

for (let i = 1; i <= lenA; i++) {
  for (let j = 1; j <= lenB; j++) {
    if (strA[i - 1] === strB[j - 1]) dp[i][j] = dp[i - 1][j - 1] + 1;
    else dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
  }
}

/**
 * 역추적 어떻게 하지..? 뒤에서부터 dp 값 비교하고 i나 j를 감소시키는 방법?
 */
let maxLen = dp[lenA][lenB];

let lcs = "";
let i = lenA;
let j = lenB;

while (i > 0 && j > 0) {
  // 역추적 과정에서 두 인덱스의 문자열이 같으면 두 인덱스 모두 감소..
  if (strA[i - 1] === strB[j - 1]) {
    lcs = strA[i - 1] + lcs;
    i--;
    j--;
  } else if (dp[i][j - 1] <= dp[i - 1][j]) {
    // 감소시킨 인덱스 값이 더 크면 공통 부분 수열이 해당 문자열 쪽에서 나온거니까.. 감소..
    i--;
  } else {
    j--;
  }
}

if (maxLen === 0) {
  console.log(0);
} else {
  console.log(maxLen + "\n" + lcs);
}
