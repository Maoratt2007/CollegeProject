const productService= require('../services/productservice');

const creatProduct=async(req,res)=>{
    const new_pro= await productService.creatProduct(req.body.name, req.body.price, req.body.category, req.body.description ,req.body.image);
    res.json(new_pro);
}

const getProducts=async(req,res)=> {
    const arr_pro= await productService.getProducts();
    res.json(arr_pro);   
}

const getProductById=async(req,res)=>{
    const pro= await productService.findProductById(req.params.id);
    if(!pro)
    {
         res.status(404).json({errors:['pro was not found']})
    }
    res.json(pro);
}

const removeProduct=async(req,res)=>{

    const pro= await productService.deleteProduct(req.params.id);
    if(!pro)
    {
        return res.status(404).json({errors:['pro was not found']})
    }
    res.send();
}

const updateProduct=async(req,res)=>{

    if(!req.body.name)
    {
        res.status(400).json({errors:['you dont have name to product']});
    }

    if(!req.body.price)
    {
        res.status(400).json({errors:['you dont have price to product']});
    }
    if(!req.body.description)
    {
        res.status(400).json({errors:['you dont have description to product']});
    }

    if(!req.body.category)
    {
        res.status(400).json({errors:['you dont have category to product']});
    }


    const pro= await productService.updateProduct(req.params.id, req.body.name, req.body.price, req.body.category, req.body.description, req.body.image);
    if(!pro)
    {
        return res.status(404).json({errors:['pro was not found']})
    }
    res.json(pro);

}

module.exports={
    creatProduct,
    getProducts,
    getProductById,
    removeProduct,
    updateProduct
}