const express=require('express');
const router= express.Router();

const ProductController= require('../controllers/productcontrol');
const productService= require('../services/productservice');
router.route('/')
    .get(ProductController.getProducts)
    .post(ProductController.creatProduct)

    
router.route('/:id')
    .get(ProductController.getProductById)
    .put(ProductController.updateProduct)
    .delete(ProductController.removeProduct);

router.get('/search', async (req, res) => {
  const { name, category, price } = req.query;
  const arr_pro = await productService.getProductsbyncp(name, category, price);
  res.json(arr_pro);
});

module.exports=router;