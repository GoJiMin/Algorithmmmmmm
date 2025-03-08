const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "input.txt")
  .toString()
  .trim()
  .split("\n");

let idx = 0;

const result = [];

// c가 가장 긴 변
function isRightAngle(a, b, c) {
  if (a ** 2 + b ** 2 === c ** 2) return true;
  else return false;
}

while (true) {
  const [a, b, c] = input[idx++].split(" ").map(Number);

  if (!a && !b && !c) break;

  // 가장 긴 변의 제곱이 나머지 변의 제곱의 합과 같으면 직각 삼각형
  if (a < b && c < b && isRightAngle(a, c, b)) result.push("right");
  else if (b < a && c < a && isRightAngle(b, c, a)) result.push("right");
  else if (a < c && b < c && isRightAngle(a, b, c)) result.push("right");
  else result.push("wrong");
}

console.log(result.join("\n"));
