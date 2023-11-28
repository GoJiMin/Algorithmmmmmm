const solution = n => {
    const regExp = /1/gi;
    
    const binary = n.toString(2);
    const binaryNumberOfOnes = binary.match(regExp).length;
    
    let nextNumber = n + 1;
    
    while(true) {
        let nextNumberBinary = nextNumber.toString(2);
        let nextNumberOfOnes = nextNumberBinary.match(regExp).length;
        
        if(binaryNumberOfOnes === nextNumberOfOnes) break;
        
        nextNumber++;
    }
    
    return nextNumber
}