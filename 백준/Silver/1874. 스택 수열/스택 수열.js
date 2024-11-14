const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "input.txt")
  .toString()
  .trim()
  .split("\n")
  .map(Number);

/**
 * 최악의 문제..
 + [1]
 + [1, 2]
 + [1, 2, 3]
 + [1, 2, 3, 4]
 - [1, 2, 3]
 // 여기까지 4 처리 => 3됨.
 - [1, 2]
 // 여기까지 3 처리 => 2됨.
 + [1, 2, 5]
 + [1, 2, 5, 6]
 - [1, 2, 5]
 // 여기까지 6 처리 => 이전 max인 4에 대해 2번 push한 거임. 5됨.
 + [1, 2, 5, 7]
 + [1, 2, 5, 7, 8]
 - [1, 2, 5, 7]
 // 여기까지 8 처리 => 이전 max인 6에 대해 2번 push한 거임. 7됨.
 - [1, 2, 5]
 // 여기까지 7 처리 => 바로 pop해서 5됨.
 - [1, 2]
 // 여기까지 5 처리 => 바로 pop해서 2됨.
 - [1]
 // 여기까지 1 처리 => 바로 pop해서 1됨.
 - []
 // 종료.
 */

/**
  * 어떻게 풀까?
  1. 전역으로 num을 선언함.
  2. 1부터 시작하며 주어진 정수까지 stack에 push.
  3. 도달하면 pop.
  4. pop한 정수가 주어진 정수가 아니라면 바로 NO를 출력하고 종료.
  5. 주어진 정수라면 반복.
  */

const N = input[0];

const stack = [];
let num = 1;

const ans = [];

for (let i = 1; i <= N; i++) {
  while (num <= input[i]) {
    stack.push(num++);
    ans.push("+");
  }

  const poped = stack.pop();

  if (poped !== input[i]) {
    console.log("NO");
    return;
  }

  ans.push("-");
}

console.log(ans.join("\n"));
