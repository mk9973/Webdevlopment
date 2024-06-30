
// import fs from 'fs';

// const fsPromise = fs.promises;
// // fspromise is the object of promises it allow create and write data interfiles synchronouly without using callback
// async function log(logData) {
//     try {
//         logData = `\n ${new Date().toString()} - ${logData}`;
//         await fsPromise.appendFile(
//             'log.txt', 
//             logData
//             );
//     } catch(err) {
//         console.log(err);
//     }
// }

// const loggerMiddleware = async (
//     req, 
//     res, 
//     next
// ) => { 
//     // 1. Log request body.
//     if(!req.url.includes("signin")){
//         const logData = `${req.url
//         } - ${JSON.stringify(req.body)}`;
//         await log(logData);
//     }
//     next();
// };

//export default loggerMiddleware;


//Winston logger instead of Normal logger
//using winston first install --> 'npm i winston'

import winston from 'winston';

const logger= winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    defaultMeta:{ service: 'request-logging'},
    transports:[
        new winston.transports.File({filename:'logs.txt'})
    ]
})

const loggerMiddleware = async (
    req, 
    res, 
    next
) => { 
    // 1. Log request body.
    if(!req.url.includes("signin")){
        const logData = `${req.url
        } - ${JSON.stringify(req.body)}`;
        logger.info(logData);
    }
    next();
};

export default loggerMiddleware;