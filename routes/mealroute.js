const express=require('express');
const router= express.Router();

const MealController= require('../controllers/mealcontrol');
router.route('/')
    .get(MealController.getMeal)
    .post(MealController.createMeal)

    
router.route('/:id')
    .get(MealController.getMealById)
    .put(MealController.updateMeal)
    .delete(MealController.removeMeal);

module.exports=router;