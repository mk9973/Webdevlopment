import UserModel from "../features/user/user.model.js";

const basicAuthorizer=(req,res,next)=>{

    //1. Check if authorization header is empty

    const authHeader = req.headers["authorization"];

    if(!authHeader){
        return res.status(401).send("No Authorization details found");
    }
    console.log(authHeader);

    //2.Extract the credentials [Basic qwetyui73vdhuugdw73nb -->code]
    const base64Credentials=authHeader.replace('Basic','');
    console.log(base64Credentials);

    //Decode the Credentials
    //this is not encryption and decryption it i encoding and decoding
    const decodedCreds = Buffer.from(base64Credentials,'base64').toString('utf-8');
    console.log(decodedCreds); //[username:password]
    const creds=decodedCreds.split(':');

    const user=UserModel.getAll().find(u=>u.email==creds[0] && u.password==creds[1]);
    if(user){
        next();
    }
    else{
        return res.status(401).send("Incorrect Credentials");
    }

}
export default basicAuthorizer;