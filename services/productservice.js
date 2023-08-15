const Product=require('../modules/product');

const creatProduct=async (name,price,category,description,image)=>{
    const product=new Product({
        name:name,
        price:price,
        category:category,
        description:description,
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

const updateProduct=async(_id,name,price,category,description,image)=>{
    const product=await findProductById(_id);
    if(!product)
    {
        return null;
    }
    product.name=name;
    product.price=price;
    product.category=category;
    product.description=description;
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

//שאילתה
  const getProductsbyncp = async (name, category, price) => {
    const queryCode = {};   // Build the object based on provided parameters

    if (name) { queryCode.name = name; }
    if (!name)  { return null }


    if (category) { queryCode.category = category; }
    if (!category) { return null; }
    

    if (price) { queryCode.price = price; }
    if (!price)  { return null; }
  
    return Product.find(queryCode);  // Fetch products based on the filter
  };
  
  
  
module.exports={
    creatProduct,
    findProductById,
    getProducts,
    updateProduct,
    deleteProduct,
    getProductsbyncp
}