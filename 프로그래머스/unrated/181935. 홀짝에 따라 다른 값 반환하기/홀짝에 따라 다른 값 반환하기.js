const solution = n => {
    const arr = Array(n).fill().map((v, i) => i + 1)
    
    return n % 2 === 1 ? arr.reduce((acc, cur) => {
        if(cur % 2 === 1) {
            return acc += cur
        }
        
        return acc
    }, 0)
    : arr.reduce((acc, cur) => {
        if(cur % 2 === 0) {
            return acc += cur**2
        }
        
        return acc
    }, 0)
}