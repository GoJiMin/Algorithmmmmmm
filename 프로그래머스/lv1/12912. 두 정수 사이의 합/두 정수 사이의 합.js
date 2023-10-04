const solution = (a , b) => {
    let result = Math.min(a, b);
    let init = result;
    
    for(let i = 0; i < Math.abs(a - b); i++) {
        init++;
        result += init
    }
    
    return result
}