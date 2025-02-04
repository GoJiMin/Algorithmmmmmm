const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "input.txt")
  .toString()
  .trim()
  .split("\n");

/**
 * 음.. 우선 요구사항은..
 * 1. 입장을 확인한다.
 * - 개강총회 시작 이전 시간까지 대화를 한 적이 있어야 한다.
 * - 개강총회 시작이 11:00라면, 11:00까지 인정.
 * 2. 퇴장을 확인한다.
 * - 개강총회가 끝나고 스트리밍이 끝날 때까지 대화를 한 적이 있어야 한다.
 * - 개강총회가 끝나자마자, 혹은 스트리밍이 끝나자마자 채팅을 남겼다면 인정한다.
 */

const [seq, ...arr] = input;

// s = 개강총회 시작 시간, e = 개강총회 종료 시간, q = 스트리밍 종료 시간.
// 0번 인덱스는 시간, 1번 인덱스는 분.
const [s, e, q] = seq.split(" ").map((el) => el.split(":").map(Number));

const startMeet = s[0] * 60 + s[1];
const endMeet = e[0] * 60 + e[1];
const endStream = q[0] * 60 + q[1];

const logs = arr.map((el) => el.trim().split(" "));

const entrance = new Map();

let cnt = 0;
logs.forEach((log) => {
  const [time, name] = log;

  const splitted = time.split(":").map(Number);
  const toMinutes = splitted[0] * 60 + splitted[1];

  // 해당 로그의 시간을 분으로 바꿨을 때, 총회 시작시간 이하라면 입장 처리.
  if (toMinutes <= startMeet) entrance.set(name);

  // 총회가 끝난 뒤, 스트리밍이 끝날 때까지 로그가 있다면 퇴장 처리.
  if (toMinutes >= endMeet && toMinutes <= endStream && entrance.has(name)) {
    entrance.delete(name);
    cnt++;
  }
});

console.log(cnt);
