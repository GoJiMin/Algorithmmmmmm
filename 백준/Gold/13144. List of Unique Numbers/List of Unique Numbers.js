const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "input.txt")
  .toString()
  .trim()
  .split("\n");

/**
 * 투 포인터를 사용해야 하는 문제인데요..
 *
 * 처음엔 경우를 만족할 때 카운트하는 방법을 생각했는데, 도저히 풀리지 않더라구요..
 *
 * 그래서 다음으로 생각한 방법은요. 수열에 나타나는 수가 최대 100,000까지니까요! 초기값 false를 가진 100,002 크기의 배열을 선언합니다. 이하 chk라고 부를게요.
 * 그럼 chk 배열의 arr[0]번 방을 true로 설정합니다. 등장했다.. 라는 의미로요. chk[arr[0]] = true..
 *
 * 그리고 이후에 투 포인터를 사용합니다. en이 n - 1 미만일 때, arr[en + 1]이 등장하지 않았다면,
 * en을 오른쪽으로 옮기고, 수가 등장했다는 의미로 chk[arr[en]]을 true로 업데이트해줍니다..
 *
 * 만약 예제 1 ( arr = [1, 2, 3, 4, 5] ) 의 경우라면, 이렇게 동작하겠죠?
 * chk[arr[0]] = true => chk[1] = true => 1이 등장했어요.
 * en = 0
 *
 * while(en < n - 1 && !chk[arr[en + 1]]) => whlie(en이 아직 끝까지 안 갔구요. 다음 수인 2가 등장하지 않았어요.)
 * => en = 1, chk[arr[1]] => chk[2] = true
 *
 * 이렇게 가다가 결국 마지막에 en이 3일 때, chk[arr[4]] => 5가 등장하지 않았어요.
 * en이 4로 증가해 while문을 벗어나겠죠?
 *
 * 그럼 0번 인덱스부터 4번 인덱스까지 연속되게 뽑아봤는데, 같은 수가 모두 등장하지 않았다고 볼 수 있죠?
 * 그럼 우리는 0번, 0, 1번, 0, 1, 2번, 0, 1, 2, 3번, 0, 1, 2, 3, 4번 총 5개의 조합을 만들 수 있어요.
 * 0-indexed니까 ans += en - st + 1로 더해주면 모든 경우를 찾아낼 수 있겠죠?
 */

const n = Number(input[0]);
const arr = input[1].split(" ").map(Number);

const chk = Array(100002).fill(false);

chk[arr[0]] = true;

let en = 0;
let ans = 0;

for (let st = 0; st < n; st++) {
  while (en < n - 1 && !chk[arr[en + 1]]) {
    en++;

    chk[arr[en]] = true;
  }

  ans += en - st + 1;
  chk[arr[st]] = false;
}

console.log(ans);
