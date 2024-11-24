const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "input.txt")
  .toString()
  .trim()
  .split("\n");

const n = Number(input[0]);

const layout = Array.from(Array(10), () => Array(20).fill("."));

for (let i = 1; i <= n; i++) {
  const row = input[i][0].charCodeAt(0) - 65;
  const col = parseInt(input[i].slice(1), 10) - 1;

  layout[row][col] = "o";
}

let result = "";

layout.forEach((row) => (result += row.join("") + "\n"));

console.log(result);
