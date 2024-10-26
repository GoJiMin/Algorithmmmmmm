const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "input.txt")
  .toString()
  .trim()
  .split("\n");

const [n, ...arr] = input;

// 이름, 국, 영, 수
const students = arr.map((el) => el.trim().split(" "));

/*
  1. 국어 점수가 감소하는 순서로
  2. 국어 점수가 같으면 영어 점수가 증가하는 순서로
  3. 국어 점수와 영어 점수가 같으면 수학 점수가 감소하는 순서로
  4. 모든 점수가 같으면 이름이 사전 순으로 증가하는 순서로
 */

students.sort(
  ([nameA, korA, engA, mathA], [nameB, korB, engB, mathB]) =>
    +korB - +korA ||
    +engA - +engB ||
    +mathB - +mathA ||
    (nameA > nameB ? 1 : -1)
);

let result = "";

for (let i = 0; i < +n; i++) {
  result += students[i][0] + "\n";
}

console.log(result);
