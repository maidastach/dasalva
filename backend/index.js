import express, { json } from 'express';
import cors from 'cors';
import session from 'express-session';
import mongoose from 'mongoose';
import path from 'path';
import config, { corsOptions, sessionConfig } from './config.js';

import UserRouter from './routers/UserRouter.js';
import OrderRouter from './routers/OrderRouter.js';
import ProductRouter from './routers/ProductRouter.js';
import StripeRouter from './routers/StripeRouter.js';
import AuthRouter from './routers/AuthRouter.js';
import HomeRouter from './routers/HomeRouter.js';
import AdminRouter from './routers/AdminRouter.js';

import { errorHandler, protector } from './utils.js';
import { isAdmin, isLoggedIn } from './middlewares.js';

//CONNECTION PORT
const port = config.PORT;

//INIT APP
const app = express();

//INIT EXPRESS-SESSION
app.use(session(sessionConfig));

//INIT MONGODB
const db = mongoose.connect(
    config.MONGODB_URL, 
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        // useCreateIndex: true,
        // useFindAndModify: false,
    },
    (error, db) => 
    {
        if(error)   
            console.log(error);
        else
        {
            console.log('MongoDB Connected')
            return db
        }
    }
)

app.use(cors(corsOptions));
app.use('/api/stripe', StripeRouter);

app.use(json());
//app.use(protector);

app.use('/api/users', UserRouter);
app.use('/api/admin', isAdmin, AdminRouter);
app.use('/api/auth', AuthRouter);
app.use('/api/products', ProductRouter);
app.use('/api/orders', isLoggedIn, OrderRouter);
app.use('/', HomeRouter)

app.use('/uploads', express.static(path.join(__dirname, '../uploads')))
app.use(express.static(path.join(__dirname, '../public')));
app.get('*', (req, res) => res.sendFile(path.join(__dirname, '..', 'public', 'index.html')));

app.use(errorHandler)

app.listen(
    port, 
    () => console.log(`Running at http://localhost:${port}`)
);