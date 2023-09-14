const solution = (str, n) => {
    let result = []
    let i = 0
    
    while(i <= str.length) {
        if(i * n >= str.length) {
            break;
        }
        result.push(str.slice(i * n, ++i * n))
    }
    
    return result
}