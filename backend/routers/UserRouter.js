import express, { urlencoded } from 'express';
import expressAsyncHandler from 'express-async-handler';
import { createShipping, deleteShipping, editShipping, getCart, getSelectedAddress, getShippings, isAddingAddress, isPickingUp, selectShipping, setCart } from '../controllers/UserControllers';
import { isLoggedIn } from '../middlewares';

const UserRouter = express.Router();

//GET CART
UserRouter.get(
    '/cart',
    expressAsyncHandler(getCart)
)

//UPDATE CART
UserRouter.post(
    '/cart',
    urlencoded({ extended: true }), 
    expressAsyncHandler(setCart)
)




// //GET SHIPPING
// UserRouter.get(
//     '/shipping', 
//     expressAsyncHandler(getShippings)
// );

//CREATE SHIPPING
UserRouter.post(
    '/createshipping',
    isLoggedIn,
    urlencoded({ extended: true }), 
    expressAsyncHandler(createShipping)
);

//DELETE SHIPPING
UserRouter.delete(
    '/deleteshipping/:id',
    isLoggedIn, 
    urlencoded({ extended: true }), 
    expressAsyncHandler(deleteShipping)
);

//EDIT SHIPPING
UserRouter.post(
    '/editshipping', 
    isLoggedIn,
    urlencoded({ extended: true }), 
    expressAsyncHandler(editShipping)
);




//SELECT SHIPPING
UserRouter.post(
    '/selectshipping', 
    isLoggedIn,
    urlencoded({ extended: true }), 
    expressAsyncHandler(selectShipping)
);

//GET SELECTED SHIPPING
UserRouter.get(
    '/getselectedaddress',
    isLoggedIn, 
    expressAsyncHandler(getSelectedAddress)
);




//SET IS ADDING ADDRESS
UserRouter.get(
    '/isaddingaddress',
    isLoggedIn,
    expressAsyncHandler(isAddingAddress)
);

//SET IS PICKING UP
UserRouter.get(
    '/ispickingup', 
    isLoggedIn,
    expressAsyncHandler(isPickingUp)
);

export default UserRouter;