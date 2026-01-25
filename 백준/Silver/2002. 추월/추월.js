const input = require('fs')
  .readFileSync(process.platform === 'linux' ? '/dev/stdin' : 'input.txt')
  .toString()
  .trim()
  .split('\n');

/**
 * 음 들어간 순서대로 차량 번호가 주어지니 각 차량 번호마다 인덱스를 부여해놓고,
 *
 * 나온 차들을 들어간 인덱스로 바꿔다가 배열에 넣어서 각 차를 싸악 검사하면 될 거 같은데요..
 *
 * 내 뒤에 나보다 먼저 들어온 차가 있으면 나는 추월한 차량...
 */

let idx = 0;
const n = Number(input[idx++]);

const entryMap = new Map();
for (let i = 0; i < n; i++) {
  const cur = input[idx++].trim();

  entryMap.set(cur, i);
}

const exit = []; // 여기에 나온 차량이 원래 언제 들어갔는지 저장..
for (let i = 0; i < n; i++) {
  const cur = input[idx++].trim();
  exit.push(entryMap.get(cur));
}

let cnt = 0;
for (let i = 0; i < n; i++) {
  for (let j = i + 1; j < n; j++) {
    // i번째 차 뒤로 모든 차 확인해서 먼저 나왔는지 확인
    if (exit[i] > exit[j]) {
      cnt++;
      break;
    }
  }
}

console.log(cnt);
