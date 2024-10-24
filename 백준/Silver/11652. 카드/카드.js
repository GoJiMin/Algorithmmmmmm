const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "input.txt")
  .toString()
  .trim()
  .split("\n");

const [n, ...arr] = input.map(BigInt);

const arrMap = new Map();

for (let i = 0; i < Number(n); i++) {
  if (arrMap.has(arr[i])) {
    arrMap.set(arr[i], arrMap.get(arr[i]) + 1n);
  } else {
    arrMap.set(arr[i], 1n);
  }
}

let max = 0n;
let ans = 0n;

for (let [key, value] of arrMap.entries()) {
  if (max < value) {
    max = value;
    ans = key;
  } else if (max === value && key < ans) {
    ans = key;
  }
}

console.log(ans.toString());
