const { name } = require('ejs')
const Order = require('../modules/order')


// Add ORder for method post
const createOrder = async (name, price, address, credit_card, items) => {
    const order =new Order({
        name:name,
        price:price,
        address:address,
        credit_card:credit_card,
        items:items
    });
    return await order.save();
}

//Find by id

const findOrderById=async(_id) =>{
    return await Order.findById(_id);
}

//get all

const getOrder= async()=>{
    return await Order.find({});
}

//update

const updateOrder=async(_id, name, price, address, credit_card, items)=>{
    const order = await findOrderById(_id);
    if(!order){
        return null;
    }
    order.name=name;
    order.price=price;
    order.address=address;
    order.credit_card=credit_card;
    order.items=items;

    return await order.save();
}

//delete

const deleteOrder= async(_id)=>{
    const order = await this.findOrderById(_id);
    if(!order){
        return null;
    }
    return await order.deleteOne();
}

module.exports={
    createOrder,
    findOrderById,
    getOrder,
    updateOrder,
    deleteOrder
}