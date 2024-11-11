const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "input.txt")
  .toString()
  .trim()
  .split("\n");

const branchoramaList = input.map((el) => el.trim().split(" ").map(Number));

const result = [];

for (const branchorama of branchoramaList) {
  if (branchorama[0] === 0) {
    break;
  }

  const [a, ...level] = branchorama;

  let leaves = 1;

  for (let i = 0; i < a * 2; i += 2) {
    leaves *= level[i];
    leaves -= level[i + 1];
  }

  result.push(leaves);
}

console.log(result.join("\n"));
