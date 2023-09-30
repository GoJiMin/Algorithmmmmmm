const solution = (x, n) => {
    let total = [];
    let result = x;
    
    for(let i = 0; i < n; i++) {
        total.push(result)
        result += x
    }
    
    return total
}