// const input = require("fs")
//   .readFileSync(process.platform === "linux" ? "/dev/stdin" : "input.txt")
//   .toString()
//   .trim()
//   .split("\n");

// class Deque {
//   constructor(MX) {
//     this.data = Array(2 * MX);
//     this.head = MX;
//     this.tail = MX;
//   }

//   push_front(x) {
//     this.data[this.head--] = x;
//   }

//   push_back(x) {
//     this.data[++this.tail] = x;
//   }

//   pop_front() {
//     if (this.empty()) return;

//     return this.data[++this.head];
//   }

//   pop_back() {
//     if (this.empty()) return;

//     return this.data[this.tail--];
//   }

//   size() {
//     return this.tail - this.head;
//   }

//   empty() {
//     return this.size() === 0;
//   }
// }

// /** 요세푸스 문제랑 비슷한데..
//  * curIdx 변수를 사용해서 현재의 인덱스를 나타내고,
//  * target 변수를 사용해 각 풍선의 val 값을 더하거나 뺀다.
//  *
//  * 이 때 curIdx 값을 target으로 가기 위해 더하거나 뺀다.
//  *
//  * 이후에 target - curIdx가 음수일 경우, 덱의 마지막 인덱스 값을 앞으로 가져오고,
//  * 반대로 target - curIdx가 양수일 경우, 덱의 첫번째 인덱스 값을 맨 뒤로 보낸다.
//  *
//  */

// const n = Number(input[0]);
// const deque = new Deque(n + 1);

// const arr = input[1].split(" ");

// for (let i = 1; i < n; i++) {
//   deque.push_back({ idx: i + 1, val: Number(arr[i]) });
// }

// let curIdx = 1;
// let target = Number(arr[0]);

// const result = [1];

// while (!deque.empty()) {
//   if (target - curIdx > 0) {
//     // pop_front => push_back
//     deque.push_back(deque.pop_front());

//     curIdx++;
//   } else if (target - curIdx < 0) {
//     // pop_back => push_front
//     deque.push_front(deque.pop_back());

//     curIdx--;
//   }

//   if (target === curIdx) {
//     const { idx, val } = deque.pop_front();

//     target += val;
//     result.push(idx);
//   }
// }

// console.log(result.join(" "));

/**
 * 메모리 초과 이슈... 배열을 너무 크게 잡아서.. 혹은 저장되는 각 객체가 속성을 2개를 가져서..?
 * 그럼 따로 덱을 사용하지 않고 풀면..??
 */

// // 풍선 번호와 함께 관리
// const balloons = input[1]
//   .split(" ")
//   .map((value, index) => ({ index: index + 1, value: Number(value) }));

// const result = [];

// let current = 0; // 현재 터뜨릴 풍선의 인덱스
// while (balloons.length > 0) {
//   const { index, value } = balloons.splice(current, 1)[0]; // 현재 풍선 터뜨리기

//   result.push(index); // 터진 풍선의 번호 저장

//   if (balloons.length === 0) break; // 모든 풍선이 터졌으면 종료

//   // 다음 이동 위치 계산
//   if (value > 0) {
//     current = (current + (value - 1)) % balloons.length; // 오른쪽 이동
//   } else {
//     current = (current + value + balloons.length) % balloons.length; // 왼쪽 이동
//   }
// }

// console.log(result.join(" "));

/**
 * 하.. 게시판 좀 보고 풀걸.. 노드로는 못 푼다네요.. 시간 버렸네
 */

#include <iostream>
#include <deque>
#include <vector>
using namespace std;

int main() {
    int n;
    cin >> n;

    deque<pair<int, int>> balloons; 
    for (int i = 1; i <= n; i++) {
        int val;
        cin >> val;
        balloons.push_back({i, val});
    }

    vector<int> result;

    while (!balloons.empty()) {
        auto [idx, val] = balloons.front();
        balloons.pop_front();
        result.push_back(idx);

        if (balloons.empty()) break;

        if (val > 0) {
            for (int i = 0; i < val - 1; i++) { 
                balloons.push_back(balloons.front());
                balloons.pop_front();
            }
        } else {
            for (int i = 0; i < -val; i++) {
                balloons.push_front(balloons.back());
                balloons.pop_back();
            }
        }
    }

    for (int i = 0; i < result.size(); i++) {
        cout << result[i];
        if (i != result.size() - 1) cout << " ";
    }
    cout << endl;

    return 0;
}
