const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "input.txt")
  .toString()
  .trim()
  .split("\n");

let idx = 0;
const result = [];

while (true) {
  // 마지막 줄이 0이니까 그냥 마지막에서 탈출
  if (idx >= input.length - 1) break;

  const [n, ...heights] = input[idx++].split(" ").map(Number);

  const stack = [];

  let maxArea = 0;

  for (let i = 0; i < n; i++) {
    // startIdx를 기억해야 모든 넓이를 구할 수 있음.
    const current = {
      height: heights[i],
      startIdx: i,
    };

    // 스택이 비어있지 않고, 스택의 top보다 값이 같거나 작을 경우.
    while (stack.length > 0 && stack.at(-1).height >= current.height) {
      const prev = stack.pop();

      // 이전 높이, 이전 시작 인덱스를 현재 인덱스에서 빼면 해당 넓이를 구할 수 있음.
      /**
       * ex) 예제 1의 경우
       stack = [
        { height: 4, startIdx: 2 },
        { height: 5, startIdx: 3 }
       ]
       위와 같이 스택이 구성되어 있을 때 i가 4, heights[i] = 1이 됐을 때 
       const prev = { height: 5, startIdx: 3 }으로 
       5 * (4 - 3) = 5로 넓이 5의 사각형을 구할 수 있고, 이후 pop을 통해
       const prev = { height: 4, startidx: 2 }으로
       4 * (4 - 2) = 8로 넓이 8의 사각형을 구할 수 있게 된다.
       */
      maxArea = Math.max(maxArea, prev.height * (i - prev.startIdx));
      current.startIdx = prev.startIdx;
    }

    stack.push(current);
  }

  // 마지막 stack 원소를 처리하기 위함.
  while (stack.length > 0) {
    const prev = stack.pop();

    maxArea = Math.max(maxArea, prev.height * (n - prev.startIdx));
  }

  result.push(maxArea);
}

console.log(result.join("\n"));
