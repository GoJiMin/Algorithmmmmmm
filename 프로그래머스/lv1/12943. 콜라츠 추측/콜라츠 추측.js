const solution = num => {
    let result = 0;
    
    const collatz = num => {
        if(num === 1) return result
        if(result >= 500) return -1
        result++
        return num % 2 === 0 ? collatz(num / 2) : collatz(num * 3 + 1)
    }
    
    return collatz(num)
}