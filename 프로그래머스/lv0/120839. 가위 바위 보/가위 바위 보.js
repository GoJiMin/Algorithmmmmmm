const solution = (rsp) => [...rsp].map(s => 
    s === '2' ? s = '0' : (s === '0' ?  s = '5' : s = '2')
).join('')