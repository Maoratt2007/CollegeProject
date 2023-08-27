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

const groupOrdersByItems = async (usersgroupby) => {
    const array={ userId: { $in: usersgroupby.map(id => mongoose.Types.ObjectId(id)) } } ;
    const aggregation = [
        { $match: { userId: { $in: usersgroupby.map(id => mongoose.Types.ObjectId(id)) } } },
        { $group: { _id: '$userId', orderCount: { $sum: 1 } } }
    ];

    const ordersByItems = await Order.aggregate(aggregation);

    return ordersByItems;
};


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

const getFilterOrder = async (name, price, address) => {
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
      const orders = await Order.find(filters);
      return orders;
    } catch (error) {
      throw Error(`No order match the criteria`);
    }
  };

module.exports={
    createOrder,
    findOrderById,
    getOrder,
    updateOrder,
    deleteOrder,
    getProductuserID,
    groupOrdersByItems,
    getFilterOrder
}