const categoryService= require('../services/categoryservice');
//create new category
const creatCategory=async(req,res)=>{
    const new_cat= await categoryService.creatCategory(req.body.name);
    res.json(new_cat);
}
//get all category
const getCategories=async(req,res)=>{
    const arr_cat= await categoryService.getCategories();
    if(!arr_cat)
    {
        res.status(404).json({errors:['cat was not found']})

    }
    res.json(arr_cat);   
}
//get specific category with search
const getCategoryById=async(req,res)=>{
    const cat= await categoryService.findCategoryById(req.params.id);
    if(!cat)
    {
         res.status(404).json({errors:['cat was not found']})//if i dont have category i return error (not found)
    }
    res.json(cat);
}
//remove category
const removeCategory=async(req,res)=>{

    const cat= await categoryService.deleteCategory(req.params.id);
    if(!cat)
    {
        return res.status(404).json({errors:['cat was not found']})//if i dont have category i return error (not found)
    }
    res.send();//return nothing
}
//update category
const updateCategory=async(req,res)=>{

    if(!req.body.name)
    {
        res.status(400).json({errors:['you dont have name to category']});//bad request error
    }
    const cat= await categoryService.updateCategory(req.params.id,req.body.name);//when name we use body if this id we use with params 
    if(!cat)
    {
        return res.status(404).json({errors:['cat was not found']})//if i dont have category i return error (not found)
    }
    res.json(cat);//return in json the cat the update in json

}
//export all the function 
module.exports={
    creatCategory,
    getCategories,
    getCategoryById,
    removeCategory,
    updateCategory
}


// //github 
// git branch -a  ---> not necessarily, shows all branches in the repository, including the one you are on

// git add .      ---> add all files that have been created / changed
//git add category.js  --->add this specific file
//git log---> show us our commits 
//git show(with or no id) show us our updates in commit

// git status      ---> not necessarily, used to check what files have actually been added 

// git commit -m "message"      ----> commit your changes with a short message of what you did

// git push  ----> push your changes into your current branch
