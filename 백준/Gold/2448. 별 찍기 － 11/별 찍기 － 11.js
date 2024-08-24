const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "input.txt")
  .toString()
  .trim();

const n = Number(input);

function solution(n) {
  if (n === 3) {
    return ["  *  ", " * * ", "*****"];
  }

  const stars = solution(n / 2);

  const result = [];

  for (let i = 0; i < stars.length; i++) {
    result.push(" ".repeat(n / 2) + stars[i] + " ".repeat(n / 2));
  }

  for (let i = 0; i < stars.length; i++) {
    result.push(stars[i] + " " + stars[i]);
  }

  return result;
}

console.log(solution(n).join("\n"));
