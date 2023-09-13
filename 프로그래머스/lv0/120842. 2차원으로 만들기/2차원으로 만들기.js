const solution = (arr, n) => {
    const newArr = []
    
    for(let i = 0; i < arr.length; i += n) {
        newArr.push(arr.slice(i, i + n))
    }
    
    return newArr
}