const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "input.txt")
  .toString()
  .trim()
  .split("\n");

/**
 * 아.. 문제 엄청 풀기 싫게 생겼네..
 *
 * 일단 3개의 문자열이 모두 Fizz, Buzz, FizzBuzz.. 이런식으로 나오진 않습니다.. 소수가 하나씩은 끼어있으니까
 *
 * 그럼 그냥 주어진 문자열을 순회해서 숫자가 나오면 해당 숫자에 3 - i를 더해주면 됩니다.
 * Fizz
 * Buzz
 * 11
 * 의 경우엔 11을 찾고 11 + 3 - 2 => 12..
 */

function fizzBuzz(n) {
  if (n % 3 === 0) {
    if (n % 5 === 0) {
      return "FizzBuzz";
    } else {
      return "Fizz";
    }
  } else if (n % 5 === 0) {
    return "Buzz";
  } else {
    return n;
  }
}

for (let i = 0; i < input.length; i++) {
  const toNumber = parseInt(input[i]);
  if (toNumber) {
    console.log(fizzBuzz(toNumber + 3 - i));
    break;
  }
}
