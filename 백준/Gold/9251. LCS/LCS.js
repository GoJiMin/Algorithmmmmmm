const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "input.txt")
  .toString()
  .trim()
  .split("\n");

const strA = input[0].trim();
const strB = input[1].trim();

const lenA = strA.length;
const lenB = strB.length;

// 테이블 정의..
const dp = Array.from({ length: lenA + 1 }, () => Array(lenB + 1).fill(0));

/**
 * 일단 LCS라는 문제 자체를 이해하는데 머리가 터져버릴뻔했습니다.. 한시간은 머리 싸매고 고생한듯..
 *
 * 우선 dp[i][j]는 strA의 i까지의 문자와 strB의 j까지의 문자의 LCS 길이입니다..
 *
 * 그럼 strA[i - 1] === strB[j - 1] => 즉, 두 문자열이 같다면.
 * dp[i][j] = dp[i - 1][j - 1] + 1 => 이전까지의 LCS 길이에 1을 더합니다.
 *
 * 그럼 strA[i - 1] !== strB[j - 1] => 즉, 두 문자열이 같지 않다면.
 * dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]) 
   => strA의 i - 1, strB의 j까지의 LCS와 strA의 i, strB의 j - 1까지의 LCS 길이 중 큰 값을 선택합니다.

   이게 이해가 좀 안 갔었는데, 현재 입력 예제를 보고 이해해보자면.
   ACAYKP, CAPCAK에 대해 i = 3, j = 3일 때를 봅시다.

   strA[2] = A, strB[2] = P로 두 문자열은 다릅니다.
   그럼 dp[3][3] = max(dp[2][3], dp[3][2])에 해당하는 값을 찾게 됩니다.
   
   직관적으로 봅시다. 
   
   자 A가 2번째까지, B가 3번째까지라면 어떻게 구성될까요?
   A = AC, B = CAP 입니다. 이 때 LCS의 길이는 A로 1입니다.

   그럼 A가 3번째까지, B가 2번째까지라면 어떻게 구성될까요?
   A = ACA, B = CA 입니다. 이 때 LCS의 길이는 CA로 2입니다.

   그럼 당연히 CA 골라야겠죠?

   하... DP 문제는 정말 점화식을 잘 세우고 그냥 너가 알아서 채워라~ 식으로 풀어야지 끝도 없이 따라가다간 머리가 터지겠습니다..

 */

// 1부터 시작하는 이유는 dp 테이블이랑 매칭시키기 위해..
for (let i = 1; i <= lenA; i++) {
  for (let j = 1; j <= lenB; j++) {
    if (strA[i - 1] === strB[j - 1]) {
      dp[i][j] = dp[i - 1][j - 1] + 1; // 이전까지의 LCS 길이에 1을 더함.
    } else {
      dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
    }
  }
}

console.log(dp[lenA][lenB]);
