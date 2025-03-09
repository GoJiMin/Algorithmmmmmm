const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "input.txt")
  .toString()
  .trim();

const [a, b, v] = input.split(" ").map(Number);

/**
 * 달팽이는 매일 a만큼 올라가지만 밤에는 b만큼 떨어짐.
 * 그럼 결국 하루에 올라갈 수 있는 높이는 a - b이다.
 *
 * 달팽이가 정상에 도착한 마지막 날에는 미끄리지지 않으니 달팽이가 올라갸아할 최소 높이는 v - a임.
 *
 * (v - a) / (a - b) => v에 도달하는 날은 a만큼만 올라가고 나머지는 a - b만큼 올라간다.
 */

// 하루 단위로 이동하는데 소수점만 나와도 올림해서 하루 추가해줘야 함.
// v - a에 대해 하루 추가함 +1
console.log(Math.ceil((v - a) / (a - b)) + 1);
