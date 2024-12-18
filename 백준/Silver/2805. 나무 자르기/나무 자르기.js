const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "input.txt")
  .toString()
  .trim()
  .split("\n");

const [_, m] = input[0].split(" ").map(Number);
const woods = input[1].split(" ").map(Number);

/**
 * 랜선 자르기랑 똑같은 문제 아닌가요?
 *
 * 이번엔 만들 수 있냐 없냐를 자른 길이로 판단해야겠네요..
 *
 */

let minHeight = 1;
let maxHeight = Math.max(...woods);

let ans = 0;

while (minHeight <= maxHeight) {
  const mid = Math.floor((minHeight + maxHeight) / 2);

  let cuttedTotal = 0;

  woods.forEach((wood) => {
    const cutted = wood - mid;

    if (cutted > 0) cuttedTotal += cutted;
  });

  if (cuttedTotal >= m) {
    ans = mid;
    minHeight = mid + 1;
  } else {
    maxHeight = mid - 1;
  }
}

console.log(ans);
