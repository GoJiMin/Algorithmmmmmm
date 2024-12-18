const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "input.txt")
  .toString()
  .trim()
  .split("\n");

/**
 * 으악!!!! 어렵다!!!
 *
 * 우선 문제를 이해해보자면!
 * 입력의 첫째줄은 집의 개수 n, 공유기의 개수 c가 주어집니다.
 *
 * 두번째 줄부터 n개의 집의 좌표가 주어지며, 좌표는 중복되지 않습니다.
 * 이 때, c개의 공유기를 설치하는데 가장 인접한 두 공유기 사이의 최대 거리를 출력합니다.
 *
 * 입력 예제 1의 경우. 1 2 4 8 9
 * 1번 집, 4번 집, 8번 집에 공유기를 설치하면, 가장 인접한 두 공유기 사이의 거리는 3이고, 4번과 8번 사이는 4니까 출력이 3...
 *
 * 문제는 이거 어떻게 풀죠? 일단 정렬은 해놔야겠죠?
 *
 * 이전까지, 최댓값과 최솟값을 구하는 이분탐색 문제에서는 분명.. st 값을 1, en 값을 주어진 입력의 가장 큰 값으로 설정했습니다..
 * 이후에 mid 값을 갱신하면서 반복했었죠..?
 *
 * 이번엔 st 값은 동일하게 1, en 값을 나올 수 있는 최대 거리인 정렬된 배열의 마지막 인덱스와 첫 번째 인덱스 값을 빼봅시다.
 */

const [n, c] = input[0].split(" ").map(Number);

const arr = [];

for (let i = 1; i <= n; i++) {
  arr.push(Number(input[i]));
}

arr.sort((a, b) => a - b);

let st = 1;
let en = arr[n - 1] - arr[0];

let ans = 0;

// 1 2 4 8 9
// st = 1
// en = arr[4] - arr[0] = 8

while (st <= en) {
  const mid = Math.floor((st + en) / 2);

  let cnt = 1; // 첫 번째 집에 무조건 설치하는게 거리 상 이득이니까..
  let prevP = arr[0]; // 위의 이유로 항상 처음 설치한 집은 arr[0]

  /**
   * 첫 번째 동작을 한 번 살펴봅시다.
   * st = 1, en = 8, mid = 4, cnt = 1, prevP = 1
   *
   * arr의 인덱스를 순회할 때 3번 인덱스일 때 처음 if문이 통과됩니다.
   * arr[3] = 8, 8 - 1 >= 4로 cnt가 증가하고, prevP가 8로 갱신되겠죠? 그럼 이제 다음 인덱스는 당연히 통과하지 못하니 끝나게 됩니다.
   *
   * 자 그럼 아래의 cnt 값이 c보다 작기 때문에 en 값이 4 - 1로 감소됩니다.
   * 그럼 다음 mid 값은 2가 되겠죠?
   * 다시 시작합니다..
   *
   * arr[1] = 2, 2 - 1 >= 2 pass
   * arr[2] = 4, 4 - 1 >= 2 cnt++, prevP 갱신
   * arr[3] = 8, 8 - 4 >= 2 cnt++, prevP 갱신
   * arr[4] = 9, 9 - 8 >= 2 pass
   *
   * cnt가 c와 같기 때문에 ans 값이 2, st 값은 3으로 갱신.
   *
   * 아직 st와 en 값이 같기 때문에 while 문이 한 번 더 돌겠죠?
   * st + en = 6, mid = 6 / 2 = 3
   *
   * arr[1] = 2, 2 - 1 >= 3 pass
   * arr[2] = 4, 4 - 1 >= 3 cnt++, prevP 갱신
   * arr[3] = 8, 8 - 4 >= 3 cnt++, prevP 갱신
   * arr[4] = 9, 9 - 8 >= 3 pass
   *
   * cnt가 c와 같기 때문에 ans 값이 3, st 값은 4로 갱신되며 while문이 break.
   */
  for (let i = 1; i < n; i++) {
    if (arr[i] - prevP >= mid) {
      cnt++;
      prevP = arr[i];
    }
  }

  if (cnt >= c) {
    ans = mid;
    st = mid + 1;
  } else {
    en = mid - 1;
  }
}

console.log(ans);
