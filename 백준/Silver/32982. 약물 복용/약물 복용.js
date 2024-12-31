const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "input.txt")
  .toString()
  .trim()
  .split("\n");

const [N, K] = input[0].split(" ").map(Number);
const [A_s, A_e, B_s, B_e, C_s, C_e] = input[1].split(" ").map(Number);

// 전날 3번째 약 복용 시각 구간: [E, L]
let E = 0;
let L = Number.MAX_SAFE_INTEGER;

for (let i = 1; i <= N; i++) {
  // i일째의 시작 시각
  const dayStart = (i - 1) * 1440;

  // 아침 구간 계산
  let T1_min = dayStart + A_s;
  let T1_max = Math.min(dayStart + A_e, L + K);
  if (T1_min > T1_max) {
    console.log("NO");
    process.exit(0);
  }

  // 점심 구간 계산
  let T2_min = Math.max(dayStart + B_s, T1_min);
  let T2_max = Math.min(dayStart + B_e, T1_max + K);
  if (T2_min > T2_max) {
    console.log("NO");
    process.exit(0);
  }

  // 저녁 구간 계산
  let T3_min = Math.max(dayStart + C_s, T2_min);
  let T3_max = Math.min(dayStart + C_e, T2_max + K);
  if (T3_min > T3_max) {
    console.log("NO");
    process.exit(0);
  }

  // 오늘을 마치고 다음 날로 넘어가기 전의 시각 범위 [T3_min, T3_max]
  E = T3_min;
  L = T3_max;
}

// 여기까지 도달했다면, N일째 마지막(3번째) 약까지 모두 끊기지 않게 먹을 수 있는 스케줄이 존재한다는 의미
console.log("YES");
