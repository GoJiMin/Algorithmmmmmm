const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "input.txt")
  .toString()
  .trim()
  .split("\n");

const table = Array.from({ length: 21 }, () =>
  Array.from({ length: 21 }, () => Array(21).fill(0))
); // a, b, c는 최대 20까지만 나옴.. 21 * 21 * 21인 table이 필요.

function dp(a, b, c) {
  // Base Case..
  if (a <= 0 || b <= 0 || c <= 0) return 1;
  if (a > 20 || b > 20 || c > 20) return dp(20, 20, 20);
  if (table[a][b][c] > 0) return table[a][b][c]; // 이미 계산했으면 돌아가.

  if (a < b && b < c) {
    // a < b < c면
    table[a][b][c] = dp(a, b, c - 1) + dp(a, b - 1, c - 1) - dp(a, b - 1, c);

    return table[a][b][c];
  }

  // 아니면?
  table[a][b][c] =
    dp(a - 1, b, c) +
    dp(a - 1, b - 1, c) +
    dp(a - 1, b, c - 1) -
    dp(a - 1, b - 1, c - 1);

  return table[a][b][c];
}

const ans = [];

for (const abc of input) {
  const [a, b, c] = abc.split(" ").map(Number);

  // 종료 조건.
  if (a === -1 && b === -1 && c === -1) break;

  const result = dp(a, b, c);

  ans.push(`w(${a}, ${b}, ${c}) = ${result}`);
}

console.log(ans.join("\n"));
