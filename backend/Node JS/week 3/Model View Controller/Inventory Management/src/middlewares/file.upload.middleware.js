import multer from "multer";

const storageConfig=multer.diskStorage({
    //cb-> callback
    //destination -> where you want to store the upload file
    destination :(req,file,cb)=>
    {
        cb(null,'public/images/');
    },
    filename:(req,file,cb)=>{
        //date for differentiate the file which have same name
        const name =Date.now()+"-"+file.originalname;
        cb(null,name);
    },
});

export const uploadFile=multer({storage: storageConfig,});