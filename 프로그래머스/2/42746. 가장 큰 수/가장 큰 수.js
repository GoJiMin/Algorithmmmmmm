/**
 * 자바스크립트의 sort는 인자 a, b를 받아 리턴 값에 따라 정렬이 이루어진다.
 * 0 = 제자리, 양수 = 내림차순(b가 a 앞으로 위치함), 음수 = 오름차순(a가 b 앞으로 위치함).
 * b + a > a + b라면 b를 a보다 앞에 두어 정렬한다.
 * 위의 방법으로 정렬한 수를 이어붙이면 가장 큰 수가 나온다.
 
 - 예제 [547, 54, 5]
 - 1. a = 54, b = 547 => a + b = 54547, b + a = 54754 => ab < ba [54, 547, 5]
 - 2. a = 5, b = 54 => a + b = 554, b + a = 545 =>  ab > ba [5, 54, 547]
 */

function solution(numbers) {
  numbers.sort((a, b) => {
    a = a + "";
    b = b + "";

    return b + a > a + b ? 1 : -1;
  });

  // 예외 0

  return numbers[0] === 0 ? "0" : numbers.join("");
}