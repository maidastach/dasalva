import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
    {
    orderItems: [
        {
        title: {type: String, required: true},
        image: {type: Array, required: true},
        price: {type: Number, required: true},
        quantity: {type: Number, required: true},
        _id: {
            type: mongoose.Schema.Types.ObjectId,  
            ref: 'Product',
            required: true
                 },
        }
                ],
    user: {
        type: mongoose.Schema.Types.ObjectId,  
        ref: 'User',
        required: true
        },
    shipping: {
        addressA: String,
        addressB: String,
        city: String,
        postalCode: String,
        state: String,
            },
    payment: {
        paymentMethod: String,
        paymentResult: {
            orderID: String,
            payerID: String, 
            paymentID: String,
            receipt: String
                        },
            },
    itemsPrice: Number,
    taxPrice: Number,
    shippingPrice: Number,
    totalPrice: Number,
    isPickUp: { type: Boolean, required: true },
    instructionsSent: { type: Boolean, default: false },
    isPaid: { type: Boolean, required: true, default: false},
    paidAt: Date,
    isDelivered: { type: Boolean, required: true, default: false},
    deliveredAt: Date
    },
    {
     timestamps: true,
    }
);

const Order = mongoose.model('Order', orderSchema);
export default Order;