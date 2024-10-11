const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "input.txt")
  .toString()
  .trim()
  .split("\n");

const n = Number(input[0]);

const arr = [];
const tmp = Array(n);

for (let i = 1; i <= n; i++) {
  arr.push(Number(input[i]));
}

function merge(st, en) {
  const mid = ~~((st + en) / 2);

  let l_idx = st;
  let r_idx = mid;

  for (let i = st; i < en; i++) {
    if (r_idx === en) tmp[i] = arr[l_idx++];
    else if (l_idx === mid) tmp[i] = arr[r_idx++];
    else if (arr[l_idx] <= arr[r_idx]) tmp[i] = arr[l_idx++];
    else tmp[i] = arr[r_idx++];
  }

  for (let i = st; i < en; i++) arr[i] = tmp[i];
}

function merge_sort(st, en) {
  if (en - st === 1) return;

  const mid = ~~((st + en) / 2);

  merge_sort(st, mid); // arr의 st부터 mid - 1 인덱스까지 정렬.
  merge_sort(mid, en); // arr의 mid부터 en - 1 인덱스까지 정렬.

  merge(st, en);
}

merge_sort(0, n);

console.log(arr.join("\n"));
