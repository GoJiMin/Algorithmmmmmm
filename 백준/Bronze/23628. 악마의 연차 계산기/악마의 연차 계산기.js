const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "input.txt")
  .toString()
  .trim()
  .split("\n");

// 월차와 연차는 각각 매달, 매해의 입사일과 같은 날에 지급. 입사 당일에는 연차, 월차 X
// 월차는 3년차까지 1개월당 1개 => 3년차는 최대 36개
// 연차는 1년에 A + 15개
// 여기서 A는 입사할 때 0으로 시작, 2n + 1년 차마다 1씩 증가. 그냥 3년차마다 증가라는 거죠?

const [yearS, monthS, dayS] = input[0].trim().split(" ").map(Number);
const [yearE, monthE, dayE] = input[1].trim().split(" ").map(Number);

const subTotal = (yearE - yearS) * 360 + (monthE - monthS) * 30 + dayE - dayS;

const montlyLeave = Math.min(36, Math.floor(subTotal / 30));

let yearlyLeave = 0;

for (let y = 1; y <= Math.floor(subTotal / 360); y++) {
  const A = Math.floor((y - 1) / 2);

  yearlyLeave += A + 15;
}

console.log(`${yearlyLeave} ${montlyLeave}` + "\n" + `${subTotal}days`);
