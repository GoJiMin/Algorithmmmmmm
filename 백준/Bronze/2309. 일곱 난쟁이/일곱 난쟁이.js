const input = require("fs")
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n")
  .map(Number);

function solution(arr) {
  const sum = arr.reduce((acc, cur) => acc + cur);

  for (let i = 0; i < input.length; i++) {
    for (let j = i + 1; j < input.length; j++) {
      if (sum - (input[i] + input[j]) === 100) {
        return input
          .filter((num) => num !== input[i] && num !== input[j])
          .sort((a, b) => a - b);
      }
    }
  }
}

solution(input).forEach((num) => console.log(num));
