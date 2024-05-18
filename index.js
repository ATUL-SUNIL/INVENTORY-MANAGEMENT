import express from 'express';
import productController from './src/controllers/product.controller.js';
import path from 'path';
import ejsLayouts from 'express-ejs-layouts'

const server= express();
//sutup view engine settings
server.set("view engine","ejs")
//dirextory to where views are
server.set("views",path.join(path.resolve(),"src",'views')) 

server.use(ejsLayouts)
// creating instance of product controller\
const ProductController=new productController();
server.get("/",ProductController.getProducts);
server.use(express.static("src/views"));

server.listen(3100,()=>{
    console.log("listening at port 3100");
});