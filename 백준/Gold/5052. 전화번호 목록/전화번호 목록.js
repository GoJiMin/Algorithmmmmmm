const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "input.txt")
  .toString()
  .trim()
  .split("\n");

/**
 * 트라이 자료구조에 관련된 문제 같기도 한데,,
 * 이거 정렬로 풀어도 될 거 같죠?
 *
 * 전화번호가 담긴 배열을 단순히 sort() 함수로 정렬하게 되면 길이 같은 거 고려하지 않고, 유니코드 값에 따라 정렬하죠..?
 * 그럼 즉 전화번호가 담긴 배열이 정렬되면 접두어 관계에 있는 번호는 서로 인접하게 붙겠죠?
 * strs = ["911", "97625999", "91125426"] 일 때, 정렬하면 ["911", "91125426", "97625999"]로 정렬되죠?
 * 그럼 우린 911과 91125426을 비교하고, 91125426과 97625999를 비교하면 됩니다.. 쉽네요..
 */

function isConsistent(numbers, n) {
  numbers.sort();

  for (let i = 0; i < n - 1; i++) {
    if (numbers[i + 1].startsWith(numbers[i])) return false;
  }

  return true;
}

const t = Number(input[0]);

let idx = 1;
const result = [];

for (let test = 0; test < t; test++) {
  const n = Number(input[idx++]);
  const arr = [];

  for (let i = 0; i < n; i++) arr.push(input[idx++].trim());

  const val = isConsistent(arr, n) ? "YES" : "NO";
  result.push(val);
}

console.log(result.join("\n"));
