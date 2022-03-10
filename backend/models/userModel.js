import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    fname: {type: String, required: true},
    lname: {type: String, required: true},
    email: {type: String, required: true, index: true, unique: true},
    telephone: {type: String, required: true,},
    password: {type: String, required: true},
    shipping: [
        {
            addressA: {type: String, required: false,},
            addressB: {type: String, required: false,},
            city: {type: String, required: false,},
            postalCode: {type: String, required: false,},
            state: {type: String, required: false,},
            isSelected: {type: Boolean, required: false, default: false,},
        }, 
        {
            timestamps: true
        }
    ],
    isAddingAddress: {type: Boolean, required: false, default: false},
    isPickingUp: {type: Boolean, required: false, default: false},
    resetLink: {type: String, required: false,},
    stripeId: {type: String, required: false},
    isAdmin: {type: Boolean, required: true, default: false},
    isVerified: {type: Boolean, required: true, default: false},
    verificationLink: {type: String, required: false,}
},
{
    timestamps: true,
}
);

const User = mongoose.model('User', userSchema);

export default User;