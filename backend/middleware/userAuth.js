const JWT_SECRET=require('../config');
const jwt=require('jsonwebtoken');


// const {User} =require("./db");

const userMiddleware=async (req,res,next)=>{
    const authHeader=req.headers['authorization'];
    if(!authHeader || !authHeader.startsWith('Bearer')){
        return res.status(401).json({
            meassage:"Authorization Header is missing or wrong"
        })
    }
    try{
        const token=authHeader.split(' ')[1];
        const decoded=jwt.verify(token,JWT_SECRET);
        // console.log(decoded.user._id);
        if(decoded.userId){
            req.userId=decoded.userId;
            next();
        }else{
            return res.status(403).json({
                message:"wrong with the Header"
            });
        }
    }catch(err){
        console.error(err);
        return res.status(401).json({msg:"Internal Server Error"});
    }
}
// const checkMiddleware=(req,res,next)=>{
//     const userHeader=req.headers['Authorization'];
//     const token=userHeader.split(' ')[1];
//     const decode=jwt.verify(token,JWT_SECRET);
//     if(decode){
//         req.userId=decode.userId;
//         next();
//     }
// }
module.exports={
    userMiddleware,
    // checkMiddleware
}