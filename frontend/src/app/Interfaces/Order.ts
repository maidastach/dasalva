import { Shipping, User } from "./User";

export interface OrderItems {
    title: string;
    image: string;
    price: number;
    quantity: number;
    _id: string;
}

export interface Payment {
    paymentMethod: string;
    paymentResult?: {
        orderID: string;
        payerID: string; 
        paymentID: string;
        receipt: string;
    }      
}

export interface Order {
    _id?: string;
    orderItems: OrderItems[];
    user?: User['_id'];
    shipping: Shipping | null;
    payment: Payment;
    itemsPrice: number;
    taxPrice: number;
    shippingPrice: number;
    totalPrice: number;
    isPickUp?: boolean;
    isPaid?: boolean;
    paidAt?: string;
    isDelivered?: boolean;
    deliveredAt?: string;
    createdAt?: string;
    fname?: string;
    email?: string;
}

export interface OrderForAdmin {
    _id?: string;
    orderItems: OrderItems[];
    user?: User;
    shipping: Shipping | null;
    payment: Payment;
    itemsPrice: number;
    taxPrice: number;
    shippingPrice: number;
    totalPrice: number;
    isPickUp?: boolean;
    isPaid?: boolean;
    paidAt?: string;
    isDelivered?: boolean;
    deliveredAt?: string;
    createdAt?: string;
    fname?: string;
    email?: string;
    instructionsSent?: boolean;
}