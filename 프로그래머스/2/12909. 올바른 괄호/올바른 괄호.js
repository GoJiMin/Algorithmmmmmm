const solution = s => {
    let arr = [...s];
    let stack = 0;
    
    for(let i = 0; i < s.length; i++) {
        if(stack < 0) return false
        if(stack > arr.length) return false
    
        arr.pop() === ')' ? stack++ : stack--;
    }
    
    return stack === 0
}