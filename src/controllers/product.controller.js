import path from 'path';
import ProductModel from '../models/product.model.js';

export default class productController{

    getProducts(req,res){
        let products=ProductModel.get();
        res.render("products",{products:products,userEmail:req.session.userEmail})
    }
    
    getAddForm(req,res){
        return res.render("new-product",{errorMessage:null,userEmail:req.session.userEmail})
    }

    addNewProduct(req,res){       
        // console.log(req.body);
        const {name,desc,price} =req.body;
        const imageUrl="images/"+req.file.filename;
        ProductModel.add(name,desc,price,imageUrl);
        let products=ProductModel.get();       
        return res.render("products",{products,userEmail:req.session.userEmail})
    }

    getUpdateProductView(req,res,next){
        //if product exists return view
        const id=req.params.id;
        const productFound=ProductModel.getById(id);
        if(productFound){
        res.render("update-product",{product:productFound,errorMessage:null,userEmail:req.session.userEmail});
        }
        //else return errors
        else{
            res.status(401).send("product not found");
        }
    }

    postUpdateProduct(req,res){
        ProductModel.update(req.body);
        let products=ProductModel.get();

        // res.render("products",{products})
        return res.redirect("/");
    }

    deleteProduct(req,res){
        const id=req.params.id;
        const productFound=ProductModel.getById(id);
        if(productFound){
        ProductModel.delete(id);
        let products=ProductModel.get();
        res.render("products",{products,userEmail:req.session.userEmail})
        // return res.redirect("/");

        }
        //else return errors
        else{
            res.status(401).send("product not found");
        }
    }
}