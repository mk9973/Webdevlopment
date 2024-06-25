import jwt from "jsonwebtoken";

const jwtAuth =(req,res,next)=>{

    //1. Read the Token
    const token= req.headers['authorization'];

    //2. If no token, return the error
    if(!token){
        return res.status(401).send('Unauthorized');
    }

    //3. Check if token is valid
    try{
       const payload= jwt.verify(
            token,
            'FajKSq7ckDgv8alY0rdNTUvuePvSwvBw'
        );
        console.log(payload);
    }
    catch(err){
        //4. return error
        return res.status(401).send("Unauthorized")
    }

    //5. call next middleware
    next();
};

export default jwtAuth;