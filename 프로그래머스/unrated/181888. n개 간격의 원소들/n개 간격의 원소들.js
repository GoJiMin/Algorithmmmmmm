const solution = (nums, n) => {
    let result = [];
    
    for(let i = 0; i < nums.length; i += n) {
        result.push(nums[i])
    }
    
    return result
}