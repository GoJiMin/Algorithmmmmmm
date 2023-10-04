const solution = (phone_number) => {
    const hide = phone_number.slice(0, phone_number.length - 4)
    const back = phone_number.slice(-4)
    
    return hide.replace(/[0-9]/g, '*') + back
}