const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "input.txt")
  .toString()
  .trim()
  .split("\n");

const [n, k] = input[0].split(" ").map(Number);

const arr = [];

/**
 * dp 문제는 볼 때마다 진짜 다 다른 문제 같아보여서 너무 힘듭니다..
 *
 * 일단 각 배열의 첫 번째 원소는 무게, 두 번째 원소는 가치입니다.
 * 그럼 dp 테이블의 인덱스를 순서가 아닌 무게로 잡아야 될 거 같은데..
 *
 * 예를 들어 [6, 13]이라면
 * 무게가 7일 때의 가치는 무게 1에 해당하는 물건과 무게가 6이며 가치가 13인 물건을 더한 가치일 겁니다.
 * => dp[7] = max(dp[7], dp[1] + 13) 이렇게 말이죠..??
 *
 * 그럼 각 물건에 해당하는 배열을 반복문으로 받으면..
 * [w, v] 형태로 받을 수 있습니다.
 *
 * 그럼 역순으로 k부터 w까지 dp 테이블을 순회하면 최대 가치를 조회할 수 있겠죠?
 *
 * k = 7, w = 6, v = 13일 경우 이렇게 돌아갈 겁니다.
 *
 * dp[7] = max(dp[7], dp[7 - 6] + 13) = 13;
 * dp[6] = max(dp[6], dp[6 - 6] + 13) = 13;
 *
 * k = 7, w = 4, v = 8일 경우 이렇게 돌아갈 겁니다.
 *
 * dp[7] = max(dp[7], dp[7 - 4] + 8) = max(13, 0 + 8) = 13
 * dp[6] = max(dp[6], dp[6 - 4] + 8) = max(13, 0 + 8) = 13
 * dp[5] = max(dp[5], dp[5 - 4] + 8) = max(0, 0 + 8) = 8
 * dp[4] = max(dp[4], dp[4 - 4] + 8) = max(0, 0 + 8) = 8
 *
 * ...
 *
 * 이렇게 각 무게별로 최대값을 얻어낼 수 있겠죠..?
 */

for (let i = 1; i <= n; i++) {
  arr.push(input[i].split(" ").map(Number));
}

const dp = Array(k + 1).fill(0); // 최대 무게까지의 테이블을 생성.. 초기값은 모두 0으로

for (let i = 0; i < n; i++) {
  const [w, v] = arr[i];

  for (let j = k; j >= w; j--) {
    dp[j] = Math.max(dp[j], dp[j - w] + v);
  }
}

console.log(Math.max(...dp));
