const input = require('fs')
  .readFileSync(process.platform === 'linux' ? '/dev/stdin' : 'input.txt')
  .toString()
  .trim()
  .split('\n');

let idx = 0;
const n = Number(input[idx++]);

const adj = Array.from({length: n}, () => []);

for (let i = 0; i < n; i++) {
  const line = input[idx++].trim().split('');

  // 인접 리스트로 친구 목록 구해놓기.
  for (let j = 0; j < line.length; j++) {
    if (line[j] === 'Y') {
      adj[i].push(j);
    }
  }
}

let maxCnt = 0;
for (let i = 0; i < n; i++) {
  // 친구 몇명인지 기록하기.
  const friendsSet = new Set();

  // 직접적으로 친구인 사람들 넣어놓기.
  for (const friend of adj[i]) {
    friendsSet.add(friend);

    // 친구의 친구 넣어놓기.
    for (const friendFriend of adj[friend]) {
      if (i === friendFriend) continue; // 본인은 빼구요.

      friendsSet.add(friendFriend);
    }
  }

  maxCnt = Math.max(maxCnt, friendsSet.size);
}

console.log(maxCnt);
