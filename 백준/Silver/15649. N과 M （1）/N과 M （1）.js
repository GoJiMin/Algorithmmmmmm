const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "input.txt")
  .toString()
  .trim()
  .split(" ");

const [n, m] = input;

const arr = [];
const isUsed = Array(1000).fill(false);

let result = "";

function solution(k) {
  if (k === +m) {
    const tmp = [];

    for (let i = 0; i < +m; i++) {
      tmp.push(arr[i]);
    }

    result += `${tmp.join(" ")}` + "\n";

    return;
  }

  for (let i = 1; i <= +n; i++) {
    if (!isUsed[i]) {
      arr[k] = i;
      isUsed[i] = true;
      solution(k + 1);
      isUsed[i] = false;
    }
  }
}

solution(0);
console.log(result);
