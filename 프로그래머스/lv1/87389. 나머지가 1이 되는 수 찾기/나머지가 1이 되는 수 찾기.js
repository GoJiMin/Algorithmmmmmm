const solution = (n) => {
    let r = 0;
    while(true) {
        let i;
        
        i = n % r;
        if(i === 1) {
            break;
        }
        r++
    }
    
    return r
}