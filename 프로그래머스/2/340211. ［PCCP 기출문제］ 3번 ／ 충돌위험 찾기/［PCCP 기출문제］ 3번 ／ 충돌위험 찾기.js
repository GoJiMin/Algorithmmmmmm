// 시간 t에 좌표(x, y)에 로봇이 얼마나 있는지 효율적으로 기록해야 함.
// 단순히 3차원 배열로 vis[t][x][y]로 관리하기엔 로봇의 이동 시간과 100 * 100 격자에 모두 기록하면 효율적이지 못함.
// 맵을 사용해 time-x-y에 해당하는 키 값으로 값을 저장하고 이후에 해당 time에 x,y 좌표에 2개 이상의 로봇이 겹칠 때 충돌횟수를 카운트하는게 좋을듯
function solution(points, routes) {
  const posMap = new Map();

  function checkPos(time, x, y) {
    const cur = `${time}-${x}-${y}`;
    posMap.set(cur, (posMap.get(cur) || 0) + 1);
  }

  for (let i = 0; i < routes.length; i++) {
    let curTime = 0;
    let [posX, posY] = points[routes[i][0] - 1];
    checkPos(curTime, posX, posY); // 시작점 체크 => 예시 2번

    for (let j = 1; j < routes[i].length; j++) {
      const [targetX, targetY] = points[routes[i][j] - 1];

      // 행 먼저 이동해라.
      while (posX !== targetX) {
        if (posX < targetX) posX++;
        else posX--;

        curTime++;
        checkPos(curTime, posX, posY);
      }

      while (posY !== targetY) {
        if (posY < targetY) posY++;
        else posY--;

        curTime++;
        checkPos(curTime, posX, posY);
      }
    }
  }

  let result = 0;
  for (const val of posMap.values()) {
    if (val >= 2) result++;
  }

  return result;
}
