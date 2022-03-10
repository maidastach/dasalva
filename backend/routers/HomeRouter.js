import express, { urlencoded } from 'express';
import expressAsyncHandler from 'express-async-handler';
import { addContact, cookie, ResendToken, setCookie, sitemap } from '../controllers/HomeControllers';

const HomeRouter = express.Router();

//COOKIE??
HomeRouter.get('/cookie', expressAsyncHandler(cookie));
//SET COOKIE??  
HomeRouter.post('/setcookie', urlencoded({ extended: true }), expressAsyncHandler(setCookie));

//SITEMAP
HomeRouter.get('/sitemap', sitemap);

//POST CONTACT REQUEST
HomeRouter.post(
    '/api/contact', 
    urlencoded({extended: true}), 
    expressAsyncHandler(addContact)
);
export default HomeRouter;