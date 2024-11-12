const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "input.txt")
  .toString()
  .trim()
  .split("\n");

/**
 * 문제가 넘 웃기네여 롤을 안 해서 이해는 못 하지만 친구가 놀린답니다.
 * 키에 대한 점수가 있으니 맵을 이용해 풀어봅시다.
 *
 * 우선 첫 번째 줄에 총 게임 횟수인 N, 해킹으로 알아낸 플레이어 정보 수인 P가 주어집니다.
 * 두 번째 줄에는 이겼을 때 획득 점수인 W, 졌을 때 떨어지는 점수 L, 아이언을 벗어나기 위한 점수 G가 주어집니다.
 * 이후 P개의 줄에 무조건 이기는 경우 W, 무조건 지는 경우 L이 포함된 단어 쌍이 나옵니다.
 * 그 뒤 N개의 줄에 플레이어의 이름이 나옵니다.
 *
 * 우선 점수는 0점 밑으로 떨어지지 않습니다.
 * 해킹으로 알아낸 플레이어가 아닌 경우 우리 형동이는 게임을 지지리 못해서 무조건 집니다.
 */

const [n, p] = input[0].split(" ").map(Number);
const [w, l, g] = input[1].split(" ").map(Number);

const hacked = input.splice(2, p).map((el) => el.trim().split(" "));

const map = new Map();

// 어차피 무조건 이기는 상대가 아닌 경우 그냥 다 지니까 이기는 플레이어만 맵에 넣기.
for (const [player, outCome] of hacked) {
  if (outCome === "W") {
    map.set(player);
  }
}

let score = 0;

for (let i = 2; i < 2 + n; i++) {
  // 무조건 이기는 플레이어라면
  if (map.has(input[i].trim())) {
    score += w;

    // 만약 탈출 점수라면
    if (score >= g) {
      console.log("I AM NOT IRONMAN!!");
      return;
    }
  } else {
    const curScore = score - l;

    // 0점 이하로는 떨어지지 않으니..
    if (curScore < 0) {
      score = 0;
    } else {
      score = curScore;
    }
  }
}

console.log("I AM IRONMAN!!");
