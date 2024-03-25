const solution = n => {
    const sqrt = ~~(Math.sqrt(n));
    
    return Math.pow(sqrt, 2) === n ? Math.pow(sqrt+1, 2) : -1
}