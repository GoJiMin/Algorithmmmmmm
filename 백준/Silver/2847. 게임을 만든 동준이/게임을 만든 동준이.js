const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "input.txt")
  .toString()
  .trim()
  .split("\n")
  .map(Number);

/**
 * 문제 읽기가 너무 싫네요...
 * 입력에 대한 출력으로 보니... 현재 레벨의 점수가 다음 레벨 점수보다 낮아야될 거 같습니다..
 * 그럼 인덱스를 끝에서부터 시작해봅시다..
 * 이후 인덱스를 감소시키며 자신보다 인덱스 순위가 낮은 값이 크다면 그만큼 감소시키고 cnt에 추가하면 되지 않을까요?
 */

const [n, ...scores] = input;

let cnt = 0;

for (let i = n - 1; i > 0; i--) {
  const cur = scores[i];
  const prev = scores[i - 1];

  if (cur <= prev) {
    const toGetSmaller = prev - cur + 1;

    scores[i - 1] = prev - toGetSmaller;
    cnt += toGetSmaller;
  }
}

console.log(cnt);
