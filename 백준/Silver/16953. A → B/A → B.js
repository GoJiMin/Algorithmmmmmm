const input = require('fs')
  .readFileSync(process.platform === 'linux' ? '/dev/stdin' : 'input.txt')
  .toString()
  .trim();

/**
 * A에서 B로 갈 수도 있지만.. 사실 B에서 A로 올 수도 있습니다..
 *
 * 재밌는게 짝수일 경우엔 역연산 x => x / 2가 가능하고,
 * 홀수라면 x => (x - 1) / 10으로 계산해서 구할 수 있습니다..
 */

const [A, B] = input.split(' ').map(Number);

let cnt = 0;
let x = B;

while (x > A) {
  if (x % 10 === 1) {
    x = (x - 1) / 10;
    cnt++;
  }
  //
  else if (x % 2 === 0) {
    x /= 2;
    cnt++;
  }
  // 아무것도 못하면 그냥 -1
  else {
    console.log(-1);
    process.exit(0);
  }
}

if (x === A) {
  // 최솟값에 1 더해서 출력..
  console.log(cnt + 1);
} else {
  console.log(-1);
}
