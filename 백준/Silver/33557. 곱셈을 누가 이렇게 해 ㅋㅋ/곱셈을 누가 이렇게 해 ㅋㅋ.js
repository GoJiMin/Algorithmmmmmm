const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "input.txt")
  .toString()
  .trim()
  .split("\n");

/**
 * 이중 for문은 택도 없을 거 같은디..
 *
 * A, B 둘 중에 자릿수 더 긴 거 골라서 비교해야할듯?
 *
 * 아마 10의 6승이면 자릿수마다 올림 없이 이어붙이면 초과할 거 같으니까 BigInt써야할듯?
 */

const n = Number(input[0]);
const result = [];

for (let i = 1; i <= n; i++) {
  const [a, b] = input[i].trim().split(" ");

  const normal = BigInt(a) * BigInt(b);

  const lenA = a.length;
  const lenB = b.length;
  const maxLen = Math.max(lenA, lenB);
  let wrong = "";

  for (let j = 0; j < maxLen; j++) {
    const hasA = j < lenA;
    const hasB = j < lenB;

    if (hasA && hasB) {
      const digitA = Number(a[lenA - 1 - j]);
      const digitB = Number(b[lenB - 1 - j]);
      wrong = (digitA * digitB).toString() + wrong;
    } else if (hasA) {
      wrong = a[lenA - 1 - j] + wrong;
    } else if (hasB) {
      wrong = b[lenB - 1 - j] + wrong;
    }
  }

  result.push(normal === BigInt(wrong) ? 1 : 0);
}

console.log(result.join("\n"));
