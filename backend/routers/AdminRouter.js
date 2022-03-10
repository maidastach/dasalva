import express, { urlencoded } from 'express';
import expressAsyncHandler from 'express-async-handler';
import { createAdmin, createProduct, deleteImage, deleteOrder, deleteProduct, deliverOrder, getContacts, getOrders, getSessions, getUsers, sendInstructions, updateProduct, uploadImage } from '../controllers/AdminControllers';
import { upload } from '../image-uploader';

const AdminRouter = express.Router();

//CREATE ADMIN
AdminRouter.get(
    '/createadmin', 
    expressAsyncHandler(createAdmin)
);




//GET USERS
AdminRouter.get(
    '/getusers', 
    expressAsyncHandler(getUsers)
);




//GET ORDERS
AdminRouter.get(
    '/getorders', 
    expressAsyncHandler(getOrders)
);

//DELETE ORDER
AdminRouter.delete(
    '/deleteorder/:id',
    urlencoded({ extended: true }), 
    expressAsyncHandler(deleteOrder)
);

//DELIVER ORDER
AdminRouter.get(
    '/deliverorder/:id', 
    urlencoded({ extended: true }), 
    expressAsyncHandler(deliverOrder)
);

//SEND ISTRUCTIONS
AdminRouter.post(
    '/deliverinstructions', 
    urlencoded({ extended: true }), 
    expressAsyncHandler(sendInstructions)
);




//CREATE PRODUCT
AdminRouter.post(
    '/products', 
    urlencoded({ extended: true }), 
    expressAsyncHandler(createProduct)
);

//UPDATE PRODUCT
AdminRouter.put(
    '/products/:id', 
    urlencoded({ extended: true }), 
    expressAsyncHandler(updateProduct)
);
 
//DELETE PRODUCT
AdminRouter.delete(
    '/products/:id', 
    urlencoded({ extended: true }), 
    expressAsyncHandler(deleteProduct)
);

AdminRouter.post(
    '/products/image', 
    urlencoded({ extended: true }), 
    upload.array('image'), 
    expressAsyncHandler(uploadImage)
);
 
//DELETE IMAGE
AdminRouter.post(
    '/products/deleteimage', 
    urlencoded({ extended: true }), 
    expressAsyncHandler(deleteImage)
);




//GET CONTACT REQUESTS
AdminRouter.get(
    '/getcontacts', 
    expressAsyncHandler(getContacts)
);




//GET SESSIONS
AdminRouter.get(
    '/getsessions', 
    expressAsyncHandler(getSessions)
);

export default AdminRouter;
