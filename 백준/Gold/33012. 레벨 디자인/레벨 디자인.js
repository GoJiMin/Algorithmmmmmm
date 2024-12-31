const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "input.txt")
  .toString()
  .trim()
  .split("\n");

class Deque {
  constructor(MX) {
    this.head = MX;
    this.tail = MX;
    this.arr = Array(MX * 2);
  }

  push_front(x) {
    this.arr[this.head--] = x;
  }

  push_back(x) {
    this.arr[++this.tail] = x;
  }

  toArray() {
    return this.arr.slice(this.head + 1, this.tail + 1);
  }
}

/**
 * DP..?
 *
 * 인접한 2개를 동시에 못 고른다는 말이 연속으로 2개 못 고른다..?
 * 그럼 이전에 골랐으면 이번엔 못 고르고, 그 이전에 골랐으면 이번 거 고를 수 있다?
 * dp[i] = max(dp[i - 1], dp[i - 2] + 지금값)
 *
 * 근데 최대점수를 최소화..? 그냥 큰 수끼리 붙어있으면 못 고르는 거 아닌가
 *
 * N이 10일 때 10 9 8이 고르면 큰 수들인데 서로 붙어있으면 다 못 고르니까 적어질 거 같은데..
 * 1 2 3 => 1 고르고 3 고르면 4.
 *
 * 라고 생각했는데 아니었네요~ 아 짜증나
 *
 * 지그재그?
 *
 * i % 2 === 1일 때 작은 수 넣고 아님 큰 수 넣고
 *
 * 1 2 3 4 5
 *
 * 1 5 2 4 3 ?
 *
 * 라고 생각했는데 또 아니었네요~ 아 진짜 짜증나네..
 * 생각해보니까 이렇게 구현하면 1 4 2 3이 나오는데 사실 1 4 3 2가 답이지 않나? 6이 최소니까
 *
 * 그러면 1, 2, 3, 4, ... N의 순열에서 큰 수끼리 죄다 붙여버려야될 거 같은디..
 * [] [4] [4, 3] [2, 4, 3] [2, 4, 3, 1]? 앞뒤앞뒤
 */

const N = Number(input[0]);

const deque = new Deque(N);

for (let i = 0; i < N; i++) {
  if (i % 2 === 0) {
    deque.push_front(N - i);
  } else {
    deque.push_back(N - i);
  }
}

const ans = deque.toArray();

const dp = new Array(N + 1).fill(0);
dp[1] = ans[0]; // 처음엔 첫 번째 아이템 집음.

// 첫 번째 아이템 안 집고 두 번째 아이템 집을 수도 있음.
if (N >= 2) {
  dp[2] = Math.max(ans[0], ans[1]);
}

for (let i = 3; i <= N; i++) {
  // 점화식 dp[i] = max(dp[i - 1], dp[i - 2] + 지금 거)
  dp[i] = Math.max(dp[i - 1], dp[i - 2] + ans[i - 1]);
}

const maxScore = dp[N];

console.log(ans.join(" ") + "\n" + maxScore);
