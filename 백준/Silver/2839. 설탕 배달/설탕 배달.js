const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "input.txt")
  .toString()
  .trim();

/**
 * 상근이가 꿀 빨고 싶다네요.. 열심히 일해라.
 * 문제가 그리디스러운데..
 * 가장 적게 가져가려면 5킬로그램 봉지를 가장 많이 써야되는건 자명한 사실이죠?
 * 그럼 일단 주어진 n을 5로 나눌 수 있으면 최대한 나눠보고, 그 나눈 수를 3으로 나눌 수 있으면 그게 최소값.
 * 만약에 최대한 5로 나눴으나 3으로 나누어지지 않으면 나누는 수를 1씩 줄이면 어떨까요.
 * 일단 해보입시더.
 */

let n = parseInt(input); // 설탕 무게
let bagCount = 0;

while (n >= 0) {
  if (n % 5 === 0) {
    // 5kg로 나누어떨어지면
    bagCount += Math.floor(n / 5); // 필요한 5kg 봉지 개수 추가
    console.log(bagCount); // 결과 출력
    return; // 프로그램 종료
  }
  n -= 3; // 5kg로 나누어떨어지지 않으면 3kg 봉지 하나 추가
  bagCount++; // 봉지 개수 증가
}

console.log(-1); // 정확히 나눌 수 없는 경우
