const input = require('fs')
  .readFileSync(process.platform === 'linux' ? '/dev/stdin' : 'input.txt')
  .toString()
  .trim()
  .split('\n');

const n = Number(input[0]);
const extMap = new Map();

for (let i = 1; i <= n; i++) {
  const [_, ext] = input[i].trim().split('.');

  extMap.set(ext, (extMap.get(ext) || 0) + 1);
}

const sorted = [...extMap.entries()].sort((a, b) => a[0].localeCompare(b[0]));

console.log(sorted.map(el => el.join(' ')).join('\n'));
