const solution = ([...str], n1, n2) => {
    [str[n1], str[n2]] = [str[n2], str[n1]]
    return str.join('')
}