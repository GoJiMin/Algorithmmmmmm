const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "input.txt")
  .toString()
  .trim()
  .split("\n");

const [n, ...arr] = input;

/**
 * 짜증나는 문제군요..
 * 1시에 수업이 시작되면 3시에 끝납니다.
 * 2시에 수업이 시작되면 4시에 끝납니다.
 * 3시에 수업이 시작되면 5시에 끝납니다.
 
 * 1시에 수업이 시작되면 강의실이 1개 필요합니다. => 3시에 수업이 끝나 강의실이 필요 없어집니다.
 * 1시에 수업이 시작됩니다. => 현재 강의실 1개.
 * 2시에 수업이 시작됩니다. => 현재 강의실 2개.
 * 3시에 수업이 종료됩니다. => 현재 강의실 1개.
 * 3시에 수업이 시작됩니다. => 현재 강의실 2개.
 * 4시에 수업이 종료됩니다. => 현재 강의실 1개.
 * 5시에 수업이 종료됩니다. => 현재 강의실 0개.
 * 강의실은 총 2개 필요합니다.
 */

const timeTable = [];
for (let i = 0; i < n; i++) {
  const [s, t] = arr[i].trim().split(" ").map(Number);
  timeTable.push([s, 1]);
  timeTable.push([t, -1]);
}

timeTable.sort((a, b) => a[0] - b[0] || a[1] - b[1]);

let maxRoomCnt = 0;
let curRoomCnt = 0;

for (let i = 0; i < timeTable.length; i++) {
  curRoomCnt += timeTable[i][1];
  if (curRoomCnt > maxRoomCnt) maxRoomCnt = curRoomCnt;
}

console.log(maxRoomCnt);
