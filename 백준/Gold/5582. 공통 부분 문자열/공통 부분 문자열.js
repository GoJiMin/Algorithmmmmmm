const input = require('fs')
  .readFileSync(process.platform === 'linux' ? '/dev/stdin' : 'input.txt')
  .toString()
  .trim()
  .split('\n');

const strA = input[0].trim();
const strB = input[1].trim();

const lenA = strA.length;
const lenB = strB.length;

// dp[i][j] = strA의 i번째 문자까지랑 strB의 j번재 문자까지 비교해서 제일 긴 길이
const dp = Array.from({length: lenA + 1}, () => Array(lenB).fill(0));

let maxLen = 0;
for (let i = 1; i <= lenA; i++) {
  for (let j = 1; j <= lenB; j++) {
    if (strA[i - 1] === strB[j - 1]) {
      dp[i][j] = dp[i - 1][j - 1] + 1;
      maxLen = Math.max(maxLen, dp[i][j]);
    } else {
      dp[i][j] = 0; // 연속되지 않음
    }
  }
}

console.log(maxLen);
