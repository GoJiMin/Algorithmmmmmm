const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "input.txt")
  .toString()
  .trim()
  .split("\n");

const [_, n_B] = input[0].split(" ").map(Number);

const arrA = input[1].split(" ").map(Number);
const arrB = input[2].split(" ").map(Number);

/**
 * 바킹독 선생님.. 이거 해시 써도 될 거 같은데.. 일단 이분 탐색으로 먼저 풀어볼게요..
 * 
 * 차집합... 문제에서 주어진 arrA에 arrB를 제외한 수를 출력하면 될 거 같습니다.
 * 
 * 그럼 arrA를 순회하면서 arrB에 값이 있는지 확인하는게 좋겠죠..? arrB를 순회하며 arrA를 탐색하면 결국에 찾은
   값들을 제외한 arrA를 출력하느라 반복문 한 번 더 써야되니까요..
 * 
 * 우선 arrB를 정렬해놓고 생각해봅시다.. 어차피 시간제한이 2초라 넉넉하겠네요.

 */

arrB.sort((a, b) => a - b);

function binary_search(target) {
  let st = 0;
  let en = n_B - 1;

  while (st <= en) {
    const mid = Math.floor((st + en) / 2);

    if (arrB[mid] === target) return true;

    if (arrB[mid] < target) {
      st = mid + 1;
    } else {
      en = mid - 1;
    }
  }

  return false;
}

const result = [];

arrA.forEach((num) => !binary_search(num) && result.push(num));

// 아... 정렬하는 거 안 읽어서 삽질했네요..
if (result.length) {
  console.log(result.length + "\n" + result.sort((a, b) => a - b).join(" "));
} else {
  console.log(0);
}
