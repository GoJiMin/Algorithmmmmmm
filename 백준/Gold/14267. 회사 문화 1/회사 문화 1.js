const input = require('fs')
  .readFileSync(process.platform === 'linux' ? '/dev/stdin' : 'input.txt')
  .toString()
  .trim()
  .split('\n');

let idx = 0;
const [n, m] = input[idx++].split(' ').map(Number);

// 직원 n명의 직속 상사 번호
const numbers = input[idx++].split(' ').map(Number);

const adj = Array.from({length: n}, () => []);
for (let v = 1; v < n; v++) {
  const u = numbers[v] - 1;

  adj[u].push(v);
}

const vals = Array(n).fill(0);
for (let T = 0; T < m; T++) {
  const [i, w] = input[idx++].split(' ').map(Number);
  vals[i - 1] += w;
}

const stack = [0];
while (stack.length) {
  const cur = stack.pop();
  for (const nxt of adj[cur]) {
    vals[nxt] += vals[cur];
    stack.push(nxt);
  }
}

console.log(vals.join(' '));
