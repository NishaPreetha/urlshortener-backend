import jwt from "jsonwebtoken";
//token generation for login
export function generateToken(id){
    return jwt.sign({id},process.env.secret_key);
}
//token generation for reset password link
export function generateExpiryToken(id){
    return jwt.sign({id},process.env.secret_key,{expiresIn:"1h"});
}
//custom authorization middleware
export function isAuthorized(req,res,next){
    //getting headers 
    const token=req.headers["x-auth-token"];
    if(!token){
        res.status(400).json({message:"Access denied"});
    }else{
        //comparing and verifying
        jwt.verify(token,process.env.secret_key);
        next();
    }
}

//custom authorization middleware for login alone
export function isAuthorizedLogin(req,res,next){
    //getting headers 
    const pass=req.headers["pass-token"];
    if(!pass){
        res.status(400).json({message:"Access denied"});
    }else{
        //comparing and verifying
        const check=pass==process.env.password;
        console.log(pass,typeof(pass));
        console.log(process.env.password,typeof(process.env.password))
        if(check==true){
            console.log("passed",check)
            next();
        }else{
            console.log("failed",check)
            res.status(400).json({message:"Invalid Admin"});
        }
    }
}