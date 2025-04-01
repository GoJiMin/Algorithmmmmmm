const input = require('fs')
  .readFileSync(process.platform === 'linux' ? '/dev/stdin' : 'input.txt')
  .toString()
  .trim()
  .split('\n');

let idx = 0;
const [n, m] = input[idx++].split(' ').map(Number);

const titles = [];
for (let i = 0; i < n; i++) {
  const [title, power] = input[idx++].trim().split(' ');

  titles.push([title, Number(power)]);
}

titles.sort((a, b) => a[1] - b[1]);

function lower_bound(target) {
  let st = 0;
  let en = n - 1;

  while (st <= en) {
    const mid = Math.floor((st + en) / 2);

    if (target <= titles[mid][1]) {
      en = mid - 1;
    } else {
      st = mid + 1;
    }
  }

  return st;
}

const result = [];
for (let i = 0; i < m; i++) {
  const target = Number(input[idx++]);

  result.push(titles[lower_bound(target)][0]);
}

console.log(result.join('\n'));
