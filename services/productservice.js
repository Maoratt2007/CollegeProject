const Product=require('../modules/product');

const creatProduct=async (name,price,category,description,image,isShow,webServiceId,fat)=>{
    const product=new Product({
        name:name,
        price:price,
        category:category,
        description:description,
        image:image,
        isShow:isShow,
        fat:fat
    });
    if (product.webServiceId) {
        product.webServiceId = webServiceId;
    }
    return await product.save();
}

const findProductById=async (_id)=>{
    return await Product.findById(_id);
}

const getProducts= async()=>{
    return Product.find({});
}

const updateProduct=async(_id,name,price,category,description,image,isShow,webServiceId,fat)=>{
    const product=await findProductById(_id);
    if(!product)
    {
        return null;
    }
    if(product.isShow===isShow)
    {
        throw Error(`trying to set product: ${name} failed because is show is already: ${isShow}`);
    }
    product.name=name;
    product.price=price;
    product.category=category;
    product.description=description;
    product.image=image;
    product.isShow=isShow;
    if (product.webServiceId) {
        product.webServiceId = webServiceId;
    }
    product.fat=fat;
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

const getFilterOrder = async (category, price,fat,isShow ) => {
    const filters = {};
  filters.isShow=isShow;
    if (category) {
        filters.category =category;
    }
    if (price) {
      filters.price = { $lte: price };

    }
    if (fat) {
        filters.fat ={ $lte: fat };
    }
  
    try {
      const orders = await Product.find(filters);
      return orders;
    } catch (error) {
      throw Error(`No Product match the criteria`);
    }
  };

const getProductShow= async(isShow)=>{
    return await Product.find({isShow});
}


module.exports={
    creatProduct,
    findProductById,
    getProducts,
    updateProduct,
    deleteProduct,
    getProductShow,
    getFilterOrder
}