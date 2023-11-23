const solution = (nums) => {
    const mul = nums.reduce((acc, cur) => acc * cur);
    const sum = nums.reduce((acc, cur) => acc + cur)**2;
    
    return mul > sum ? 0 : 1
}