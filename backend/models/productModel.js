import mongoose from 'mongoose';

const productSchema = new mongoose.Schema(
  {
    title: { type: String, required: true},
    price: { type: Number, default: 0.0, required: true},
    description: { type: String, required: true},
    image: { type: Array, required: true},
    review : {
      rating: { type: Number, default: 0.0, required: true},
      numReviews: { type: Number, default: 0, required: true},
      comments: [
        {
          text: { type: String, required: true},
          stars: { type: Number, required: true},
          user: {
            type: mongoose.Schema.Types.ObjectId,  
            ref: 'User',
            required: true
            },
            name: { type: String, required: true},
          date : { type: Date, required: true, default: new Date()},
        }
      ],
    },
    countInStock: { type: Number, default: 0, required: true}, 

  }, 

  {
    timestamps:true
  }
);

const Product = mongoose.model('Product', productSchema);

export default Product;