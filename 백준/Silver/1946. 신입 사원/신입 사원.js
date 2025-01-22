const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "input.txt")
  .toString()
  .trim()
  .split("\n");

/**
 * 흐음.. 하나라도 떨어지면 뽑지 않는다..?
 * 그럼 A 지원자가 서류를 1등 면접을 5등 했다..면 서류는 특정 B 지원자보다 면접은 떨어져도 서류는 앞설테니 뽑는다..?
 * 
  이건 예제 2의 경우인데요.. 제가 생각한 방법은 이래요..
  [1, 4], "O"
  [2, 5], "X"
  [3, 6], "X"
  [4, 2], "O"
  [5, 7], "X"
  [6, 1], "O"
  [7, 3], "X"
  자 우선 이건 예제 입력의 두 번째 테스트 케이스인데요. 우선 튜플의 0번 인덱스는 서류 등수, 1번 인덱스는 면접 등수죠?
  우선 서류 등수로 정렬을 시킵니다.

  그럼요.. 서류 등수로 정렬된 이 배열에서 아래로 내려간다는건.. 어떤 지원자에 비해 서류에서 밀린다는 거죠?
  그럼요.. 서류를 이미 밀렸는데, 직전 지원자에 비해 면접 등수도 밀린다면 뽑히지 못한다는 거죠?
  적어도, 서류 등수는 밀렸으나 직전 지원자에 비해 내가 면접은 이겼다! 라고 말할 수 있어야 뽑힌다는 거니까..
  이건 정렬 + 그리디 알고리즘이 필요하겠네요?

  라고~ 생각했는데 틀렸거덩요

  1
  5
  1 1
  2 3
  3 2
  4 4
  5 5

  이렇게 반례가 들어오면 서류, 면접 모두 1등인 지원자에게 다른 지원자가 모두 떨어지기 때문에 1이 나와야 돼요..
  그러니까 지금 작성한 코드에서 면접 등수를 갱신하면서 뽑아야되겠습니다.
 *
 */

const t = Number(input[0]);

let idx = 1;
const result = [];
for (let test = 0; test < t; test++) {
  const n = Number(input[idx++]);
  const arr = [];

  for (let i = 0; i < n; i++) arr.push(input[idx++].split(" ").map(Number));

  arr.sort((a, b) => a[0] - b[0]);

  let cnt = 0;
  let minInterviewRank = Infinity;
  for (let i = 0; i < n; i++) {
    if (minInterviewRank > arr[i][1]) {
      cnt++;
      minInterviewRank = arr[i][1];
    }
  }

  result.push(cnt);
}

console.log(result.join("\n"));
