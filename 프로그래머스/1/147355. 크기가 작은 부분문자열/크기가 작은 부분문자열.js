const solution = (t, p) => {
    const P_LENGTH = p.length;
    let arr = [];
    let result = 0;
    
    for(let i = 0; i < t.length; i++) {
        if(t.slice(i, P_LENGTH + i).length === P_LENGTH) {
            arr.push(t.slice(i, P_LENGTH + i))
        }
    }
    
    arr.map(v => v / 1 <= p / 1 && result++)
    
    return result
}