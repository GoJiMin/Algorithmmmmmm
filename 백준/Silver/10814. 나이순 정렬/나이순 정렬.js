const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "input.txt")
  .toString()
  .trim()
  .split("\n");

const [n, ...arr] = input;

const members = arr.map((el) => el.trim().split(" "));

const tmp = Array(100001);

// 날먹 빌드.
// members.sort((a, b) => Number(a[0]) - Number(b[0]));

function merge(st, en) {
  const mid = ~~((st + en) / 2);

  let lidx = st;
  let ridx = mid;

  for (let i = st; i < en; i++) {
    if (ridx === en) tmp[i] = members[lidx++];
    else if (lidx === mid) tmp[i] = members[ridx++];
    else if (Number(members[lidx][0]) <= Number(members[ridx][0]))
      tmp[i] = members[lidx++];
    else tmp[i] = members[ridx++];
  }

  for (let i = st; i < en; i++) members[i] = tmp[i];
}

function merge_sort(st, en) {
  if (en - st === 1) return;

  const mid = ~~((st + en) / 2);

  merge_sort(st, mid);
  merge_sort(mid, en);

  merge(st, en);
}

merge_sort(0, +n);

let result = "";

for (let i = 0; i < n; i++) {
  result += members[i].join(" ") + "\n";
}

console.log(result);
