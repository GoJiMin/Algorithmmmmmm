const input = require('fs')
  .readFileSync(process.platform === 'linux' ? '/dev/stdin' : 'input.txt')
  .toString()
  .trim()
  .split('\n');

const n = Number(input[0]);
const nums = input[1].split(' ').map(Number);
let [plus, minus, mul, div] = input[2].split(' ').map(Number);

let maxVal = -Infinity;
let minVal = Infinity;

function dfs(i, current) {
  // Base Case...
  if (i === n) {
    maxVal = Math.max(maxVal, current);
    minVal = Math.min(minVal, current);
    return;
  }

  // 덧셈
  if (plus > 0) {
    plus--;
    dfs(i + 1, current + nums[i]);
    plus++;
  }

  // 뺄셈
  if (minus > 0) {
    minus--;
    dfs(i + 1, current - nums[i]);
    minus++;
  }

  // 곱셈
  if (mul > 0) {
    mul--;
    dfs(i + 1, current * nums[i]);
    mul++;
  }

  // 나눗셈
  if (div > 0) {
    div--;
    let next;
    if (current < 0) {
      next = -Math.floor(Math.abs(current) / nums[i]);
    } else {
      next = Math.floor(current / nums[i]);
    }
    dfs(i + 1, next);
    div++;
  }
}

dfs(1, nums[0]);

console.log(maxVal + '\n' + minVal);