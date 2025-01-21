const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "input.txt")
  .toString()
  .trim()
  .split("\n");

/**
 * 으음.. A 집합의 부배열의 수와 B 집합의 부배열의 수를 적절히 조합해서 T가 나와야된다..인데요..
 *
 * 대놓고 해시맵 쓰라는 거 아닌가요? 이분탐색 풀이도 가능할 거 같기는 한데,
 * 먼저 A와 B의 부배열을 모두 구해놓고, T - A의 부배열 합이 미리 구해놓은 B의 부배열에 있는지 확인? 하면 되겠죠?
 *
 * 부배열 먼저 구해봅시다. 1 <= i <= j <= n일 때 A[i] + ... + A[j]라네요.
 */

const T = Number(input[0]);

const arrA = input[2].split(" ").map(Number);
const arrB = input[4].split(" ").map(Number);

function getSubArray(arr) {
  const subArray = [];

  for (let i = 0; i < arr.length; i++) {
    let total = 0;

    for (let j = i; j < arr.length; j++) {
      total += arr[j];
      subArray.push(total);
    }
  }

  return subArray;
}

const subA = getSubArray(arrA);
const subB = getSubArray(arrB);

const subBMap = new Map();
for (let i = 0; i < subB.length; i++) {
  subBMap.set(subB[i], (subBMap.get(subB[i]) || 0) + 1);
}

let ans = 0;
for (let i = 0; i < subA.length; i++) {
  ans += subBMap.get(T - subA[i]) || 0;
}

console.log(ans);