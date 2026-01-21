const input = require('fs')
  .readFileSync(process.platform === 'linux' ? '/dev/stdin' : 'input.txt')
  .toString()
  .trim();

const list = [];
// 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10 ....
function dfs(n) {
  list.push(n);

  const last = n % 10;

  for (let i = 0; i < last; i++) {
    dfs(n * 10 + i);
  }
}

for (let i = 0; i < 10; i++) {
  dfs(i);
}

list.sort((a, b) => a - b);

const N = Number(input);
if (N > list.length) {
  console.log(-1);
} else {
  console.log(list[N - 1]);
}
