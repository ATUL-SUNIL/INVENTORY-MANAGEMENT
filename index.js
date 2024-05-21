import express from 'express';
import productController from './src/controllers/product.controller.js';
import path from 'path';
import ejsLayouts from 'express-ejs-layouts'
import validationMiddleware from './src/middlewares/validation.middleware.js';
import { UploadFile } from './src/middlewares/file-upload.middleware.js';
const server= express();

//parse form data
server.use(express.urlencoded({extended:true}));
//setup view engine settings
server.set("view engine","ejs")
//dirextory to where views are
server.set("views",path.join(path.resolve(),"src",'views')) 

server.use(ejsLayouts)

server.use(express.static("public"));
// creating instance of product controller\
const ProductController=new productController();
server.get("/",ProductController.getProducts);

server.get('/new',ProductController.getAddForm)

server.post('/',UploadFile.single('imageUrl'),validationMiddleware,ProductController.addNewProduct)

server.get('/update-product/:id',ProductController.getUpdateProductView)

server.post('/update-product',ProductController.postUpdateProduct)

server.use(express.static("src/views"));

server.post("/delete-product/:id",ProductController.deleteProduct)

server.listen(3100,()=>{
    console.log("listening at port 3100");
});