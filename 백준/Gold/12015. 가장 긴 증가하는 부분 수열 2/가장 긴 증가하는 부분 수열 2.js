const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "input.txt")
  .toString()
  .trim()
  .split("\n");

/**
 * 가장 긴 증가하는 바이토닉 수열 문제는 DP로 풀었는데, 이번 문제는 이분탐색이네요..
 *
 * 생각해본 아이디어는 다음과 같은데요..
 *
 * 일단 DP로 풀었다면 테이블에 들어간 값까지 계속 반복문을 돌리며 체크했겠지만, 
   이건 최악의 경우O(n ** 2)의 시간복잡도를 가지겠죠?
 * 
 * 그래서 생각해본 아이디어는 우선 LIS 배열을 초기화합니다.
 * 그리고 입력으로 주어진 배열을 순회하면서 LIS 배열에 들어가있는지 확인하고, 
 * 만약 LIS 배열의 마지막 인덱스보다 값이 크다면 그대로 넣고, 그게 아니라면 이 x가 들어갈 위치를 이분탐색을 통해 찾아주면 되겠죠??
 * 
 * 예전에 lower_bound를 이분탐색으로 찾는 방법은 구현했었죠?
 * mid 값이 크거나 같을 때, en을 mid - 1로 설정해야 값이 처음 등장하는 위치를 찾을 수 있습니다.
 */

const N = Number(input[0]);
const A = input[1].split(" ").map(Number);

const LIS = [];

for (let i = 0; i < N; i++) {
  const x = A[i];

  // 만약 배열에 처음 들어가거나, 마지막 원소가 x 보다 작으면 그냥 바로 push.
  if (LIS.length === 0 || LIS[LIS.length - 1] < x) {
    LIS.push(x);
    continue;
  }

  let st = 0;
  let en = LIS.length - 1;

  let pos;

  while (st <= en) {
    const mid = Math.floor((st + en) / 2);

    /**
     * 자 만약에 LIS[mid] > x 였으면 어떻게 바뀌겠습니까?
     *
     * LIS = [10, 20], x = 10일 때를 한 번 구경해봅시다.
     *
     * st = 0,  en = 1, mid = 1
     *
     * LIS[1] = 20, 20 > 10
     * pos = 1;
     * en = 0;
     *
     * st = 0, en = 0, mid = 0
     *
     * LIS[0] = 10, 10 > 10
     * st = 1
     *
     * while문이 break;
     *
     * 그렇기 때문에 수가 처음 등장하는 위치를 찾을 땐 아래와 같이.. 구현합시다..
     */
    if (LIS[mid] >= x) {
      pos = mid;
      en = mid - 1;
    } else {
      st = mid + 1;
    }
  }

  // 찾은 index에 x를 덮어씌웁시다. 어차피 중복 없잖아요
  LIS[pos] = x;
}

console.log(LIS.length);
