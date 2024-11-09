/**
 * 배열을 오름차순으로 정렬하면 각 인용횟수가 순서대로 나열된다.
 * [3, 0, 6, 1, 5] => [ 0, 1, 3, 5, 6 ]
 * 그럼 배열을 순회하면 0번 이상 인용된 논문은 4편. 이하는 0편이다.
 * 다음으로 1번 이상 인용된 논문은 3편. 이하는 1편이다.
 * 다음으로 3번 이상 인용된 논문은 2편, 이하는 2편이다. 따라서 H-Index는 3이다.
 *
 * https://en.wikipedia.org/wiki/H-index 위키 보고 H-Indxe 계산하는게 더 좋네요.
 * [9, 7, 6, 2, 1]의 H-Index = 3, 인용횟수 3회 이상인 논문을 3개 가지기 때문.
 * 프로그래머스는 h번 이상이면서 h번 이하라고 거지 같이 문제를 내서 사람들이 뿔이 났습니다.
 */

function solution(citations) {
  citations.sort((a, b) => b - a);

  let cnt = 0;

  for (let i = 0; i < citations.length; i++) {
    if (citations[i] > cnt) cnt++;
  }

  return cnt;
}

const result = solution([3, 0, 6, 1, 5]);

console.log(result);
