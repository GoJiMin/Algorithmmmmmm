const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "input.txt")
  .toString()
  .trim()
  .split("\n");

/**
 * num = [1, 2, 3], operator = [0, 1, 1, 0]
 * 연산식 = [
    1 - 2 * 3, 
    1 * 2 - 3 
    총 2개.
   ]
 * num = [1, 2, 3, 4], operator = [0, 2, 1, 0]
 * 연산식 = [
    1 - 2 - 3 * 4,
    1 - 2 * 3 - 4,
    1 * 2 - 3 - 4
    총 3개.
   ]
 */

const n = Number(input[0]);
const nums = input[1].split(" ").map(Number);

// [+, -, *, /]의 개수
const operators = input[2].split(" ").map(Number);

let maxNum = Number.MIN_SAFE_INTEGER;
let minNum = Number.MAX_SAFE_INTEGER;

function bt(k, result) {
  if (k === n) {
    maxNum = Math.max(maxNum, result);
    minNum = Math.min(minNum, result);

    return;
  }

  for (let i = 0; i < 4; i++) {
    // 해당 연산자가 있으면.
    if (operators[i] > 0) {
      operators[i]--; // 한 번 사용함.

      let nextResult = 0;

      if (i === 0) nextResult = result + nums[k]; // +
      else if (i === 1) nextResult = result - nums[k]; // -
      else if (i === 2) nextResult = result * nums[k]; // *
      else {
        // /
        if (result < 0) nextResult = Math.ceil(result / nums[k]); // 음수 처리
        else nextResult = Math.floor(result / nums[k]);
      }

      bt(k + 1, nextResult);
      operators[i]++;
    }
  }
}

bt(1, nums[0]);

console.log(maxNum + "\n" + minNum);
