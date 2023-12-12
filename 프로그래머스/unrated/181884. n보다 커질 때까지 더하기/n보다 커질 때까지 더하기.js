const solution = (nums, n) => nums.reduce((acc, cur) => {
    if(acc <= n) {
        acc += cur
    }
    
    return acc
}, 0)