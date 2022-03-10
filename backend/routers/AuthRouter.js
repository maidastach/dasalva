import express, { urlencoded } from 'express';
import expressAsyncHandler from 'express-async-handler';
import { isLoggedIn, isNotLoggedIn } from '../middlewares';
import { activateAccount, logout, register, resetPassword, setNewPassword, signIn, amILogged, updateProfile, resendToken } from '../controllers/AuthControllers';

const AuthRouter = express.Router();

//GET LOGIN STATUS
AuthRouter.get(
    '/amilogged',
    expressAsyncHandler(amILogged)
);




//LOGIN
AuthRouter.post(
    '/signin', 
    isNotLoggedIn, 
    urlencoded({extended: true}), 
    expressAsyncHandler(signIn)
);

//REGISTER
AuthRouter.post(
    '/register', 
    isNotLoggedIn, 
    urlencoded({extended: true}),
    expressAsyncHandler(register)
);

//ACTIVATE ACCOUNT
AuthRouter.get(
    '/activateaccount/:token', 
    isNotLoggedIn, 
    expressAsyncHandler(activateAccount)
);

//UPDATE PROFILE
AuthRouter.post(
    '/profile', 
    isLoggedIn, 
    urlencoded({extended: true}),
    expressAsyncHandler(updateProfile)
);

//LOGOUT
AuthRouter.get(
    '/logout', 
    expressAsyncHandler(logout)
)




//REQUEST RESET PASSWORD
AuthRouter.post(
    '/resetpassword', 
    isNotLoggedIn, 
    urlencoded({extended: true}), 
    expressAsyncHandler(resetPassword)
);

//SET THE NEW PASSWORD
AuthRouter.post(
    '/newpassword', 
    isNotLoggedIn, 
    urlencoded({extended: true}), 
    expressAsyncHandler(setNewPassword)
);

//RESEND VERIFICATION TOKEN
AuthRouter.post(
    '/resendtoken', 
    isNotLoggedIn, 
    expressAsyncHandler(resendToken)
);


export default AuthRouter;