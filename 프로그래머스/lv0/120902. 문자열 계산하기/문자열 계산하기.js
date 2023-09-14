const solution = str => {
    return (new Function(`return `+str))()
}