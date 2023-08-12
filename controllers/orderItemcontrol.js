const OrderItem= require('../modules/orderitem');
const OrderItemService= require('../services/orderItemService');

const createOrderItem=async(req,res)=>{
    const new_orderItem= await OrderItemService.creatOrderItem(req.body.product,req.body.qunatity);
    res.json(new_orderItem);
}

const getOrderItems=async(req,res)=>{
    const new_orderItem= await OrderItemService.getOrderItems();
    if(!new_orderItem)
    {
        res.status(404).json({errors:['orderitem was not found']})

    }
    res.json(new_orderItem);   
}

const findOrderItemById=async(req,res)=>{
    const new_orderItem= await OrderItemService.findOrderItemById(req.params.id);
    if(!new_orderItem)
    {
         res.status(404).json({errors:['orderitem was not found']})
    }
    res.json(new_orderItem);
}

const deleteOrderItem=async(req,res)=>{

    const new_orderItem= await OrderItemService.deleteOrderItem(req.params.id);
    if(!new_orderItem)
    {
        return res.status(404).json({errors:['orderitem was not found']})
    }
    res.send();
}

const updateOrderItem=async(req,res)=>{

    if(!req.body.order)
    {
        res.status(400).json({errors:['you dont have order']});
    }

    if(!req.body.product)
    {
        res.status(400).json({errors:['you dont have product in your order']});
    }

    if(!req.body.qunatity)
    {
        res.status(400).json({errors:['you dont have the qunatity of order']});
    }

    const new_orderItem= await OrderItemService.updateOrderItem(req.body.product,req.body.qunatity);
    if(!new_orderItem)
    {
        return res.status(404).json({errors:['orderItem was not found']})
    }
    res.json(new_orderItem);

}

module.exports={
    createOrderItem,
    getOrderItems,
    findOrderItemById,
    deleteOrderItem,
    updateOrderItem
}