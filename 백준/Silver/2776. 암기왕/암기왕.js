const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "input.txt")
  .toString()
  .trim()
  .split("\n");

const t = Number(input[0]);

let idx = 1;

function binary_search(target, arr, size) {
  let st = 0;
  let en = size - 1;

  while (st <= en) {
    const mid = Math.floor((st + en) / 2);

    if (arr[mid] === target) return true;

    if (arr[mid] > target) {
      en = mid - 1;
    } else {
      st = mid + 1;
    }
  }

  return false;
}

for (let i = 0; i < t; i++) {
  const n = Number(input[idx++]);
  const arrN = input[idx++].split(" ").map(Number);

  const m = Number(input[idx++]);
  const arrM = input[idx++].split(" ").map(Number);

  arrN.sort((a, b) => a - b);

  const result = [];

  for (let j = 0; j < m; j++) {
    if (binary_search(arrM[j], arrN, n)) result.push(1);
    else result.push(0);
  }

  console.log(result.join("\n"));
}
