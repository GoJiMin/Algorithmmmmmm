const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "input.txt")
  .toString()
  .trim()
  .split("\n");

const arrN = input[1].trim().split(" ");
const arrM = input[3].trim().split(" ");

const map = new Map();

arrN.forEach((num) => map.set(num));

let ans = "";

arrM.forEach((num) => {
  if (map.has(num)) {
    ans += "1\n";
  } else {
    ans += "0\n";
  }
});

console.log(ans);
