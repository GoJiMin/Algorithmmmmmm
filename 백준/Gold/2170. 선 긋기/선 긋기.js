const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "input.txt")
  .toString()
  .trim()
  .split("\n");

const [n, ...arr] = input;

const lines = arr.map((el) => el.trim().split(" ").map(Number));

/**
 * 선이 겹치면 카운트하지 않습니다.
 * 시작 선이 종료 선보다 값이 낮다면 시작 선의 값이 높아질 때까지 한 선으로 간주합니다.
 * [1, 3], [2, 5], [3, 5]의 선의 총 합 길이는 4가 됩니다.
 */

lines.sort((a, b) => a[0] - b[0] || a[1] - b[1]);

let idx = 1;
let st = lines[0][0];
let en = lines[0][1];

let length = 0;

while (idx < n) {
  // 각 배열의 0번 인덱스는 시작 점, 1번 인덱스는 종료 점.
  // 다음 인덱스의 시작 점이 현재 종료 점보다 값이 작거나 같다면 같은 선이므로 종료 점을 업데이트.
  if (lines[idx][0] <= en) {
    if (en < lines[idx][1]) {
      en = lines[idx][1];
    }

    idx++;
    continue;
  }

  // 시작 점이 이전 종료 점보다 값이 크다면 겹치지 않는 선이므로 길이를 더해준다.
  length += en - st;

  st = lines[idx][0];
  en = lines[idx][1];
}

length += en - st;

console.log(length);
