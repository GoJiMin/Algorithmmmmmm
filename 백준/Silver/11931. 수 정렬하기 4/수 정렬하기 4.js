const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "input.txt")
  .toString()
  .trim()
  .split("\n");

const [n, ...arr] = input.map(Number);

const tmp = Array(2000005);

function merge(st, en) {
  const mid = ~~((st + en) / 2);

  let lidx = st;
  let ridx = mid;

  for (let i = st; i < en; i++) {
    if (ridx === en) tmp[i] = arr[lidx++];
    else if (lidx === mid) tmp[i] = arr[ridx++];
    else if (arr[ridx] <= arr[lidx]) tmp[i] = arr[lidx++];
    else tmp[i] = arr[ridx++];
  }

  for (let i = st; i < en; i++) arr[i] = tmp[i];
}

function merge_sort(st, en) {
  if (en - st === 1) return;

  const mid = ~~((st + en) / 2);

  merge_sort(st, mid);
  merge_sort(mid, en);

  merge(st, en);
}

merge_sort(0, n);

console.log(arr.join("\n"));
