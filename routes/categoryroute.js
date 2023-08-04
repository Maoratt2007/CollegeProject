const express=require('express');
const router= express.Router();

const CategoryController= require('../controllers/categorycontrol');
router.route('/')
    .get(CategoryController.getCategories)
    .post(CategoryController.creatCategory)

    
router.route('/:id')
    .get(CategoryController.getCategoryById)
    .put(CategoryController.updateCategory)
    .delete(CategoryController.removeCategory);

module.exports=router;

