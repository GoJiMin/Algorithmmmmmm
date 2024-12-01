const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "input.txt")
  .toString()
  .trim()
  .split("\n");

function print(k) {
  if (k === 1) {
    return "-";
  }

  let result = "";

  const n = k / 3;

  const dots = print(n);

  result = dots + " ".repeat(n) + dots;

  return result;
}

const ans = [];

input.forEach((n) => {
  ans.push(print(3 ** Number(n)));
});

console.log(ans.join("\n"));
