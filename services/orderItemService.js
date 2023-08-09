const orderItem=require('../modules/orderitem');
//add category for method post
const creatOrderItem=async (order,product,quantity)=>{
    const order_item =new orderItem({
        order:order,
        product:product,   
        quantity:quantity,
    });
    return await order_item.save();

}
//find by id 
const findOrderItemById= async(_id)=>{
    return await orderItem.findById(_id);
}
//get all
const getOrderItems= async()=>{
    return await orderItem.find({});
}
//update
const updateOrderItem=async(_id,order,product,quantity)=>{
    const order_item=await findOrderItemById(_id);
    if(!order_item)
    {
        return null;
    }
    order_item.order=order;
    order_item.product=product;
    order_item.quantity=quantity;

    return await order_item.save();
}
//delete
const deleteOrderItem=async(_id)=>{
    const order_item=await findOrderItemById(_id);
    if(!order_item)
    {
        return null;
    }
    return await order_item.deleteOne();
}

module.exports={
    creatOrderItem,
    findOrderItemById,
    getOrderItems,
    updateOrderItem,
    deleteOrderItem
}

