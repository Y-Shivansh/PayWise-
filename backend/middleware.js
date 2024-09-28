const jwt= require("jsonwebtoken")
const {JWT_SECRET}= require("./config")
const authMiddleware= (req,res,next)=>{
    const authHeader= req.headers.authorization
    if(!authHeader || !authHeader.startsWith('Bearer ')){
        return res.status(403).json({message: "no authorisation"})
    }
    const token= authHeader.split(' ')[1]
    try{
        const decoded= jwt.verify(token, JWT_SECRET);
        if(decoded){
            req.userId= decoded.userId
            // console.log("done");
            next();
        }
        else{
            return res.status(403).json({message: "something went seriously wrong"})
        }
    }
    catch(err){
        return res.status(403).json({
            message: "something went wrong"
        })
    }
}
module.exports= {authMiddleware}