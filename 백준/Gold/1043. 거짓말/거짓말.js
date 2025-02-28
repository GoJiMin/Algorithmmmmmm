const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "input.txt")
  .toString()
  .trim()
  .split("\n");

let idx = 0;
const [n, m] = input[idx++].split(" ").map(Number);

const heKnows = input[idx++].split(" ").map(Number);

const adj = Array.from({ length: n + 1 }, () => []);
const pt = Array.from({ length: m }, () => []);

for (let i = 0; i < m; i++) {
  const [num, ...people] = input[idx++].split(" ").map(Number);

  pt[i].push(people[0]);

  // 모든 파티별로 파티원의 앞/뒤를 간선으로 이어줌.
  for (let j = 1; j < num; j++) {
    pt[i].push(people[j]);

    adj[people[j - 1]].push(people[j]);
    adj[people[j]].push(people[j - 1]);
  }
}

const truth = Array(n + 1).fill(false);
function bfs() {
  const queue = [];

  // 이미 진실을 알고 있는 사람들을 전파시킴.
  for (let i = 1; i <= heKnows[0]; i++) {
    queue.push(heKnows[i]);
    truth[heKnows[i]] = true;
  }

  while (queue.length) {
    const cur = queue.shift();

    for (const nxt of adj[cur]) {
      if (truth[nxt]) continue;

      truth[nxt] = true;
      queue.push(nxt);
    }
  }
}

bfs();

let cnt = 0;
for (let i = 0; i < m; i++) {
  let flag = false;
  for (const p of pt[i]) {
    if (truth[p]) flag = true;
  }

  if (!flag) cnt++;
}

console.log(cnt);
