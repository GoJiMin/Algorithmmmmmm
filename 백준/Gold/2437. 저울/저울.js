const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "input.txt")
  .toString()
  .trim()
  .split("\n");

/**
 * 주어진 무게 추를 사용해서 측정할 수 없는 최소 무게를 구하라네요..
 * 예제 1의 경우 30이 나오기 전의 무게추를 모두 합한 무게가 20이라 21을 출력하는 거 같은데요..
 *
 * 그럼 이 무게추를 오름차순으로 정렬한 뒤에, 무게를 하나씩 더해가면서, 해당 무게에 +1을 하는식으로 가면 어떨까요..?
 */

// [1, 1, 2, 3, 6, 7, 30];
/**
 * 정렬된 무게추 배열인데요..
 * curWeight = 0; 으로 우선 현재 무게를 초기화하구요..
 *
 * 정렬된 무게추 배열을 순회합니다.
 * for(const w of arr)
 *
 * w라는 무게추로 현재 무게를 측정하려면 w가 curWeight보다 커야겠죠?
 * 또, 만약 현재까지 측정할 수 있는 무게가 6인데 무게추가 30이 나와버려요.
 * 그럼 당연히 우리가 측정할 수 있는 범위 중 가장 작은 무게는 6 + 1이 될 겁니다.
 * 그 사이의 공백이 너무 크잖아요?
 *
 * 그럼
 * if(w > curWeight + 1)라면 순회를 종료하고 curWeight + 1을 출력하면 되겠죠?
 *
 * 자 예제 1의 경우를 한 번 보고 맞나 봅시다..
 *
 * w = 1, curWeight = 0, 무게추 1로 0을 측정할 수 없죠? => curWeight = 1
 * w = 1, curWeight = 1, 무게추 1로 2를 측정할 수 없죠? => curWeight = 2
 * w = 2, curWeight = 2, 무게추 2로 3을 측정할 수 없죠? => curWeight = 4
 * w = 3, curWeight = 4, 무게추 3으로 5를 측정할 수 없죠? => curWeight = 7
 * w = 6, curWeight = 7, 무게추 6으로 8을 측정할 수 없죠? => curWeight = 13
 * w = 7, curWeight = 13, 무게추 7로 13을 측정할 수 없죠? => curWeight = 20
 * w = 30, curWeight = 20, 무게추 30으로 21을 측정할 수 있죠? => break.
 * result = 21
 */

const n = Number(input[0]);
const arr = input[1].split(" ").map(Number);

arr.sort((a, b) => a - b);

let curWeight = 0;

for (let i = 0; i < n; i++) {
  if (arr[i] > curWeight + 1) break;

  curWeight += arr[i];
}

console.log(curWeight + 1);
