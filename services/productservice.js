const Product=require('../modules/product');

const creatProduct=async (name,price,category,image)=>{
    const product=new Product({
        name:name,
        price:price,
        category:category,
        image:image
    });
    return await product.save();
}

const findProductById=async (_id)=>{
    return await Product.findById(_id);
}

const getProducts= async()=>{
    return Product.find({});
}

const updateProduct=async(_id,name,price,category,image)=>{
    const product=await findProductById(_id);
    if(!product)
    {
        return null;
    }
    product.name=name;
    product.price=price;
    product.category=category;
    product.image=image;
    return await product.save();
}

const deleteProduct=async(_id)=>{
    const product=await findProductById(_id);
    if(!product)
    {
        return null;
    }
    return await product.deleteOne();
}

module.exports={
    creatProduct,
    findProductById,
    getProducts,
    updateProduct,
    deleteProduct
}