const input = require('fs')
  .readFileSync(process.platform === 'linux' ? '/dev/stdin' : 'input.txt')
  .toString()
  .trim()
  .split('\n');

const N = Number(input[0]);
const arrN = input[1].split(' ').map(Number);

const hasCard = Array(2000_0002);
for (let i = 0; i < N; i++) {
  hasCard[arrN[i] + 1000_0000] = true;
}

const M = Number(input[2]);
const arrM = input[3].split(' ').map(Number);

const ans = [];
for (let i = 0; i < M; i++) {
  const target = arrM[i] + 1000_0000;

  if (hasCard[target]) {
    ans.push(1);
  } else {
    ans.push(0);
  }
}

console.log(ans.join(' '));
