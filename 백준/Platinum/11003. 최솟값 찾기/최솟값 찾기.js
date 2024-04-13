const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "script.txt")
  .toString()
  .trim()
  .split("\n")
  .map((el) => el.trim().split(" ").map(Number));

const [N, L] = input[0];
const A = input[1];
const deque = [];
let outputBuffer = ""; // 출력 버퍼
let start = 0; // 덱의 시작 인덱스

for (let i = 0; i < N; i++) {
  // 덱의 첫 번째 요소가 윈도우를 벗어난 경우 시작 인덱스를 증가
  if (deque.length && deque[start] < i - L + 1) {
    start++;
  }

  // 새 요소가 이전 요소들보다 작을 경우, 그 요소들을 제거
  while (deque.length > start && A[deque[deque.length - 1]] >= A[i]) {
    deque.pop();
  }

  // 현재 인덱스를 덱에 추가
  deque.push(i);

  outputBuffer += A[deque[start]] + " ";
  if ((i - L + 1 + 1) % 10000 === 0) {
    // 10,000개 단위로 버퍼 출력
    process.stdout.write(outputBuffer);
    outputBuffer = "";
  }
}

// 남아 있는 출력 버퍼 비우기
if (outputBuffer.length > 0) {
  process.stdout.write(outputBuffer.trimEnd());
}
