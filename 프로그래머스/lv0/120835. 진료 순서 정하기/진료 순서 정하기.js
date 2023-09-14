const solution = (arr) => {
    const sorted = arr.slice().sort((a, b) => b - a)
    
    return arr.map(v => sorted.indexOf(v) + 1)
}