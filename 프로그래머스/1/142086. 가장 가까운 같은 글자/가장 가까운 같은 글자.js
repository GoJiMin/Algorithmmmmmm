const solution = str => {
    let stack = [];
    let result = [];
    
    for(let i = 0; i < str.length; i++) {
        if(!stack.includes(str[i])) {
            result.push(-1);
            stack.push(str[i]);
            continue;
        }
        if(stack.includes(str[i])) {
            result.push(stack.length - stack.lastIndexOf(str[i]));
            stack.push(str[i]);
            continue;
        }
    }
    
    return result
}