const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "input.txt")
  .toString()
  .trim();

const n = Number(input);

function solution(n) {
  if (n === 3) {
    return ["***", "* *", "***"];
  }

  const result = [];

  const stars = solution(n / 3);

  for (let i = 0; i < stars.length; i++) {
    result.push(stars[i].repeat(3));
  }

  for (let i = 0; i < stars.length; i++) {
    result.push(stars[i] + " ".repeat(n / 3) + stars[i]);
  }

  for (let i = 0; i < stars.length; i++) {
    result.push(stars[i].repeat(3));
  }

  return result;
}

console.log(solution(+n).join("\n"));
