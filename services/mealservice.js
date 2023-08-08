const Meal=require('../modules/meal');//goes to the file (meal.js)

const createMeal=async (name,price,productsarr)=>{//post
    const meal=new Meal({
        name:name,
        price:price,
        productsarr:productsarr
    });
    return await meal.save();//save the new elements 
}

const findMealById=async (_id)=>{ //find the meal by id 
    return await Meal.findById(_id);
}

const getMeal= async()=>{ //return all the meal that we have
    return await Meal.find({});
}

const updateMeal=async(_id,name,price,productsarr)=>{ 
    const meal=await findMealById(_id);//find me the product by id
    if(!meal)//if doesnt exsist then
    {
        return null;//return null
    }
    // if we find then.... update the variables
    meal.name=name;
    meal.price=price;
    meal.productsarr=productsarr
    return await meal.save();//saves and returns
}

const deleteMeal=async(_id)=>{
    const meal=await findMealById(_id);
    if(!meal)//if we cant find the meal that we want to delete 
    {
        return null;//return null
    }
    //else delete the meal that we found
    return await meal.deleteOne();
}

module.exports={
    createMeal,
    findMealById,
    getMeal,
    updateMeal,
    deleteMeal
}