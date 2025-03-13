const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "input.txt")
  .toString()
  .trim()
  .split("\n");

/**
 * 흠 결국 높이가 다른 땅들을 모두 알고 있어야겠죠?
 * 해시맵을 사용해서 높이별 개수를 기록해두고 생각해볼게요..
 *
 * 우선 동작을 정리해보자면,
 * 1. 블럭을 제거하면 2초 소요.
 * 2. 인벤토리에서 블럭을 놓는 데에는 1초 소요. => 블럭이 없으면 불가능.
 */

const [n, m, b] = input[0].split(" ").map(Number);

const board = [];

for (let i = 1; i <= n; i++) board.push(input[i].split(" ").map(Number));

const cntMap = new Map();
for (let i = 0; i < n; i++) {
  for (let j = 0; j < m; j++) {
    cntMap.set(board[i][j], (cntMap.get(board[i][j]) || 0) + 1);
  }
}

let minSec = Number.MAX_SAFE_INTEGER;
let resultHeight = 0;

// 0 <= h <= 256
for (let H = 0; H <= 256; H++) {
  let removeBlock = 0;
  let addBlock = 0;

  for (const [height, cnt] of cntMap) {
    // 만약 현재 조회해보려는 H보다 기록된 height이 크다면 추가해야됨.
    // ex) height이 0, H가 1이라면 0의 높이를 가지는 cnt만큼 블럭을 추가.
    if (H > height) {
      addBlock += (H - height) * cnt;
    } else if (height > H) {
      // 만약 현재 조회해보려는 H가 기록된 height보다 작다면 height을 가진 블럭을 평탄화 시킴.
      // height이 6, H가 0이라면 6의 높이를 가지는 cnt만큼의 블럭을 모두 제거.
      removeBlock += (height - H) * cnt;
    }
  }

  // 블럭을 제거하면 인벤토리에 들어감. 그럼 제가한만큼의 블럭 + 기존에 가진 블럭이 추가할 블럭보다 같거나 커야겠지?
  if (addBlock <= removeBlock + b) {
    // 제거는 2초임.
    const curSec = removeBlock * 2 + addBlock;

    // 최소시간이거나 시간이 같으면 더 높은 거 고르기
    if (curSec < minSec || (curSec === minSec && H > resultHeight)) {
      resultHeight = H;
      minSec = curSec;
    }
  }
}

console.log(minSec, resultHeight);
