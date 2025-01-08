// const input = require("fs")
//   .readFileSync(process.platform === "linux" ? "/dev/stdin" : "input.txt")
//   .toString()
//   .trim()
//   .split("\n");

// /**
//  * 이거 그냥 10원을 만들고 싶은데 내가 2원이 있다면,
//  *
//  * 10원은 (10 - 2)원과 2원.. 즉 내가 8원을 만들 수 있는 모든 경우의 수에
//    2원을 만들 수 있는 모든 경우의 수들을 더해주면 되는 거 아닙니까?
//  */

// const [nk, ...arr] = input;

// const [_, k] = nk.split(" ").map(Number);
// const coins = arr.map(Number);

// const dp = Array(k + 1).fill(0);

// dp[0] = 1;

// for (const coin of coins) {
//   for (let price = coin; price <= 10; price++) {
//     dp[price] += dp[price - coin];
//   }
// }

// console.log(dp[k]);

// node.js 서러워서 살겠나 메모리 제한 때문에 못 푼답니다. 하 참 나

#include <bits/stdc++.h>
using namespace std;

int main(){
    ios::sync_with_stdio(false); 
    cin.tie(nullptr);

    int n, k;
    cin >> n >> k;

    vector<int> coins(n);
    for(int i = 0; i < n; i++){
        cin >> coins[i];
    }

    vector<long long> dp(k + 1, 0LL);

    dp[0] = 1LL;

    for(int coin : coins){
        for(int price = coin; price <= k; price++){
            dp[price] += dp[price - coin];
        }
    }

    cout << dp[k] << "\n";
    return 0;
}