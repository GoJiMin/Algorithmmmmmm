const input = require('fs')
  .readFileSync(process.platform === 'linux' ? '/dev/stdin' : 'input.txt')
  .toString()
  .trim()
  .split('\n');

let idx = 0;

const [n, m] = input[idx++].split(' ').map(Number);
const memo = new Map();

for (let i = 0; i < n; i++) {
  const keyword = input[idx++].trim();

  memo.set(keyword);
}

const result = [];

for (let i = 0; i < m; i++) {
  const keywords = input[idx++].trim().split(',');

  for (const keyword of keywords) {
    if (memo.has(keyword)) {
      memo.delete(keyword);
    }
  }

  result.push(memo.size);
}

console.log(result.join('\n'));
