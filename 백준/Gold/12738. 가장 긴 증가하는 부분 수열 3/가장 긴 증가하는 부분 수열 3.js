const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "input.txt")
  .toString()
  .trim()
  .split("\n");

const n = Number(input[0]);
const arr = input[1].split(" ").map(Number);

const LIS = [];

// 음수도 나오는데.. 이게 사실 LIS 배열의 원소가 변경되어도 길이만 출력하면 되기에 코드의 복잡성은 없음.
// 만약 실제로 수열의 원소를 출력한다면 역추적하느라 정말 정말 어려울듯..

for (let i = 0; i < n; i++) {
  const x = arr[i];

  if (LIS.length === 0 || LIS.at(-1) < x) {
    LIS.push(x);
    continue;
  }

  let st = 0;
  let en = LIS.length - 1;
  let pos;

  while (st <= en) {
    const mid = Math.floor((st + en) / 2);

    if (LIS[mid] >= x) {
      en = mid - 1;
      pos = mid;
    } else {
      st = mid + 1;
    }
  }

  LIS[pos] = x;
}

console.log(LIS.length);
