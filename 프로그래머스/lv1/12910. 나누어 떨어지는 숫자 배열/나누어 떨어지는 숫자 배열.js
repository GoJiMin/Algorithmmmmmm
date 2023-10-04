const solution = (arr , divisor) => {
    const divided = arr.filter(num => num % divisor === 0).sort((a, b) => a - b)
    
    return divided.length === 0 ? [-1] : divided
}