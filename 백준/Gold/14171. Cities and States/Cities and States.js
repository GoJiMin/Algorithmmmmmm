const input = require('fs')
  .readFileSync(process.platform === 'linux' ? '/dev/stdin' : 'input.txt')
  .toString()
  .trim()
  .split('\n');

/**
 * MI:FL로 맵에 저장하고 FL:MI로 뒤집어서 맵에 있으면 카운트해주면 될듯?
 */

const n = Number(input[0]);

const map = new Map();
for (let i = 1; i <= n; i++) {
  const [city, state] = input[i].trim().split(' ');

  const pref = city[0] + city[1];
  if (pref === state) continue;

  const key = pref + ':' + state;
  map.set(key, (map.get(key) || 0) + 1);
}

let ans = 0;
for (let [key, cnt] of map) {
  const [pref, state] = key.split(':');

  const reversed = state + ':' + pref;
  if (map.has(reversed)) {
    ans += cnt * map.get(reversed);
  }
}

console.log(ans / 2);
