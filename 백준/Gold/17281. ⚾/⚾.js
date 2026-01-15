const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "input.txt")
  .toString()
  .trim()
  .split("\n");

/**
 * 야구를 잘 모르다보니 이게 무슨 말인지 좀 이해하는 데 시간이 걸리네요..
 *
 * 우선 알아두어야 할 포인트만 정리해봅시다.
 *
 * 1. N이닝 동안 게임이 진행되며, 한 이닝에 3아웃 시 공수 교대.
 * 2. 9번 타자까지 공을 쳤지만 아웃이 발생하지 않았다면, 이닝 종료가 아닌 1번 타자로 다시 순회.
 * 3. 이후 이닝이 끝난 후 새로운 이닝이 시작될 경우 이전 타순을 기억.
 * 4. 주자는 이닝이 종료되면 모두 초기화.
 * 5. 공을 친 결과
 *  - 안타(1): 1전진.
 *  - 2루타(2): 2전진,
 *  - 3루타(3): 3전진,
 *  - 홈런(4): 4전진,
 *  - 아웃(0): 전진X 아웃 1 카운트.
 *
 * 첫째 줄 N이 주어지며
 * 이후 N개의 줄에 대해 각 이닝에서 선수들이 공을 친 결과가 순서대로 주어짐.
 *
 * 이 결과를 조합해 최대 점수를 얻는 경우를 찾아 출력..
 *
 * 우선 위의 규칙에서 가장 많은 점수를 얻는 방법이 무엇일까?
 * 최대한 주자를 많이 세운 상태에서 주자들을 홈으로 귀환시키면 된다.
 *
 * 그럼 주자들을 홈으로 귀환시키기 위한 최선의 조건은 무엇일까?
 * 안타친 선수들을 앞에 위치시키고 홈런?
 *
 * 일단 주자가 나가있을 때 최대한 3아웃을 면해야만 함. 이왕이면 차라리 아웃을 먼저 와라락 당해버리는 것도 좋을듯?
 * 근데 N이라는 진행 가능한 이닝 수가 걸려있으니 최대한 N번의 이닝 내에서만 아웃을 당해야 함..
 *
 * 근데 최적의 타순을 어떻게 정하지?
 * 어쨌든 감독이 미리 정한 4번 타자를 제외한 모든 타자들의 순서를 모두 바꿀 수 있어야 하는데
 *
 * 그냥 차라리 모든 타순에 대한 정보를 사용해서 최적의 값을 구하는건?
 * N은 50까지고 타순은 8!이니까 1억번 내로는 충분히 들듯?
 */

const n = Number(input[0]);

const record = [];
for (let i = 1; i <= n; i++) record.push(input[i].split(" ").map(Number));

const order = Array(9).fill(0);
const isUsed = Array(9).fill(false);

order[3] = 0; // 감독이 미리 정해놓은 1번 선수를 4번 타자로 등록
isUsed[0] = true;

let maxScore = 0;
function makeOrder(k) {
  if (k === 9) {
    // 여기서 이제 선수에 대한 정보가 만들어지면 바로 점수 얻어오면 될듯?
    const score = getScore(order);
    maxScore = Math.max(score, maxScore);

    return;
  }

  // 4번 타자는 이미 정해놓음
  if (k === 3) {
    makeOrder(k + 1);
    return;
  }

  for (let i = 1; i < 9; i++) {
    if (!isUsed[i]) {
      isUsed[i] = true;
      order[k] = i;
      makeOrder(k + 1);
      isUsed[i] = false;
    }
  }
}

// 여기서 정해진 선수로 이닝을 진행해보기만 하면 됨.
function getScore(currentOrder) {
  let score = 0;
  let startBatter = 0; // 첫 이닝에선 1번 선수부터 시작이니까

  // 여기서 이닝 진행
  for (let inning = 0; inning < n; inning++) {
    let outCount = 0;

    // 각 루에 몇 명의 선수가 있는지 기록
    let base1 = 0;
    let base2 = 0;
    let base3 = 0;

    const currentInningRecord = record[inning];

    while (outCount < 3) {
      const player = currentOrder[startBatter];
      const result = currentInningRecord[player]; // 이러면 여기에 이 선수가 어떤 결과를 가지는지 나옴.

      startBatter = (startBatter + 1) % 9;

      if (result === 0) {
        // 아웃
        outCount++;
      } else if (result === 1) {
        // 안타니까 1루씩 전진
        score += base3;
        base3 = base2;
        base2 = base1;
        base1 = 1;
      } else if (result === 2) {
        // 2루타니까 2루씩 전진
        score += base3 + base2;
        base3 = base1;
        base2 = 1;
        base1 = 0;
      } else if (result === 3) {
        // 3루타니까 3루씩 전진
        score += base3 + base2 + base1;
        base3 = 1;
        base2 = 0;
        base1 = 0;
      } else if (result === 4) {
        // 홈런은 모든 주자 전진
        score += base3 + base2 + base1 + 1;
        base3 = 0;
        base2 = 0;
        base1 = 0;
      }
    }
  }

  return score;
}

makeOrder(0);
console.log(maxScore);
