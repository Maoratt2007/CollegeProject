const OrderService = require('../services/orderservice');

const createOrder = async(req,res)=>{
    const new_order = await OrderService.createOrder(req.body.name, req.body.price, req.body.address, req.body.credit_card, req.body.items);
    res.json(new_order);
}

const getOrder = async(req,res)=>{
    const arr_order= await OrderService.getOrder();
    if(!arr_Order)
    {
        res.status(404).json({errors:['Order was not found']})

    }
    res.json(arr_Order);
}

const getOrderById=async(req,res)=>{
    const order2= await OrderService.findOrderById(req.params.id);
    if(!order2)
    {
        res.status(404).json({errors:['order(2) was not found']})
    }
    res.json(order2);
}

const removeOrder=async(req,res)=>{

    const order2= await OrderService.deleteOrder(req.params.id);
    if(!order2)
    {
        return res.status(404).json({errors:['order(2) was not found']})
    }
    res.send();
}

const updateOrder=async(req,res)=>{

    if(!req.body.name)
    {
        res.status(400).json({errors:['you dont have name to your Order']});
    }

    if(!req.body.price)
    {
        res.status(400).json({errors:['you dont have price to Order']});
    }

    if(!req.body.address)
    {
        res.status(400).json({errors:['you dont have an address to your Order']});
    }
    
    if(!req.body.credit_card)
    {
        res.status(400).json({errors:['you dont have a credit card added to your Order']});
    }

    if(!req.body.items)
    {
        res.status(400).json({errors:['you dont have any items added to your Order']});
    }


    const order2= await OrderService.updateOrder(req.params.id, req.body.name, req.body.price, req.body.address, req.body.credit_card, req.body.items);
    if(!order2)
    {
        return res.status(404).json({errors:['order2 was not found']})
    }
    res.json(order2);

}

module.exports={
    createOrder,
    getOrder,
    getOrderById,
    removeOrder,
    updateOrder
}