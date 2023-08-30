const OrderService = require('../services/orderservice');

const createOrder = async(req,res)=>{
    const new_order = await OrderService.createOrder(req.body.name, req.body.price, req.body.address, req.body.credit_card, req.body.items,req.body.userId);
    res.json(new_order);
}

const getOrder = async (req, res) => {
    try {
        let arr_Order;

        if (req.query.groupamount) {
            arr_Order = await OrderService.groupOrdersByUser();
        }else if (req.query.groupprice) {
            arr_Order = await OrderService.groupOrdersByUserPrice();
        } else if (req.query.price || req.query.address || req.query.name) {
            arr_Order = await OrderService.getFilterOrder(req.query.name, req.query.price, req.query.address,req.query.userId);
        } else if (req.query.userId) {
            arr_Order = await OrderService.getProductuserID(req.query.userId);
        }else {
            arr_Order = await OrderService.getOrder();
        }

        if (!arr_Order) {
            return res.status(404).json({ errors: ['Order was not found'] });
        }

        res.json(arr_Order);
    } catch (error) {
        return res.status(500).json({ errors: [error.message] });
    }
};



const getOrderById=async(req,res)=>{
    const order= await OrderService.findOrderById(req.params.id);
    if(!order)
    {
        res.status(404).json({errors:['order(2) was not found']})
    }
    res.json(order);
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


    const order2= await OrderService.updateOrder(req.params.id, req.body.name, req.body.price, req.body.address, req.body.credit_card, req.body.items,req.body.userId);
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