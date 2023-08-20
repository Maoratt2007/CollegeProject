const productService= require('../services/productservice');

const creatProduct=async(req,res)=>{
    const new_pro= await productService.creatProduct(req.body.name, req.body.price, req.body.category, req.body.description ,req.body.image,req.body.isShow);
    res.json(new_pro);
}

const getProducts=async(req,res)=> {
    let arr_pro;
    if(req.query.isShow)
    {
        arr_pro=await productService.getProductShow(req.query.isShow);
        //filter
        
        if((req.query.category)&&(req.query.name)&&(req.query.price))
        {
          arr_pro=await productService.getProductncp(req.query.name, req.query.category, req.query.price,req.query.isShow)
          if(arr_pro.length==0)
          {
            return res.status(404).json({errors:['pro was not found']})
          }
        }
    }

    else{
       arr_pro= await productService.getProducts();
       if(arr_pro.length==0)
       {
         return res.status(404).json({errors:['you dont have products']})
       }

    }
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



    try{
        const pro= await productService.updateProduct(req.params.id, req.body.name, req.body.price, req.body.category, req.body.description, req.body.image,req.body.isShow);
        if(!pro)
        {
            return res.status(404).json({errors:['pro was not found']})
        }
        res.json(pro);
    }
    catch(e){
        return res.status(400).json({errors:e.message})
    }



}






module.exports={
    creatProduct,
    getProducts,
    getProductById,
    removeProduct,
    updateProduct
}