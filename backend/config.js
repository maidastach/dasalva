import dotenv from 'dotenv';
import MongoStore from 'connect-mongo';
import nodemailer from 'nodemailer';

dotenv.config();

export const MongoStoreConfig = MongoStore.create(
    {
        mongoUrl: process.env.MONGODB_URL,
        collection: 'sessions',
        autoRemove: 'native',
    }
);

export const sessionConfig = {
    secret: process.env.COOKIE_KEY, //Sign the cookie
    resave: false,
    saveUninitialized: false,
    store: MongoStoreConfig,
    cookie: { maxAge: 1000 * 60 * 60 * 24 }
};

const nodemailerConfig = {
    port: 465,
    host: 'mail.dasalva.com.au',
    secure: true,
    auth: {
        user: process.env.EM,
        pass: process.env.EM78
    },
    tls: {
        rejectUnauthorized: true
    },
    requireTLS: true,
}

export const transporter = nodemailer.createTransport(nodemailerConfig);

const whitelist = ['https://dasalva.com.au', 'https://www.dasalva.com.au', 'https://dasalva.com.au/']
export const corsOptions = {
  origin: 
    (origin, callback) => (whitelist.indexOf(origin) !== -1 || !origin) ? callback(null, true) : callback(new Error('Not allowed by CORS'))
}

export default {
    PORT: process.env.PORT || 3000,
    MONGODB_URL: process.env.MONGODB_URL,
    JWT_SECRET: process.env.JWT_SECRET,
    STRIPE_PUBLIC_KEY: process.env.STRIPE_PUBLIC_KEY,
    STRIPE_PRIVATE_KEY: process.env.STRIPE_SECRET_KEY,
    END_POINT_SECRET: process.env.END_POINT_SECRET,
    COOKIE_KEY: process.env.COOKIE_KEY,
    EM: process.env.EM,
    EM78: process.env.EM78,
};