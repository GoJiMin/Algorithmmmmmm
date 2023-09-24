const solution = (id_pw, db) => {
    const [id, pw] = id_pw;
    const data = new Map(db);
    
    return data.has(id) ? (data.get(id) === pw ? 'login' : 'wrong pw') : 'fail' 
}