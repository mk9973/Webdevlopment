
//export default validateRequest=(req,res,next)=>
//export default is not used because it is used in
//    --> HoistedDecleration => a function
//    --> class
//    -->assignment decleration

import { body, validationResult } from 'express-validator';

const  validateRequest= async (req,res,next)=>
{
    //1. Setup rules for validation

    const rules =[
        body('name').notEmpty().withMessage("Name is required"),
        body('price').isFloat({gt:0}).withMessage("Price should be a positive value"),
        body('imageUrl').isURL().withMessage("Invalid url"),
    ]
    //2. run those rules

    await Promise.all(rules.map((rule)=>rule.run(req)));
    //3. check if there are any error after running the rules
    var validationErrors=validationResult(req);
    //4. if errors, return error message

    if((!validationErrors.isEmpty()))
    {
        return res.render('new-product',{
            //if you not use '.msg' then it will show an error '[Object:object]'
            errorMessage: validationErrors.array()[0].msg,
        });
    }
    next();
}






//   const  validateRequest=(req,res,next)=>
// {
//       //validate data
//       const {name, price,imageUrl}=req.body;

//       let errors=[];
//       // if name is undefined or name is empty
//       if(!name || name.trim()=='')
//       {
//           errors.push('Name is required');
//       }

//       //if price is undefined or not less than 1
//       if(!price || parseFloat(price)<1)
//       {
//           errors.push("Price must be a positive value");
//       }

//       // if url not in url format then it throw error
//       try{
//           const validUrl=new URL(imageUrl);
//       }catch(err){
//           errors.push("URL is invalid");
//       }

//       //agar ek se bhi jyada error hua to it will pass the first error to 'new-product'
//       if(errors.length>0)
//       {
//           return res.render('new-product',{
//               errorMessage: errors[0],
//           });
//       }
//       next();

// }

export default validateRequest;