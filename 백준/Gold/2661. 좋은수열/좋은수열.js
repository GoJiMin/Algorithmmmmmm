const input = require('fs')
  .readFileSync(process.platform === 'linux' ? '/dev/stdin' : 'input.txt')
  .toString()
  .trim();

const n = Number(input);
const digit = ['1', '2', '3'];

/**
 * ["1", "2", "3", "1", "2", "3"] => 123123이 나쁜 수열임을 어떻게 알 수 있을까?
 * 먼저 이 수열 123123의 모든 부분수열을 찾아 나쁜 수열인지 확인해야 함.
 *
 * len = 6 => i는 1부터 3까지 순회. 부분수열의 길이는 1부터 3까지 나오니까.
 * i = 1, j = 0
 * seq[6 - 0 - 1] = seq[5], seq[6 - 1 - 0 - 1] = seq[4] => seq[5]("3") !== seq[4]("2") 달라
 *
 * i = 2, j = 0
 * seq[6 - 0 - 1] = seq[5], seq[6 - 2 - 0 - 1] = seq[3] => seq[5]("3") !== seq[3]("1") 달라
 * 어차피 부분수열 2에서 하나가 다르면 나머지가 같아도 좋은 수열이니 바로 넘어가버리게 break
 *
 * i = 3, j = 0
 * seq[6 - 0 - 1] = seq[5], seq[6 - 3 - 0 - 1] = seq[2] => 3 === 3 같음
 * i = 3, j = 1
 * seq[6 - 1 - 1] = seq[4], seq[6 - 3 - 1 - 1] = seq[1] => 2 === 2 같음
 * i = 3, j = 2
 * seq[6 - 2 - 1] = seq[3], seq[6 - 3 - 2 - 1] = seq[0] => 1 === 1 같음
 * 이건 나쁜 수열이다.
 */
function isGood(seq) {
  const len = seq.length;
  for (let i = 1; i <= Math.floor(len / 2); i++) {
    let isEqual = true;
    for (let j = 0; j < i; j++) {
      if (seq[len - j - 1] !== seq[len - i - j - 1]) {
        isEqual = false;
        break;
      }
    }
    if (isEqual) return false;
  }
  return true;
}

function bt(seq) {
  if (seq.length === n) {
    console.log(seq.join(''));
    process.exit(0);
  }

  for (let i = 0; i < 3; i++) {
    seq.push(digit[i]);
    if (isGood(seq)) bt(seq);
    seq.pop();
  }
}

bt([]);
