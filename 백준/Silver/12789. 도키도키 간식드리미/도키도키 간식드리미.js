const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "input.txt")
  .toString()
  .trim()
  .split("\n");

const n = Number(input[0]);
const students = input[1].trim().split(" ").map(Number);

const stack = [];

let cur = 1;

for (let i = 0; i < n; i++) {
  // 만약 현재 학생이 순서대로 왔으면?
  if (students[i] === cur) {
    // 순서를 증가.
    cur++;
  } else {
    // 그게 아니면 스택에 넣어놓기.
    stack.push(students[i]);
  }

  // 스택 한 번 돌리기.
  while (true) {
    if (stack.at(-1) === cur) {
      stack.pop();
      cur++;
    } else {
      break;
    }
  }
}

if (stack.length === 0) {
  console.log("Nice");
} else {
  console.log("Sad");
}
