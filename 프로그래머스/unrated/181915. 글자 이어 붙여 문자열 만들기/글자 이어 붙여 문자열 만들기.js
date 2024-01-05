const solution = (str, idx) => {
    let result = ''
    
    for(let i = 0; i < idx.length; i++) {
        result += str[idx[i]];
    }
    
    return result
}