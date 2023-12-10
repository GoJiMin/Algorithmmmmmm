const solution = num_str => [...num_str].reduce((acc, cur) => {
    return acc += Number(cur)
}, 0)