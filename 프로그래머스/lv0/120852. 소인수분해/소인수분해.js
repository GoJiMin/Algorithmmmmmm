const solution = (n) => {
    let i = 2;
    let result = []
    
    while(n >= 2) {
        if(n % i === 0) {
            result.push(i)
            n = n / i
        }
        
        else i++
    }
    
    return [...new Set(result)]
}