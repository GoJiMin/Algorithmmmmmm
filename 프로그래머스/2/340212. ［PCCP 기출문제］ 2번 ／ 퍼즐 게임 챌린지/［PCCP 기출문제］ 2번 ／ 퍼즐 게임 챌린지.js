// 이분탐색?
// 퍼즐은 항상 첫 번째(0번 인덱스)부터 풀기 시작함..
// level은 어쨌든 diffs 배열의 레벨 사이에서만 나올듯

function solution(diffs, times, limit) {
    const len = diffs.length;
    
    function getTotalTime(level) {
        let val = times[0]; // 어차피 퍼즐은 1번부터 품.
        
        // diff <= level => time_cur만 사용함.
        // diff > level => diff - level 만큼 다시 푸는데 이전 문제도 같이 풀어야 함.
        for(let i = 1; i < len; i++) {
            if(diffs[i] <= level) {
                val += times[i];
            } else {
                val += (times[i] + times[i - 1]) * (diffs[i] - level) + times[i]
            }
        }
        
        return val;
    }
    
    let st = 1;
    let en = diffs[0];
    
    for (let i = 1; i < diffs.length; i++) {
        if (diffs[i] > en) en = diffs[i];
    }
    
    let result = en;
    while(st <= en) {
        const mid = Math.floor((st + en) / 2);
        
        // 제한시간보다 작으면 우선 result를 갱신하고 en을 mid - 1로 갱신함 숙련도가 널널하니까.
        if(getTotalTime(mid) <= limit) {
            result = mid;
            en = mid - 1;
        } else {
            st = mid + 1;
        }
    }
    
    return result;
}
