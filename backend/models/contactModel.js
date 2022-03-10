import mongoose from 'mongoose';

const contactSchema = new mongoose.Schema(
    {
        name: {type: String, required: true},
        email: {type: String, required: true},
        user: {
            type: mongoose.Schema.Types.ObjectId,  
            ref: 'User',
            required: false
        },
        telephone: {type: String, required: true},
        city: {type: String, required: true},
        message: {type: String, required: true},
},
{
    timestamps: true,
}

);

const Contact = mongoose.model('Contact', contactSchema);

export default Contact;