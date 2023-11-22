const solution = (str, num) => {
    const arr = str.split('');
    let result = [];
    
    arr.forEach(s => {
        const charCode = s.charCodeAt() + num;
        let min = 97;
        let max = 122;
        
        if(charCode - num === 32) {
            result.push(s);
        }
        
        if(s.toUpperCase() === s) {
            min = 65;
            max = 90;
        }
        
        if(charCode >= min && charCode <= max) {
            result.push(String.fromCharCode(charCode))
        }
        
        if(charCode > max) {
            const overflow = charCode - max - 1;
            const newCharCode = min + overflow
            
            result.push(String.fromCharCode(newCharCode))
        }
        
    })
    
    return result.join('');
}