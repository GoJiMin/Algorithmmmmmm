const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "input.txt")
  .toString()
  .trim();

const parts = input.split("-");

const summedParts = [];

for (let i = 0; i < parts.length; i++) {
  const addParts = parts[i].split("+");

  let sum = 0;

  for (let j = 0; j < addParts.length; j++) {
    sum += Number(addParts[j]);
  }

  summedParts.push(sum);
}

let ans = summedParts[0];

for (let i = 1; i < summedParts.length; i++) {
  ans -= summedParts[i];
}

console.log(ans);
