const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "input.txt")
  .toString()
  .trim();

// 랜덤마라톤.... 브론즈 5는 너무한 거 아닌가요

const board = [
  "empty",
  [11, "A B C D E F G H J L M"],
  [9, "A C E F G H I L M"],
  [9, "A C E F G H I L M"],
  [9, "A B C E F G H L M"],
  [8, "A C E F G H L M"],
  [8, "A C E F G H L M"],
  [8, "A C E F G H L M"],
  [8, "A C E F G H L M"],
  [8, "A C E F G H L M"],
  [8, "A B C F G H L M"],
];

console.log(board[input].join("\n"));
