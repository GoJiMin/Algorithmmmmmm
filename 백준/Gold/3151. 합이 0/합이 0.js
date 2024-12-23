const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "input.txt")
  .toString()
  .trim()
  .split("\n");

/**
 * 합이 0이 되는 3명을 골라야 함.
 *
 * 이거 근데 문제 제한 시간이 4초면, 브루트포스도 가능한 거 아닌가..?
 *
 * 일단 생각해본 방법은?
 *
 * 1. 먼저 중첩 for문을 한 번 돌려서 2개의 합을 구한 배열을 선언함.
 * ex) [2, -5, 2, 3] => [-3, 4, 5, -3, -2, 5]
 *
 * 굳이..?
 */

// lower_bound or upper_bound ? ..
/**
 * 우선 문제의 조건 중 답이 무조건 있다는 보장은 또 없음.. 짱나게 하네
 * 우선 lower_bound의 특성은 target 이상의 값이 처음 등장하는 위치를 반환함.
 * 반대로 upper_bound의 특성은 target을 초과하는 값이 처음 등장하는 위치를 반환함.
 *
 * arr = [2, 5, 7, 8, 13], target = 7
 * lower_bound => arr[2] => 7
 * upper_bound => arr[3] => 8
 *
 * 근데 이 문제는 합이 0이 되는 경우를 찾아야 함. 만약 위의 정렬된 arr의 (-4 + 2)가 한 팀인 경우 2를 찾아야만 함.
 *
 * 근데 문제 특성상 찾을 수 없을 가능성이 있다.. 그리고 무조건 0이 되는 경우만 답임.
 * 그럼 lower, upper 모두 아닌 target만을 찾는게 좋을듯
 *
 * 그리고 이 문제는 팀이 누구인지를 따지는게 아닌 단순히 카운트하는 문제니까 그냥 bool 타입으로 반환하면 될듯?
 * 아닌듯.. 이 문제는 nC3이잖아..
 *
 * 아닌가..? 이거 st 값을 for문 내부에서 전달해주면 되지 않나?..
 * 만약, [2, 3, 5, 8, 13, 16]일 때, (2 + 3)에 대한 나머지 팀원을 찾고 싶다면, st를 2부터 시작하면 되잖아.
 * 5, 8, 13, 16에 대해서만 탐색하면 될듯.
 *
 * 반례 중에 같은 실력인 학생이 나올 경우 답이 제대로 나오지 않음..
 * [-10, 5, 5, 5, 5, 5, 5, 5] => 현재 코드로는 j가 증가할 때 하나만 찾고 바로 끝나는데, 이걸 lower, upper로 찾아야할듯..
 */

const n = Number(input[0]);
const arr = input[1].split(" ").map(Number);

arr.sort((a, b) => a - b);

function lower_bound(curIdx, target) {
  let st = curIdx;
  let en = n;

  while (st < en) {
    const mid = Math.floor((st + en) / 2);

    if (target <= arr[mid]) {
      en = mid;
    } else {
      st = mid + 1;
    }
  }

  return st;
}

// [-6, -5, -4, -4, 0, 1, 2, 2, 3, 7];
/**
 * 만약 -4와 2를 골랐다면 2를 골라야지?
 *
 * 그럼 이 upper_bound는 뭘 반환하는지 따라가보면..
 *
 * st = 7, en = 10, target = 2
 * mid = 8
 *
 * arr[mid] = 3, target = 2 => 2 < 3 => en = 8
 *
 * st = 7, en = 8, target = 2
 * mid = 7
 *
 * arr[mid] = 2, target = 2 => 2 < 2 => en = 7
 */

function upper_bound(curIdx, target) {
  let st = curIdx;
  let en = n;

  while (st < en) {
    const mid = Math.floor((st + en) / 2);

    if (target < arr[mid]) {
      en = mid;
    } else {
      st = mid + 1;
    }
  }

  return st;
}

let ans = 0;

for (let i = 0; i < n - 2; i++) {
  for (let j = i + 1; j < n - 1; j++) {
    // 여기서 바로 이분탐색 들어가도 될 거 같은데?? 그럼 i랑 j가 아닐 경우에만 찾으면 되잖아.
    const sum = arr[i] + arr[j];

    const lower_idx = lower_bound(j + 1, -sum);
    const upper_idx = upper_bound(j + 1, -sum);

    ans += upper_idx - lower_idx;
  }
}

console.log(ans);
