const solution = (n, arr1, arr2) => {
    const binary1 = arr1.map(v => v.toString(2).padStart(n, '0'));
    const binary2 = arr2.map(v => v.toString(2).padStart(n, '0'));
    
    let result = [];
    
    for(let i = 0; i < binary1.length; i++) {
        let code = "";
        for(let j = 0; j < binary1[i].length; j++) {
            if(binary1[i][j] === "1" || binary2[i][j] === "1") {
                code += "#";
            } else {
                code += " ";
            }
        }
        
        result.push(code);
    }
    
    return result
}