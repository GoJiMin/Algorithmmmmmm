const solution = (A , B) => {
    if(A === B) return 0;
    
    let result = 0;
    let arr = [...A];
    
    for(let i = arr.length; i > 0; i--) {
        let r = arr.pop();
        
        arr.unshift(r);
        
        result++;
        
        if(arr.join('') === B) return result;
    }
    
    return -1
}