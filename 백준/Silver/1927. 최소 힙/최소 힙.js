const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "input.txt")
  .toString()
  .trim()
  .split("\n");

/**
 * 최소 힙을 구현해보자..
 *
 * 이진 트리로 구현할 건데, 각 정점별로 자식은 2x, 2x + 1로 나타낼 수 있고, 각 자식의 부모는 x / 2로 찾을 수 있음.
 *
 *             8
 *      12         16
 *   17   18    20   24
 *
 * 위와 같은 트리 형태의 경우 arr = [null, 8, 12, 16, 17, 18, 20, 24]로 나타낼 수 있음.
 * 1번지의 부모의 자식은 (1 * 2)번지와 (1 * 2 + 1)번지인 arr[2] = 12, arr[3] = 16로 조회가 가능하다.
 * 마찬가지로 arr[2] = 12의 자식은 (2 * 2)번지와 (2 * 2 + 1)번지인 arr[4] = 17, arr[5] = 18로 조회가 가능함.
 * 그럼 반대로 arr[7] = 24의 부모는 Math.floor(7 / 2) = 3, arr[3] = 16으로 부모 조회도 가능함.
 */

const minHeap = Array(100005);
let size = 0;

/**
 * 우선 힙의 size + 1번지에 x를 넣는다.
 *
 * 만약 힙이 비어있었다면 바로 루트 위치에 x가 들어감.
 * 하지만 이미 힙에 요소가 들어있었다면, 반복문을 사용해 위치를 적절하게 바꿔준다.
 * minHeap = [undefined, 5]인 배열에 3이 들어간다면 다음과 같이 동작하게 된다.
 * minHeap = [undefined, 5, 3], size = 2
 *
 * idx = 2, parent = 1 => 가장 위에서 설명했듯, 부모는 x / 2로 구할 수 있음.
 * minHeap[idx(2)] = 3, minHeap[parent(1)] = 5
 * if(5 <= 3) 안 걸림.
 * swap(minHeap[idx], minHeap[parent])
 * then; minHeap = [undefined, 3, 5]
 *
 * 그럼 다시 이 상태에서 1을 넣어보면?
 * minHeap = [undefined, 3, 5, 1], size = 3
 * idx = 3, parent = 1 => 여전함
 * minHeap[idx(3)] = 1, minHeap[parent(1)] = 3
 * if(3 <= 1) 안 걸림.
 * swap(minHeap[idx], minHeap[parent])
 * then; minHeap = [undefined, 1, 3, 5]
 *
 * 그럼 이 배열을 트리 구조로 나타낸다면
 *        1
 *     3    5
 * 위와 같이 나타낼 수 있음. 1번지 1의 자식은 2 * 1 => 3과, 2 * 1 + 1 => 5로 잘 나타남.
 *
 * 그럼 이번엔 적당히 4를 넣어보면?
 * minHeap = [undefined, 1, 3, 5, 4], size = 4
 * idx = 4, parent = 2
 * minHeap[idx(4)] = 4, minHeap[parent(2)] = 3
 * if(3 <= 4) 걸려서 바로 break
 * then; minHeap = [undefined, 1, 3, 5, 4]
 *          1
 *       3    5
 *     4
 * 아주 잘 들어감.
 */
function push(x) {
  minHeap[++size] = x;

  let idx = size;
  while (idx !== 1) {
    const parent = Math.floor(idx / 2);

    if (minHeap[parent] <= minHeap[idx]) break;
    [minHeap[idx], minHeap[parent]] = [minHeap[parent], minHeap[idx]];

    idx = parent;
  }
}

/**
 * 그냥 1번지 출력하면 끝남
 */
function top() {
  return size === 0 ? 0 : minHeap[1];
}

/**
 * 우선 1번지 값을 줘야 함. 최소힙이니까..
 * 그럼 1번지의 값을 적절히 바꿔줘야 한다. size의 마지막 값을 1번지로 이동시켜서 다시 적절히 값을 교체해주면 됨
 *
 *
 * minHeap = [undefined, 1, 3, 5, 4, 6], size = 5, minHeap[1] = minHeap[5] => size = 4
 * minHeap = [undefined, 6, 3, 5, 4], size = 4
 *
 * idx = 1, 2 <= 4
 * leftChild = 2, rightChild = 3 => 노드 x의 자식은 2x, 2x + 1로 조회가 가능하니까
 * minChild = 2
 * if(rightChild(3) <= size(4) && minHeap[rightChild(3)] = 5 < minHeap[leftChild(2)] = 3) 안 걸림
 * if(minHeap[idx(1)] = 6 <= minHeap[minChild(2)] = 3) 안 걸림
 * swap(minHeap[idx(1)], minHeap[minChild(2)])
 * then; minHeap = [undefined, 3, 6, 5, 4] idx = 2
 *
 * minHeap = [undefined, 3, 6, 5, 4], size = 4
 * idx = 2, 4 <= 4 한 번 더
 * leftChild = 4, rightChild = 5
 * minChild = 4
 *
 * if(rightChild(5) <= 4 && minHeap[rightChild(5)] = 안 보이지만 6임 < minHeap[leftChild(4)] = 4) 어차피 size 때문에 안 걸림
 * if(minHeap[idx(2)] = 6 <= minHeap[minChild(4)] = 4) 안 걸림
 * swap(minHeap[idx(2)], minHeap[minChild(4)])
 * then; minHeap = [undefined, 3, 4, 5, 6], idx = 4
 *
 * 2 * 4 <= 4로 종료.
 *
 * 트리로 보자면 처음 minHeap = [undefined, 1, 3, 5, 4, 6]에서 pop이 일어날 때,
 *          1                       6                      3                       3
 *      3      5     =>        3        5    =>       6        5      =>      4         5
 *    4  6                  4                      4                       6
 *  [1, 3, 5, 4, 6]         [6, 3, 5, 4]            [3, 6, 5, 4]            [3, 4, 5, 6]
 */
function pop() {
  if (size === 0) return;
  minHeap[1] = minHeap[size--];

  let idx = 1;
  while (2 * idx <= size) {
    const leftChild = 2 * idx;
    const rightChild = 2 * idx + 1;

    let minChild = leftChild;
    if (rightChild <= size && minHeap[rightChild] < minHeap[leftChild]) {
      minChild = rightChild;
    }

    if (minHeap[idx] <= minHeap[minChild]) break;
    [minHeap[idx], minHeap[minChild]] = [minHeap[minChild], minHeap[idx]];

    idx = minChild;
  }
}
const n = Number(input[0]);
const result = [];

for (let i = 1; i <= n; i++) {
  const op = Number(input[i]);

  // op가 자연수면 배열에 넣고, 0이라면 최소 값을 출력한 뒤 제거
  if (op === 0) {
    result.push(top());
    pop();
  } else {
    push(op);
  }
}

console.log(result.join("\n"));
