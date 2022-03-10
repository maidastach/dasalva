import express, { raw } from 'express';
import expressAsyncHandler from 'express-async-handler';
import { stripeCheckout, stripePayment } from '../controllers/StripeControllers';
import { isLoggedIn } from '../middlewares';

const StripeRouter = express.Router();

//ENDPOINT FOR STRIPE SERVER TO RECEIVE THE REQUEST
StripeRouter.post(
    '/stripehook', 
    raw({ type: 'application/json' }),
    stripePayment
);

//CREATE THE CHECKOUT SESSION
StripeRouter.post(
    '/create-checkout-session/:id', 
    isLoggedIn,
    expressAsyncHandler(stripeCheckout)
);

export default StripeRouter;