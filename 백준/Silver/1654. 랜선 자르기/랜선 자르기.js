const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "input.txt")
  .toString()
  .trim()
  .split("\n");

/* 
 하.. 분명히 이전에 풀었던 이분탐색 문제는 mid = (st + en) / 2로 갱신하면서 범위를 좁혔는데.. 이건 도대체 뭐지..?

 일단 생각나는 풀이법은 최소 길이 1cm, 최대 길이는 주어진 랜선 중에서 가장 긴 길이.. 예제 1의 경우엔 802cm

 그럼 (1 + 802) / 2 = 401, 401cm의 길이로 랜선을 잘랐을 때 11개의 랜선을 만들 수 있는지 확인하고,
 만들 수 없다면 en = 401로 갱신, 반복..?
*/

const [nk, ...arr] = input;

const [_, k] = nk.split(" ").map(Number);
const lans = arr.map(Number);

let st = 1;
let en = Math.max(...lans);
let ans = 0;

while (st <= en) {
  const mid = Math.floor((st + en) / 2);

  let cnt = 0;

  lans.forEach((lan) => (cnt += Math.floor(lan / mid)));

  if (k <= cnt) {
    st = mid + 1;
    ans = mid;
  } else {
    en = mid - 1;
  }
}

console.log(ans);
