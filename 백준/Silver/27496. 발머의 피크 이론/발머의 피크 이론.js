const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "input.txt")
  .toString()
  .trim()
  .split("\n");

/**
 * 누적합에 슬라이딩 윈도우 문제인 것 같네요..
 *
 * 일단 구간합 개념으로 보자면
 * 1 2 3 4 5 배열의 누적합 배열은 1 3 6 10 15 겠죠?
 * 근데 여기서 3 4에 대한 누적합 구간을 보고 싶다면? 즉, 인덱스 2부터 3까지의 구간합을 보고 싶다면
 * prefix[3] - prefix[1]로 간편하게 구할 수 있죠?
 *
 * 이 개념을 써서 풀면 되겠네요.. 문제에선 지속시간 l이 주어지니 누적합을 싹 다 구해놓고
 * prefix[i] - prefix[i - l] 이런식으로 구하면 되겠네요.
 */

// const [n, l] = input[0].split(" ").map(Number);
// const arr = input[1].split(" ").map(Number);

// for (let i = 1; i < n; i++) {
//   arr[i] = arr[i - 1] + arr[i];
// }

// let cnt = 0;

// for (let i = 0; i < n; i++) {
//   const cur = arr[i] - (arr[i - l] || 0);
//   const concentration = cur * 0.001;

//   if (concentration >= 0.129 && concentration <= 0.138) {
//     cnt++;
//   }
// }

// console.log(cnt);

/**
 * 위에까지가 누적합 개념...이고,, 이번엔 슬라이딩 윈도우로 풀어봅시다.
 * 근데 참 이름이 거창하네요.. 어쨌든! 슬라이딩 윈도우를 사용하면 별도의 누적합 배열을 구해놓지 않으니
 * 메모리를 덜 쓰겠죠? 그냥 초기 값 구해놓고 옆으로 밀어버립시다.
 */

const [n, l] = input[0].split(" ").map(Number);
const arr = input[1].split(" ").map(Number);

let sum = 0; // 최초의 혈중 알코올 농도는 0이라고 문제에 써있으니까..
let cnt = 0;

// l 만큼의 지속시간이니까 초기의 윈도우?는 l만큼 더해놓으면 되겠죠?
for (let i = 0; i < l; i++) {
  sum += arr[i];

  if (sum >= 129 && sum <= 138) cnt++;
}

for (let i = l; i < n; i++) {
  // 오른쪽으로 밀어야되니까..
  sum += arr[i];
  sum -= arr[i - l];

  if (sum >= 129 && sum <= 138) cnt++;
}

console.log(cnt);
