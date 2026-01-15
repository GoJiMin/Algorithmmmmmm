const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "input.txt")
  .toString()
  .trim()
  .split("\n");

const n = Number(input[0]);
const strs = [];

for (let i = 1; i <= n; i++) strs.push(input[i].trim());

function sum(str) {
  return [...str].reduce((acc, cur) => {
    const toNum = Number(cur);
    if (!isNaN(toNum)) acc += toNum;

    return acc;
  }, 0);
}

strs.sort((a, b) => {
  if (a.length !== b.length) {
    return a.length - b.length;
  }

  const aSum = sum(a);
  const bSum = sum(b);

  return aSum - bSum || a.localeCompare(b);
});

console.log(strs.join("\n"));
