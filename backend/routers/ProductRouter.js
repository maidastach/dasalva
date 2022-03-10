import express, { urlencoded } from 'express';
import expressAsyncHandler from 'express-async-handler';
import { addReview, getProducts, getSingleProduct } from '../controllers/ProductControllers';
import { isLoggedIn } from '../middlewares';

const ProductRouter = express.Router();

//GET ALL PRODUCTS
ProductRouter.get(
  '/', 
  expressAsyncHandler(getProducts)
);

//GET SINGLE PRODUCT
ProductRouter.get(
  '/:id', 
  expressAsyncHandler(getSingleProduct)
);

//POST REVIEW
ProductRouter.post(
  '/review',
  isLoggedIn, 
  urlencoded({ extended: true }), 
  expressAsyncHandler(addReview)
)

export default ProductRouter;