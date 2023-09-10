const solution = (cipher, code) => ['', ...cipher].reduce((acc, cur, i) => {
    if(i % code === 0) {
        acc += cur
    }
    
    return acc
})