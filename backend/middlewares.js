import expressAsyncHandler from "express-async-handler";
import User from "./models/userModel";

export const isAdmin = expressAsyncHandler(
    async(req, res, next) => 
    {
        const id = req.session.user;
        const user = await User.findById(id);
        const admin = user.isAdmin;
        if(admin)
            return next()
        return res.sendStatus(401);
    }
);

export const isLoggedIn = expressAsyncHandler(
    async (req, res, next) => 
    {
        const id = req.session.user;
        if(id)
            return next()
        return res.sendStatus(401);
    }
);

export const isNotLoggedIn = expressAsyncHandler(
    async (req, res, next) => 
    {
        const id = req.session.user;
        if(!id)
            return next();
        return res.redirect('/')
    }
);