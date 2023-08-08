const MealService= require('../services/mealservice');

const createMeal=async(req,res)=>{
    const new_meal= await MealService.createMeal(req.body.name, req.body.price, req.body.productsarr);
    res.json(new_meal);
}

const getMeal=async(req,res)=>{
    const arr_meal= await MealService.getMeal();
    if(!arr_meal)
    {
        res.status(404).json({errors:['meal was not found']})

    }
    res.json(arr_meal);   
}

const getMealById=async(req,res)=>{
    const meal2= await MealService.findMealById(req.params.id);
    if(!meal2)
    {
         res.status(404).json({errors:['meal(2) was not found']})
    }
    res.json(meal2);
}

const removeMeal=async(req,res)=>{

    const meal2= await MealService.deleteMeal(req.params.id);
    if(!meal2)
    {
        return res.status(404).json({errors:['meal(2) was not found']})
    }
    res.send();
}

const updateMeal=async(req,res)=>{

    if(!req.body.name)
    {
        res.status(400).json({errors:['you dont have name to your Meal']});
    }

    if(!req.body.price)
    {
        res.status(400).json({errors:['you dont have price to Meal']});
    }

    if(!req.body.productsarr)
    {
        res.status(400).json({errors:['you dont have the products-arr']});
    }


    const meal2= await MealService.updateMeal(req.params.id, req.body.name, req.body.price, req.body.productsarr);
    if(!meal2)
    {
        return res.status(404).json({errors:['meal2 was not found']})
    }
    res.json(meal2);

}

module.exports={
    createMeal,
    getMeal,
    getMealById,
    removeMeal,
    updateMeal
}