const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "input.txt")
  .toString()
  .trim()
  .split("\n");

/**
 * 양수 영역에 해당하는 용액은 산성.
 * 음수 영역에 해당하는 용액은 알칼리성.
 *
 * 두 용액을 섞어 특성값이 0에 가장 가까운 용액을 만들어야됩니다..
 *
 * 우선 입력으로 주어지는 예제는 모두 정렬된 상태로 주어지며, 모두 산성일 수도 있고, 모두 알칼리성일 수도 있습니다..
 *
 * 전체 용액의 수 N (2 <= N <= 100,000)
 *
 * 제가 생각했을 때, 모든 용액에 대한 절대값. 즉, solution[i]의 -solution[i]에 해당하는 값들을 찾아 갱신해보면 어떨까요..?
 */

const n = Number(input[0]);
const solutionArr = input[1].split(" ").map(Number);

/**
 * 전에 lower_bound, upper_bound 구현해서 배열에서 등장한 횟수를 계산했었죠?
 * lower_bound는 target 이상의 값이 처음 등장하는 인덱스를 반환하고, upper_bound는 target 값을 초과한 값의 인덱스를 반환합니다.
 *
 * 그럼 위에서 생각해본 solution[i]의 반대되는 값에 해당하는 인덱스를 반환하겠죠?
 * 못 찾는다고 하더라도 적어도 이 절대값에 가장 근접한 값의 인덱스를 반환하게 될 것입니다..
 */
function lower_bound(target) {
  let st = 0;
  let en = n - 1;

  while (st <= en) {
    const mid = Math.floor((st + en) / 2);

    if (target <= solutionArr[mid]) {
      en = mid - 1;
    } else {
      st = mid + 1;
    }
  }

  return st;
}

let solution1 = Number.MAX_SAFE_INTEGER;
let solution2 = Number.MAX_SAFE_INTEGER;

function update(curSolution, candidate, currentVal) {
  const sumAbs = Math.abs(curSolution + candidate);

  if (sumAbs < currentVal) {
    [solution1, solution2] = [curSolution, candidate];
  }
}

solutionArr.forEach((curSolution, curIdx) => {
  const lower_idx = lower_bound(-curSolution);

  // -99에 대한 -(-99) 값은 lower_bound의 특성상 st가 역전될 때 idx가 5로 잡힘.. 근접한 3영역을 모두 확인해야만 함.
  const candidates = [lower_idx - 1, lower_idx, lower_idx + 1];

  candidates.forEach((idx) => {
    if (curIdx !== idx)
      update(curSolution, solutionArr[idx], Math.abs(solution1 + solution2));
  });
});

if (solution1 > solution2) [solution1, solution2] = [solution2, solution1];

console.log(solution1, solution2);
