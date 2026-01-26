const input = require('fs')
  .readFileSync(process.platform === 'linux' ? '/dev/stdin' : 'input.txt')
  .toString()
  .trim()
  .split('\n');

/**
 * 그냥 1부터 계속 수를 만들어보다가 최대 사용 횟수를 초과한 순간 이게 짝수인지 홀수인지 판단해서 출력?
 *
 * 우선 짝순이던, 홀순이던 모두 각 수를 만들 때 주어진 정수를 최소한으로 사용하는게 서로에게 유리할 거 같은데..
 *
 * 테이블의 범위는..? 보니까 정수는 1000이 제일 크고, 그럼 최악의 경우
 * 1, 1000이 주어지고 k가 50이라면 50000까지 잡아놓기?
 */

const n = Number(input[0]);
const arr = input[1].split(' ').map(Number);
const k = Number(input[2]);

const MAX_VAL = 50002; // 항상 인덱스를 2 정도 더 주게 되는듯..
// 최솟값 찾아야 하니까 무한으로?
const dp = Array(MAX_VAL).fill(Infinity);

dp[0] = 0;

for (const x of arr) {
  for (let j = x; j < MAX_VAL; j++) {
    dp[j] = Math.min(dp[j], dp[j - x] + 1);
  }
}

for (let i = 1; i < MAX_VAL; i++) {
  if (dp[i] > k) {
    if (i % 2 === 0) {
      console.log('holsoon win at ' + i);
    } else {
      console.log('jjaksoon win at ' + i);
    }

    break;
  }
}
