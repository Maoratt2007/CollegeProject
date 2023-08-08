const express=require('express');
const router= express.Router();

const ProductController= require('../controllers/productcontrol');
router.route('/')
    .get(ProductController.getProducts)
    .post(ProductController.creatProduct)

    
router.route('/:id')
    .get(ProductController.getProductById)
    .put(ProductController.updateProduct)
    .delete(ProductController.removeProduct);

module.exports=router;