const express=require('express');
const router= express.Router();

const OrderItemController= require('../controllers/orderItemcontrol');
router.route('/')
    .get(OrderItemController.getOrderItems)
    .post(OrderItemController.createOrderItem)

    
router.route('/:id')
    .get(OrderItemController.findOrderItemById)
    .put(OrderItemController.updateOrderItem)
    .delete(OrderItemController.deleteOrderItem);

module.exports=router;