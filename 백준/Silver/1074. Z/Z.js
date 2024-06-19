const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "input.txt")
  .toString()
  .trim()
  .split(" ");

const [n, r, c] = input.map(Number);

// n이 3일 경우 4등분했을 때 n이 2인 사각형으로 나누어짐.
// 그럼 여기서 r = 6, c = 2인 위치의 값은 44로 4등분한 2개의 사각형인 32에 n = 2인 사각형의 위치인 12를 더한 44로 n = k일 때 n = k + 1의 값을 알아낼 수 있음.

function func(n, r, c) {
  // base condition
  if (n === 0) return 0;

  // 한 변 길이의 절반. 즉, 이 half를 이용해 4등분한 사각형 중 몇번째 사각형인지 알아낼 수 있음.
  let half = 1 << (n - 1);

  if (half > r && half > c) return func(n - 1, r, c);
  if (half > r && half <= c) return half * half + func(n - 1, r, c - half);
  if (half <= r && half > c) return 2 * half * half + func(n - 1, r - half, c);

  return 3 * half * half + func(n - 1, r - half, c - half);
}

console.log(func(n, r, c));
