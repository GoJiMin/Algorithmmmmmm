const solution = (A, B) => {
    A.sort((a, b) => a - b);
    B.sort((a, b) => b - a);
    
    return A.reduce((acc, cur, idx) => {
        let mul = cur * B[idx];
        
        return acc += mul
    }, 0)
}