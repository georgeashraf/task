const jwt = require('jsonwebtoken');
const SECRET = 'myjwtsecret0';

module.exports=function (req,res,next){
    const token = req.header('auth-token');
    console.log(token)
    if(!token){
       return res.status(401).json('Access Denied');   
    }
    try{
        const payload = jwt.verify(token,SECRET);
        req.user = payload;
        next();
    } catch(err){
         res.status(400).json('invalid token');
    }
};


