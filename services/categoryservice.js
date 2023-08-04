const Category=require('../modules/category');
//add category for method post
const creatCategory=async (name)=>{
    const category =new Category({
        name:name
    });
    return await category.save();

}
//find by id 
const findCategoryById= async(_id)=>{
    return await Category.findById(_id);
}
//get all
const getCategories= async()=>{
    return await Category.find({});
}
//update
const updateCategory=async(_id,name)=>{
    const category=await findCategoryById(_id);
    if(!category)
    {
        return null;
    }
    category.name=name;
    return await category.save();
}
//delete
const deleteCategory=async(_id)=>{
    const category=await findCategoryById(_id);
    if(!category)
    {
        return null;
    }
    return await category.deleteOne();
}

module.exports={
    creatCategory,
    findCategoryById,
    getCategories,
    updateCategory,
    deleteCategory
}

