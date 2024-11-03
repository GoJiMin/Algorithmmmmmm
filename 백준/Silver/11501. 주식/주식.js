const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "input.txt")
  .toString()
  .trim()
  .split("\n");

/**
 * 최대 이익이 나려면 당연히 싸게 사서 제일 비쌀 때 팔아야겠죠..?
 * 입력으로 주어지는 주가 정보는 날 별로 정리되어있으니 정렬이 안됩니다..
 * 그럼 뒤에서부터 비싼 주가를 선택하고, 그 주가보다 낮다면 전부 비싼 주가에서 뺀 값을 더합시다..
 * 더 비싼 주가가 나오면 바꾸면 됩니다..
 */

const T = Number(input[0]);

const result = [];

for (let i = 0; i < T; i++) {
  const n = Number(input[1 + i * 2]);
  const stocks = input[2 + i * 2].split(" ").map(Number);

  let maxVal = stocks[n - 1];
  let maxProfit = 0;

  for (let j = n - 2; j >= 0; j--) {
    if (stocks[j] > maxVal) {
      maxVal = stocks[j];
    } else {
      maxProfit += maxVal - stocks[j];
    }
  }

  result.push(maxProfit);
}

// 맞았죠..?
console.log(result.join("\n"));
