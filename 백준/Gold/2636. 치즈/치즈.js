const input = require('fs')
  .readFileSync(process.platform === 'linux' ? '/dev/stdin' : 'input.txt')
  .toString()
  .trim()
  .split('\n');

/**
 * 음.. 일단 격자의 1로 표시된 부분은 치이즈 입니다..
 *
 * 치즈는 외곽에 존재하는.. 즉, 자신을 둘러싼 치즈가 없을 경우 한 사이클 뒤에 사라집니다..
 *
 * 문제의 요구사항은 치즈가 모두 녹아없어지는 시간, 그리고 모두 녹기 전 사이클에 몇 개의 치즈가 존재하는지를 구하라네요.
 *
 * 우선 일정한 주기, 양을 구하기 위해 BFS를 돌려봅시다.
 * 고민인게 한 사이클마다 치즈를 없애는 로직을 어떻게 구현할까?
 *
 * 없어질 치즈를 하나의 배열에 모아놓고, 그 배열에 등록된 치즈를 다음 사이클에 지울까? 괜찮을듯?
 *
 * 그리고 치즈가 모두 녹아 없어져야하므로 while(true)로 돌리고 빠져나올 조건문을 만들어놓는게 좋을듯?
 * 어쨌든 모든 치즈는 녹기 마련이니..
 *
 * 일단 치즈가 놓여있지 않더라도 주변이 치즈로 감싸진 케이스를 판별해야 하니 치즈에 대한 BFS보단 공기에 대한 BFS가 적절할듯 함.
 */

const [n, m] = input[0].split(' ').map(Number);

const board = [];
for (let i = 1; i <= n; i++) board.push(input[i].trim().split(' '));

const dirs = [
  [1, 0],
  [-1, 0],
  [0, -1],
  [0, 1],
];

let time = 0;
let lastCheeseCount = 0;

function findMeltingCheese() {
  const vis = Array.from({length: n}, () => Array(m).fill(false));

  let head = 0;
  const queue = [[0, 0]]; // 판의 가장자리엔 항상 치즈가 놓여있지 않음.

  const melts = [];
  while (queue.length > head) {
    const [x, y] = queue[head++];

    for (const [dx, dy] of dirs) {
      const nx = x + dx;
      const ny = y + dy;

      if (nx < 0 || nx >= n || ny < 0 || ny >= m || vis[nx][ny]) continue;

      // 공기면 추가 탐색
      if (board[nx][ny] === '0') {
        queue.push([nx, ny]);
        vis[nx][ny] = true;
      } else {
        // 만약 치즈라면
        melts.push([nx, ny]);
        vis[nx][ny] = true;
      }
    }
  }

  return melts;
}

while (true) {
  const meltingList = findMeltingCheese();

  // 이제 더는 녹을 치즈가 없다면? 종료
  if (meltingList.length === 0) {
    console.log(time + '\n' + lastCheeseCount);
    break;
  }

  // 녹을 치즈가 있다면?
  time++;
  lastCheeseCount = meltingList.length; // 녹기 한 시간 전의 치즈 수

  for (const [x, y] of meltingList) {
    board[x][y] = '0';
  }
}
