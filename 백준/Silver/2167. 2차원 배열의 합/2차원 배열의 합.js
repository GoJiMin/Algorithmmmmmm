const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "input.txt")
  .toString()
  .trim()
  .split("\n");

/**
 * 자.. 만약에 (2, 3) 인덱스까지 누적된 값은 어떻게 구할 수 있을까요?
 *
 * (2, 3)의 값에 (2, 2)까지 누적된 값과, (1, 3)까지 누적된 값을 더하고 중복된 (1, 2) 값을 빼줘야겠죠?
 */

const [n, m] = input[0].split(" ").map(Number);
const arr = [];

for (let i = 1; i <= n; i++) arr.push(input[i].split(" ").map(Number));
const prefix = Array.from({ length: n + 1 }, () => Array(m + 1).fill(0));

for (let i = 1; i <= n; i++) {
  for (let j = 1; j <= m; j++) {
    prefix[i][j] =
      arr[i - 1][j - 1] +
      prefix[i][j - 1] +
      prefix[i - 1][j] -
      prefix[i - 1][j - 1];
  }
}

const k = Number(input[n + 1]);

const result = [];

for (let i = n + 2; i <= n + k + 1; i++) {
  const [x1, y1, x2, y2] = input[i].split(" ").map(Number);

  result.push(
    prefix[x2][y2] -
      prefix[x1 - 1][y2] -
      prefix[x2][y1 - 1] +
      prefix[x1 - 1][y1 - 1]
  );
}

console.log(result.join("\n"));
