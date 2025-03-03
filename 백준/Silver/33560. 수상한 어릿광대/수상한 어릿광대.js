const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "input.txt")
  .toString()
  .trim()
  .split("\n");

/**
 * 주사위 굴리면 1점 얻고 시간은 4만큼 흐름.
 *
 * 주사위 효과
 * 1 - 게임 종료 => 다음 주사위에 새 게임 시작.
 * 2 - 주사위 굴릴 때 얻는 점수가 1보다 크면 절반으로, 1점이면 흐르는 시간 2 증가.
 * 3 - 아무 효과 없음.
 * 4 - 시가을 56만큼 추가로 흐름 => 60 지나게 하기.
 * 5 - 매 턴마다 흐르는 시간이 1보다 크다면 1 감소.
 * 6 - 얻는 점수가 32보다 작다면 2배로 증가
 */

const n = Number(input[0]);
const dices = input[1].trim().split(" ");

let totalTime = 0;
let totalPoints = 0;

let ticking = 4; // 매 턴 흐르는 시간 - 초기값 4
let point = 1; // 매 턴 얻는 점수 - 초기값 1

// 0 - 보상1, 1 - 보상2, 2 - 보상3, 3 - 보상4
const reward = [0, 0, 0, 0];

function getReward() {
  if (35 <= totalPoints && totalPoints < 65) reward[0]++;
  else if (65 <= totalPoints && totalPoints < 95) reward[1]++;
  else if (95 <= totalPoints && totalPoints < 125) reward[2]++;
  else if (125 <= totalPoints) reward[3]++;

  totalTime = 0;
  totalPoints = 0;

  ticking = 4;
  point = 1;
}

let idx = 0;
while (idx < n) {
  // 240 초과하면 주사위 굴리기 전에 게임 종료함.
  if (totalTime > 240) {
    getReward();
    continue;
  }

  switch (dices[idx++]) {
    case "1":
      // 걸리면 게임 종료
      getReward();
      continue;
    case "2":
      if (point > 1) {
        point = Math.floor(point / 2);
      } else if (point === 1) {
        ticking += 2;
      }
      break;
    case "3":
      break;
    case "4":
      totalTime += 56;
      break;
    case "5":
      if (ticking > 1) ticking--;
      break;
    case "6":
      if (point < 32) point *= 2;
      break;
  }

  totalPoints += point;
  totalTime += ticking;
}

console.log(reward.join("\n"));
