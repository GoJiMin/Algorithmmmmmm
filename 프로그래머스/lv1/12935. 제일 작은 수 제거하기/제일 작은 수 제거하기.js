const solution = (arr) => {
    const min = Math.min(...arr)
    const idx = arr.indexOf(min)
    
    arr.splice(idx, 1)
    
    return arr.length === 0 ? [-1] : arr
}