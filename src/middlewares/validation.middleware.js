
import { body,validationResult } from 'express-validator'
const validateRequest= async(req,res,next)=>{
    //validate data

    //1.setup rules for validation
    const rules=[
        body('name').notEmpty().withMessage("Name is Required"),
        body('price').isFloat({gt:0}).withMessage("price should be a positive value"),
        body("imageUrl").isURL().withMessage("Invalid URL"),
    ];

    //2. run the rules
    await Promise.all(rules.map(rule=> rule.run(req)));

    //3. check if there are any arrays
    var errors = validationResult(req);



    if(!errors.isEmpty()){
        return res.render('new-product',{errorMessage:errors.array()[0].msg})
    }
    next();
} 
export default validateRequest;

    // without express validator
    // const{name,price,imageUrl}=req.body;
    //let errors=[];
    // if(!name || name.trim()==''){
    //     errors.push("name is required")
    // }
    // if(!price || parseFloat(price)<1){
    //     errors.push("price must be a positive value")
    // }
    // try{
    //     const validUrl = new URL(imageUrl);
    // }
    // catch(err){
    //     errors.push("URL is invalid");
    // }