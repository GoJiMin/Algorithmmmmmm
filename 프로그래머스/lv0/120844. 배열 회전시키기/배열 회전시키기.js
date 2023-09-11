const solution = (nums, dir) => {
    dir === 'right' ? nums.unshift(nums.pop()) : nums.push(nums.shift())
    
    return nums
}