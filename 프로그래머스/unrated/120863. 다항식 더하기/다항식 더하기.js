const solution = (polynomial) => {
    let arr= polynomial.split(' + ')
    let xTerm = 0;
    let constant = 0;
    arr.map((i)=>{
        if(i.includes("x")){
            const tmp = i.split("x")
            tmp[0] ? xTerm += parseInt(tmp[0]) : xTerm++
        } else if (i!== "+"){
            constant += parseInt(i)   
        }
    })
    if(xTerm !== 0 && constant !== 0){
        if(xTerm===1){
             return `x + ${constant}`
        }  
            return `${xTerm}x + ${constant}`
        
    }
    if(xTerm ===0 && constant !==0){
        return `${constant}`
    }
    if(xTerm !==0 && constant ===0){
        if(xTerm===1){
            return "x"
        }
        return `${xTerm}x`
    }
    if(xTerm===0 && constant ===0){
        return "0"
    }

}