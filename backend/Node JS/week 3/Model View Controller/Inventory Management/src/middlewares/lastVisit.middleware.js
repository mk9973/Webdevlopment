export const setLastVisit =(req,res,next)=>{
    //1. if cookie is set, then add a local variable with last visit time date.
    //agar last visit pehle se hua to if wala statement excute ho jayega
   //reveiving cookie from client  by request object

    if(req.cookies.lastVisit){
        res.locals.lastVisit = new Date(req.cookies.lastVisit).toLocaleString();
    }

    //if statement execute ho ya na ho ye execute hoga aur set karega last visit ko
    //setting the cookie
    //here it send the response to client
    res.cookie(
        'lastVisit',
        new Date().toISOString(),{
            //cookie will expire with in  two days , but can set the maxAge infinite
            //it is millisecond 
            maxAge: 2*24*60*60*1000,
        }
    );
    next();
}