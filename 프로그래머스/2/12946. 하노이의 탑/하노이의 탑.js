/**
* 큰 원판은 작은 원판 위에 위치할 수 없다.
* 하나의 기둥에 가장 아래 n번 원판이 위치하면 위로 n - 1개의 원판이 쌓인다.
* 1번 장대의 n번 원판을 3번 장대로 옮기려면 n - 1개의 원판은 2번 장대에 위치해야만 한다.
* n번 원판이 3번 장대로 이동하면 n - 1개의 원판을 3번 장대로 옮긴다.
* func(a = 시작 장대, b = 옮겨질 장대, n = 원판)일 때
* base condition은 n이 1일 때 마지막 원판이 움직였다고 판단해 a, b를 ans에 push...
* 장대가 움직이는 과정은? 6 - a - b => 장대 1, 2, 3이 있을 때 도착점이 아닌 장대는 6 - a - b니까..
*/

function solution(n) {
    const ans = [];
    
    function solve(a, b, n) {
        if(n === 1) {
            ans.push([a, b]);
            return;
        }
        
        // n - 1개의 원판을 도착점이 아닌 장대로 이동.
        solve(a, 6 - a - b, n - 1);
        ans.push([a, b]); // 이동 경로를 push
        solve(6 - a - b, b, n - 1); // n번 원판의 이동이 끝났다면 n - 1개의 원판도 b로 이동
    }
    
    solve(1, 3, n);
    return ans;
}