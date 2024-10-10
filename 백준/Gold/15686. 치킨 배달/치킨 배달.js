const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "input.txt")
  .toString()
  .trim()
  .split("\n");

const [nm, ...arr] = input;

const [n, m] = nm.split(" ").map(Number);
const boards = arr.map((el) => el.trim().split(" "));

const house = [];

const chicken = [];

// boards에서 치킨집과 가정집을 각 배열에 넣기.
for (let i = 0; i < n; i++) {
  for (let j = 0; j < n; j++) {
    if (boards[i][j] === "1") house.push([i, j]);
    if (boards[i][j] === "2") chicken.push([i, j]);
  }
}

/**
  치킨집의 좌표를 받아 모든 집과의 거리를 계산해서 최소 치킨 거리를 반환.

  구현해야할 항목
  1. 배열이 주어졌을 때 각 배열 원소에 대해 모든 house 배열 원소와의 거리를 계산.
    - 주의할 점으로 계산은 하되, 각 house 베열의 원소들은 더 가까운 치킨집이 존재하니 houseDist 배열을 선언.
 */
function checkDistance(chickenArr) {
  // 각 집의 최소 거리를 저장할 배열.
  const houseDist = Array(house.length).fill(Number.MAX_SAFE_INTEGER);

  for (let i = 0; i < chickenArr.length; i++) {
    const [r2, c2] = chickenArr[i];

    for (let j = 0; j < house.length; j++) {
      const [r1, c1] = house[j];

      const curDist = Math.abs(r1 - r2) + Math.abs(c1 - c2);

      if (houseDist[j] > curDist) houseDist[j] = curDist;
    }
  }

  // 최종적으로 각 집마다 최소 치킨거리를 가지게 됨.
  return houseDist.reduce((acc, cur) => (acc += cur), 0);
}

// 어떻게 구현하면 좋을까?
/**
 * 생각 중인 방법은 백트래킹 방식으로 구현.
 * why?
 * 결국 m개의 치킨집을 선택했을 때 최소 치킨 거리가 나오는 상황을 찾아야됨.
 * 그럼 치킨집이 만약 5개인데 m이 3이라면?
 * 1, 2, 3, 4, 5을 치킨집으로 생각했을 때 다음과 같이 골라야됨.
 * 1 2 3, 1 2 4, 1 2 5, 1 3 4, 1 3 5, 1 4 5, ... 3 4 5
 * 어 이거 완전 백트래킹이잖아?
 */

let minDist = Number.MAX_SAFE_INTEGER;

const stack = [];

function solution(k, idx) {
  if (k === m) {
    const dist = checkDistance(stack);

    minDist = Math.min(minDist, dist);

    return;
  }

  for (let i = idx; i < chicken.length; i++) {
    stack[k] = chicken[i];
    solution(k + 1, i + 1);
  }
}

solution(0, 0);

console.log(minDist);
