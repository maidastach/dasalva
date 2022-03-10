import express, { urlencoded } from "express";
import expressAsyncHandler from 'express-async-handler';
import { createOrder, getOrdersByUser, getSingleOrder, orderGuard, stripeCheckout } from "../controllers/OrderControllers";

const OrderRouter = express.Router();

//GET ORDER BY USER
OrderRouter.get(
  '/mine',
  expressAsyncHandler(getOrdersByUser)
);

//GET SINGLE ORDER
OrderRouter.get(
  '/:id',
  expressAsyncHandler(getSingleOrder)
);

//CREATE ORDER
OrderRouter.post(
  '/',
  urlencoded({ extended: true }), 
  expressAsyncHandler(createOrder)
);

//GUARD FOR ORDER
OrderRouter.get(
  '/guard/:id',
  expressAsyncHandler(orderGuard)
);

export default OrderRouter; 
