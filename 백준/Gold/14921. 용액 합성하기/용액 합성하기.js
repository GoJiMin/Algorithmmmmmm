const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "input.txt")
  .toString()
  .trim()
  .split("\n");

const n = Number(input[0]);
const arr = input[1].split(" ").map(Number);

function lower_bound(target) {
  let st = 0;
  let en = n - 1;

  while (st <= en) {
    const mid = Math.floor((st + en) / 2);

    if (target <= arr[mid]) {
      en = mid - 1;
    } else {
      st = mid + 1;
    }
  }

  return st;
}

let solution1 = Number.MAX_SAFE_INTEGER;
let solution2 = Number.MAX_SAFE_INTEGER;

function update(curSolution, candidate, currentVal) {
  const sumAbs = Math.abs(curSolution + candidate);

  if (sumAbs < currentVal) {
    [solution1, solution2] = [curSolution, candidate];
  }
}

arr.forEach((curSolution, curIdx) => {
  const lower_idx = lower_bound(-curSolution);

  const candidates = [lower_idx - 1, lower_idx, lower_idx + 1];

  candidates.forEach((idx) => {
    if (idx !== curIdx)
      update(curSolution, arr[idx], Math.abs(solution1 + solution2));
  });
});

console.log(solution1 + solution2);
