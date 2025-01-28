/**
 * 흠.. 일단 N의 자리 수 중에서 신기한 소수를 찾아야 되는데요.
 * 7331의 경우에 오른쪽 하나 제외하고, 733, 73, 7 이렇게 떼어내서 소수니까 신기한 소수라는 것 같은데..
 *
 * 그럼 일단 N이 어떻게 주어지던, 결국 맨 왼쪽 수는 2, 3, 5, 7 이렇게 소수 중에 하나만 올 수 있죠?
 *
 * 그럼 N이 주어졌을 때, 2, 3, 5, 7부터 시작해서, 뒤에 수를 하나씩 붙여가며 소수인지 판단해도 되지 않을까요?
 */
/**
 * 아 제발!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
 * 메모리 제한 4MB 뭐냐고!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
 * 또, 또, 노드는 못 풀죠?
 */

#include <bits/stdc++.h>
using namespace std;

int N;

// 소수 판별
bool isPrime(int num) {
    if (num < 2) return false;
    for (int i = 2; i * i <= num; i++) {
        if (num % i == 0) return false;
    }
    return true;
}

// 현재까지 만든 수 cur, 자릿수 length..
void dfs(int cur, int length) {
    // length가 N이 되면 출력..
    if (length == N) {
        cout << cur << "\n";
        return;
    }

    // 다음 자릿수를 0~9로 시도..
    for (int digit = 0; digit < 10; digit++) {
        int nextNum = cur * 10 + digit;
        // 매번 소수 판별
        if (isPrime(nextNum)) {
            dfs(nextNum, length + 1);
        }
    }
}

int main(){
    ios::sync_with_stdio(false);
    cin.tie(NULL);

    cin >> N;
    
    // 1자리 소수로 시작 (2,3,5,7)
    // 여기서부터 자릿수를 늘려가며 검사
    // (자릿수가 1인 상태에서 DFS)
    if (N >= 1) {
        // 시작 자릿수
        vector<int> startPrimes = {2, 3, 5, 7};
        for (int sp : startPrimes) {
            dfs(sp, 1);
        }
    }

    return 0;
}