import multer from 'multer';

// Configure storage
const storage = multer.diskStorage({
    // Callback function for the destination
    destination: (req, file, cb) => {
        cb(null, './uploads/');
    },
    // Callback function for the filename
    //it shows an error because it works on mac not windows
    // filename:(req,file,cb)=>{
    //     cb(null,new Date().toISOString()+ file.originalname);
    // },

    filename: (req, file, cb) => {
        // Create a unique filename by replacing colons with hyphens
        cb(
        null,
        new Date().toISOString().replace(/:/g, '_') +
        file.originalname
        );
    }
});

// Configure multer with the storage option
export const upload = multer({ storage: storage });



 