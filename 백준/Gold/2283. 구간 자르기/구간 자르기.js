const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "input.txt")
  .toString()
  .trim()
  .split("\n");

/**
 * 문제의 설명이 정말 간단하게 나와있는데, 어렵기는 정말 너무 어렵네요..
 *
 * n, k가 주어지는데요. 제가 임의의 구간을 설정했을 때, 이 구간을 벗어나는 모든 부분을 잘라서
 * 총합이 k가 되도록 포인터를 적절히 움직여야겠어요.
 *
 * 우선 굉장히 많은 고민을 해봤는데요. 먼저 주어진 구간들에 대해 모두 알고 있으면 구하기 편해질 거 같아요.
 * 예를 들어, 1 12, 2 6 과 같은 구간이 주어진다면 우리는 2 6에 해당하는 구간이 총 2번 겹친다는걸 알 수 있게요.
 * 그러려면 구간을 누적시킬 필요가 있을 거 같은데요. 흠.. n이 1000까지 주어질 수 있는 상황에서,
 * 시작점은 0부터 1,000,000까지 주어질 수 있다면, 2중 for문으로 구간을 표시한다면, 최악의 경우 최대 10억번의 연산이 필요하겠죠?
 * 그래서 차분배열이라는 방법을 알아봤는데요, 이건 시작점에서 +, 끝지점 구간에서 - 해준 뒤, 구간합을 구해주는 방법입니다.
 *
 * 자 만약 1 12와 같은 구간이 있다고 가정해볼게요. 그럼 arr 배열의 1번 인덱스에 +1 해줍니다. 그리고 마찬가지로 12번 인덱스를 -1로 표시할게요.
 * 0 1 0 0 0 0 0 0 0 0 0 -1
 * 그럼 다음으로 2 6에 대한 처리로 2번 인덱스를 +1, 6번 인덱스를 -1로 표시할게요.
 * 0 1 1 0 0 0 -1 0 0 0 0 0 -1
 * 그럼 이 구간을 모두 누적합 상태로 표시해볼게요.
 * 0 1 2 2 2 2 1 1 1 1 1 1 0
 * 우와 그럼 우리는 각 구간들이 얼마나 중첩되어있는지 효율적으로 확인할 수 있겠네요!!!
 *
 * 그렇게 중첩 시킨 배열은 아래와 같이 나오는데요.
 * [2, 2, 2, 4, 4, 4, 4, 4, 3, 3, 1, 1, 1, 1, 1, 0];
 * 이제 투 포인터로 옮기면서 구간을 잘랐을 때 나오는 A B를 구해봅시다!!!
 */

function solve() {
  const [n, k] = input[0].split(" ").map(Number);

  const arr = Array(1000002).fill(0);

  let maxEn = 0;
  for (let i = 1; i <= n; i++) {
    const [st, en] = input[i].split(" ").map(Number);

    arr[st]++;
    arr[en]--;

    maxEn = Math.max(st, en, maxEn);
  }

  for (let i = 1; i <= maxEn; i++) {
    arr[i] = arr[i - 1] + arr[i];
  }

  let en = 0;
  let tot = arr[0];

  for (let st = 0; st <= maxEn; st++) {
    while (en <= maxEn && tot < k) {
      en++;

      if (en <= maxEn) tot += arr[en];
    }

    if (en > maxEn) break;

    if (tot === k) {
      console.log(st, en + 1);
      return;
    }

    tot -= arr[st];
  }

  console.log("0 0");
}

solve();
