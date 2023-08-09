const express=require('express');
const router= express.Router();

const OrderController= require('../controllers/ordercontrol');
router.route('/')
    .get(OrderController.getOrder)
    .post(OrderController.createOrder)

    
router.route('/:id')
    .get(OrderController.getOrderById)
    .put(OrderController.updateOrder)
    .delete(OrderController.removeOrder);

module.exports=router;