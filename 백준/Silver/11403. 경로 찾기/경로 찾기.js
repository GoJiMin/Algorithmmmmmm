const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "input.txt")
  .toString()
  .trim()
  .split("\n");

/**
 * 원래는 각 줄에 대해 dfs를 돌리려고 했는데, 결국 자기 자신으로 다시 돌아올 수 있는 사이클을 처리하지 못해서
 *
 * i, j에 대해 dfs를 돌리게 되었는데요.. 통과되면 좋겠다.. 우선 N이 최대 100까지만 주어져서 아마 O(N ** 3)까지는 무리 없을 거 같은데요.
 */

const [sn, ...arr] = input;

const n = Number(sn);
const adjMatrix = arr.map((el) => el.trim().split(" "));

const result = Array.from({ length: n }, () => Array(n).fill(0));

function dfs(st, target) {
  const vis = Array(n).fill(false);
  const stack = [st];

  while (stack.length) {
    const cur = stack.pop();

    if (vis[cur]) continue;
    if (st !== cur) vis[cur] = true;

    for (let next = 0; next < n; next++) {
      if (vis[next]) continue;
      if (adjMatrix[cur][next] === "1") {
        if (next === target) return true;
        stack.push(next);
      }
    }
  }

  return false;
}

for (let i = 0; i < n; i++) {
  for (let j = 0; j < n; j++) {
    if (dfs(i, j)) result[i][j] = 1;
  }

  console.log(result[i].join(" "));
}
