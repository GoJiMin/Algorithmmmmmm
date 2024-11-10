/**
 * 주어진 numbers 배열을 모두 사용해서 (더하거나 빼거나) target number를 만들어야 됩니다.
 * [1, 1, 1, 1, 1]이 numbers로 주어질 때 -1 + 1 + 1 + 1 + 1 = 3과 같이 모든 수를 적절히 더하거나 뺍니다.
 * 재귀..네요..
 */

function solution(numbers, target) {
  let ans = 0;

  function recursion(k, num) {
    if (k === numbers.length) {
      if (num === target) {
        ans++;
        return;
      }

      return;
    }

    recursion(k + 1, num + numbers[k]);
    recursion(k + 1, num - numbers[k]);
  }

  recursion(0, 0);

  return ans;
}

console.log(solution([1, 1, 1, 1, 1], 3));
console.log(solution([4, 1, 2, 1], 4));

