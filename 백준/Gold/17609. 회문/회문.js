const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "input.txt")
  .toString()
  .trim()
  .split("\n");

const n = Number(input[0]);
const strs = [];

for (let i = 1; i <= n; i++) strs.push(input[i].trim());

/**
 * 음.. 포인터를 시작과 끝에 배치해보는 방법을 생각해봤는데요..
 *
 * 우선 left는 문자열의 시작점인 0, right는 문자열의 끝인 length - 1로 초기화합니다..
 * 그리고 현재 보고 있는 문자열이 동일한지 확인해서, 만약 다르다면 해당하는 문자열을 건너 뛴 값들을 조회해야곘죠?
 *
 * 예를 들어 xabba라면 left = 0, right = 4일 때, 이미 양 끝의 문자열이 달라요.
 * 그럼 x를 지운 abba에 대해 검사하고, a를 wldns xabb를 검사해요.
 *
 * 만약 여기서 하나라도 통과하면, xabba는 유사회문이겠죠? 만약 둘 다 아니라면 이건 아무것도 아닌 문자구요.
 *
 * 만약 위의 모든 검사에 통과한다면 그건 그냥 회문이겠죠?
 */
const result = [];

function isPalindrome(str, left, right) {
  while (left < right) {
    if (str[left] !== str[right]) return false;
    left++;
    right--;
  }
  return true;
}

function checkPalindrome(str) {
  let left = 0;
  let right = str.length - 1;

  while (left < right) {
    if (str[left] !== str[right]) {
      // 두 문자열이 다르다면, 왼쪽을 건너뛰거나, 오른쪽을 건너뛰거나
      const skipLeft = isPalindrome(str, left + 1, right);
      const skipRight = isPalindrome(str, left, right - 1);

      if (skipLeft || skipRight) return 1; // 둘 중 하나만 맞아도 유사회문..
      else return 2;
    } else {
      left++;
      right--;
    }
  }

  return 0;
}

for (let i = 0; i < n; i++) result.push(checkPalindrome(strs[i]));

console.log(result.join("\n"));
