const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "input.txt")
  .toString()
  .trim()
  .split("\n");

const [n, ...arr] = input;

const map = new Map();

for (let i = 0; i < Number(n); i++) {
  map.set(arr[i].trim(), (map.get(arr[i].trim()) || 0) + 1);
}

console.log(
  [...map].sort(
    ([nameA, countA], [nameB, countB]) =>
      countB - countA || nameA.localeCompare(nameB)
  )[0][0]
);
