const solution = n => {
    const arr = Array(n).fill(1).map((v, i) => v + i);
    
    let total = 0;
    let result = 0;
    let start = 0;
    
    while(true) {
        for(let i = start; i < arr.length + 1; i++) {
            total += arr[i];
            
            if(total === n) {
                result++;
                total = 0;
                break;
            }
        
            if(total > n) {
                total = 0;
                break;
            }
        }
        start++;
        
        if(start === n) {
            break;
        }
    }
    
    return result
}