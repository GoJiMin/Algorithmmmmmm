const input = require('fs')
  .readFileSync(process.platform === 'linux' ? '/dev/stdin' : 'input.txt')
  .toString()
  .trim()
  .split('\n');

const result = [];

for (let T = 0; T < input.length; T++) {
  const [num, x] = input[T].split(' ');
  const loc = Number(x);

  const template = `${num} ${loc} = `;

  const arr = num.split('');
  const n = arr.length;

  const isUsed = Array(n).fill(false);

  // 순열이 나올 수 있는 한계점 이상이라면 돌릴 필요도 없으니까..
  let limit = 1;
  for (let i = 1; i <= n; i++) limit *= i;

  if (limit < loc) {
    result.push(template + 'No permutation');
    continue;
  }

  let cnt = 0;
  const tmp = [];
  function bt(k) {
    if (k === n) {
      if (cnt + 1 === loc) {
        const permutation = tmp.join('');
        result.push(template + permutation);
      }

      cnt++;
      return;
    }

    for (let i = 0; i < n; i++) {
      if (!isUsed[i]) {
        tmp[k] = arr[i];
        isUsed[i] = true;
        bt(k + 1);
        isUsed[i] = false;
      }
    }
  }

  bt(0);
}

console.log(result.join('\n'));
