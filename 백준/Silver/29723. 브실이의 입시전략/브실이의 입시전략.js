const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "input.txt")
  .toString()
  .trim()
  .split("\n");

/**
 * 세계 최고의 명문 대학 브실대학.....
 * 특정 과목들의 합을 통해 서류 합격여부를 가린다.
 * n의 수만큼 과목, 점수를 입력 받는다.
 * m은 브실 대학에서 요구하는 과목의 수.
 * k는 브실 대학에서 공개한 과목의 수.
 *
 * 그럼 우선 맵 객체에 과목 배열을 순회하며 key, value 형태로 과목, 점수를 저장.
 * 이후에 n부터 배열을 순회하며 공개한 과목에 대한 점수를 먼저 카운팅.
 */

const [nmk, ...arr] = input;

const [n, m, k] = nmk.split(" ").map(Number);
const subjects = arr.map((el) => {
  const [subject, score] = el.trim().split(" ");
  return [subject, Number(score)];
});

const map = new Map();

// 각 과목, 점수를 저장
for (let i = 0; i < n; i++) {
  map.set(subjects[i][0], subjects[i][1]);
}

let pre = 0;
// 공개된 과목을 맵 객체에서 미리 저장.
for (let i = n; i < subjects.length; i++) {
  // 단, 공개된 과목과 비공개된 과목은 브실이가 수강한 과목에 모두 포함되어 있으며, 과목은 중복되지 않는다.
  // 예외 처리 없이 그냥 get해도 됨.
  pre += map.get(subjects[i][0]);

  // 이후에 미리 공개된 점수는 합하지 않기 위해..
  map.delete(subjects[i][0]);
}

// 최소, 최대 값에 접근하기 위해 정렬..
const sortedSubjects = [...map].sort((a, b) => a[1] - b[1]);

// 공개된 과목의 합을 할당.
let max = pre;
let min = pre;

let idx = m - k;
let lidx = 0;
let ridx = sortedSubjects.length - 1;

while (idx--) {
  max += sortedSubjects[ridx--][1];
  min += sortedSubjects[lidx++][1];
}

console.log(min, max);
