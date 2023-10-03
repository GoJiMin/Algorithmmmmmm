const solution = n => {
    const sqrt = ~~(Math.sqrt(n))
    
    return sqrt ** 2 === n ? (sqrt + 1) ** 2 : -1
}