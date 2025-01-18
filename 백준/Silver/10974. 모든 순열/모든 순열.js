const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "input.txt")
  .toString()
  .trim();

const n = Number(input[0]);

const arr = Array.from({ length: n }, (_, i) => i + 1);
const isUsed = Array(n).fill(false);

const result = [];
const cur = [];

function bt(k) {
  if (k === n) {
    result.push(cur.join(" "));

    return;
  }

  for (let i = 0; i < n; i++) {
    if (!isUsed[i]) {
      isUsed[i] = true;
      cur[k] = arr[i];
      bt(k + 1);
      isUsed[i] = false;
    }
  }
}

bt(0);

console.log(result.join("\n"));
