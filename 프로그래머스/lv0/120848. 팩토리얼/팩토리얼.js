const solution = (n) => {
    const getFacto = (n) => {
        if(n <= 1) {
            return 1
        }
        return n * getFacto(n - 1)
    }
    let facto = 1;
    
    while(true) {
       let result = getFacto(facto)
       
       if(result > n) {
           facto--
           break;
       }
        facto++
    }
    return facto
}