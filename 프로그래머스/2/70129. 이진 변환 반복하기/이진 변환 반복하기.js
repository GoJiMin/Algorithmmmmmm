const solution = s => {
    let transCount = 0;
    let zeroCount = 0;
    let before = s;
    
    const binaryTransformation = (str) => {
        const removeLength = [...str].filter(n => n !== '0').length;
        const binary = removeLength.toString(2);
        
        transCount++;
        zeroCount += str.length - removeLength;
        
        return binary
    }
    
    while(true) {
        const binary = binaryTransformation(before);
        
        if(binary === '1') {
            break;
        }
        
        before = binary;
        
    }
    
    return [transCount, zeroCount]
}

