const solution = (numbers) => {
    const posnums = numbers.sort((a, b) => b - a);
    posnum = posnums[0] * posnums[1];
    
    const negnums = numbers.sort((a, b) => a - b);
    negnum = negnums[0] * negnums[1];
    
    return posnum > negnum ? posnum : negnum
}