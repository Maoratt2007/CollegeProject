const mongoose = require('mongoose'); // Import mongoose library
const Order = require('../modules/order')


// Add ORder for method post
const createOrder = async (name, price, address, credit_card, items,userId) => {
    const order =new Order({
        name:name,
        price:price,
        address:address,
        credit_card:credit_card,
        items:items,
        userId:userId,
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
//get by userID

const getProductuserID= async( userId)=>{
    if(! userId)
    {
        return null;
    }
    return await Order.find({userId});
}



//update

const updateOrder=async(_id, name, price, address, credit_card, items,userId)=>{
    const order = await findOrderById(_id);
    if(!order){
        return null;
    }
    order.name=name;
    order.price=price;
    order.address=address;
    order.credit_card=credit_card;
    order.items=items;
    order.userId=userId;

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

const getFilterOrder = async (name, price, address,userId) => {
    if(! userId)
    {
        return null;
    }
    const filters = {};
  
    if (name) {
        filters.name =name;
    }
    if (price) {
      filters.price = { $lte: price };

    }
    if (address) {
        filters.address =address;
    }
  
    try {
        const ordersofuser=[];
      const orders = await Order.find(filters);
      orders.forEach(function (order) {
        if(order.userId==userId)
        {
            ordersofuser.push(order);
        }
      })
      return ordersofuser;
    } catch (error) {
      throw Error(`No order match the criteria`);
    }
  };

  const groupOrdersByUser = async () => {
    try {
        const pipeline = [
            {
                $group: {
                    _id: '$userId',
                    totalOrders: { $sum: 1 }
                }
            }
        ];

        const userOrderStats = await Order.aggregate(pipeline);
        return userOrderStats;
    } catch (error) {
        throw new Error(`Error while grouping orders by user: ${error.message}`);
    }
};
const groupOrdersByUserPrice = async () => {
    try {
        const pipeline = [
            {
                $group: {
                    _id: '$userId',
                    totalOrdersPrice: { $sum: '$price' }
                }
            }
        ];

        const userOrderStats = await Order.aggregate(pipeline);
        return userOrderStats;
    } catch (error) {
        throw new Error(`Error while grouping orders by user: ${error.message}`);
    }
};

module.exports={
    createOrder,
    findOrderById,
    getOrder,
    updateOrder,
    deleteOrder,
    getProductuserID,
    groupOrdersByUser,
    getFilterOrder,
    groupOrdersByUserPrice
}