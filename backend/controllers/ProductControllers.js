import Order from '../models/orderModel';
import Product from '../models/productModel';
import User from '../models/userModel';

export const getProducts = async(req, res) => 
{
    const products = await Product.find({});
    res.send(products);
}

export const getSingleProduct = async(req, res) => 
{
    const product = await Product.findById(req.params.id);
    res.send(product);
}

export const addReview = async(req, res) => 
{
    const userId = req.session.user;
    !userId && res.send(
      {
        message: 'Please Login to leave a feedback'
      }
    )
    const { text, star, id } = req.body;
    
    const user = await User.findById(userId);
    const orders = await Order.find(
      {
        user: userId
      }, function (err, docs) { 
        if (err){ 
            console.log(err); 
        } 
      }
    );
    const findMatch = orders.map(order => order.orderItems).map(x => x.map(y => y.id.toString() === id)).some(z => z.find(a => a === true));
    if (!findMatch) {
      res.send( 
          {
            message: 'It seems you did not try this product yet or you need to Login',
          }
      )
    }else{
      const data = {
        'text': text,
        'stars': star,
        'user': user._id,
        'name': user.fname,
      }
      const product = await Product.findById(id); 
  
      product.review.comments.push(data);
      product.review.numReviews = product.review.comments.length;
      let comments = product.review.comments;
      let rating = comments.reduce((a, c) => {
        return c.stars + a; 
      }, 0);
      product.review.rating = (rating / product.review.numReviews).toFixed(2);
      await product.save();
      const title = "Thanks for your product's feedback!"
      const bodyA = `Hello ${user.fname}, thanks for have spent some time to review the ${product.title}, <br>
                      We will take your feedback/reccomendation as way to improve!<br><br>
                      <a href="https://dasalva.com.au/">Da Salva</a><br><br>
                      Thanks for supporting our business! <br><br>
                      Here is your Feedback: <br>
                      Name: ${user.fname}<br>
                  Email: ${user.email}<br>
                  Stars: ${star}<br>
                  Feedback: ${text}
  
                  <br><br><br>`;
      const bodyB = `Please do not reply to this email, if you want to you can text us at <br> ciao@dasalva.com.au`;
      let mailOptions = {
          from: 'Da Salva - NO REPLY no-reply@dasalva.com.au',
          to: user.email.toString(),
          subject: `Thanks for your Feedback on the ${product.title}`,
          html: emailFunction(title, bodyA, bodyB),
      }
  
      transporter.sendMail(mailOptions, (err, data) => {
        if (err) console.log(err);
      });
      
      transporter.sendMail(
        {
          from: 'Da Salva - NO REPLY no-reply@dasalva.com.au',
          to: 'ciao@dasalva.com.au',
          subject: `New Feedback on the ${product.title}`,
          html: 'New Feedback posted',
        }, (err, data) => {
        if (err) console.log(err);
      })
      
      res.send( 
          {
            message: 'Thanks for Your Feedback',
          }
      )
  
    }
  }