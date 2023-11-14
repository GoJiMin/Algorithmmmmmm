const solution = arr => {
    let result = [];
    
    arr.forEach((e, i) => {
        if(i === arr.length) {
            return
        } else if(e === arr[i + 1]) {
            return
        } else {
            result.push(e)
        }
    })
    
    return result
}