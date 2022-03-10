import Stripe from "stripe";
import Order from "../models/orderModel";
import User from "../models/userModel";
import config, { transporter } from '../config';
import { Templates } from "../emailService";

const stripeSecretKey = config.STRIPE_PRIVATE_KEY;
const stripe = Stripe(stripeSecretKey); 

export const getOrdersByUser = async(req, res) => 
{
  const userId = req.session.user;
  const orders = await Order.find({ user: userId });
  if(orders)
    res.send(orders);
  else
    res.status(404).send({ message: 'Orders Not Found' });
}

export const getSingleOrder = async(req, res) => 
{
  const userId = req.session.user;
  const orderId = req.params.id;

  const order = await Order.findById(orderId);
  const user = await User.findById(userId);
  const userOfOrder = await User.findById(order.user);

  if(userOfOrder._id.toString() === req.session.user || user.isAdmin)
  {
    if(order)
      res.send({ user: userOfOrder, order });
    else
      res.status(404).send({ message: 'Order Not Found' });
  }
  else
    res.sendStatus(401);
}

export const createOrder = async(req, res) => 
{
  const { fname, email, ...orderForm } = req.body;
  const order = new Order(orderForm);
  const createdOrder = await order.save();

  let items = orderForm.orderItems.map(
    item => 
    {
      let string = '';
      string += `&nbsp;&nbsp;&nbsp;&nbsp;${item.title}  $${item.price} <br>`
      return string;
    }
  ).join('')
  const template = new Templates(
    createdOrder._id, 
    fname, 
    { name: fname, email, isPickUp: orderForm.isPickUp, shipping: orderForm.shipping, items, shippingPrice: orderForm.shippingPrice, totalPrice: orderForm.totalPrice }
  )

  const { body, subject } = template.orderPlaced()
  // const { body: bodyAlert, subject: subjectAlert } = template.orderPlacedAlert()

  let mailOptions = {
      from: 'Da Salva - NO REPLY no-reply@dasalva.com.au',
      to: email.toString(),
      bcc: 'ciao@dasalva.com.au',
      replyTo: 'ciao@dasalva.com.au',
      subject: subject,
      html: body,
  }

  transporter.sendMail(
    mailOptions, 
    (err, data) => 
    {
      if(err)
        res.send({ message: 'Error sending email. Check order from Profile Page'})
    }
  )

  // transporter.sendMail(
  //   {
  //     from: email.toString(),
  //     to: 'ciao@dasalva.com.au',
  //     subject: subjectAlert,
  //     html: bodyAlert,
  //   }, 
  //   (err, data) => 
  //   {
  //     if(err)
  //       res.send({ message: 'Error sending email. Check order from Profile Page'})
  //   }
  // )

  res.status(201).send(createdOrder);
}

export const orderGuard = async(req, res) => 
{
    const order = await Order.findById(req.params.id);
    const user = await User.findById(req.session.user);
    if(user._id.toString() === order.user.toString() || user.isAdmin)
      res.send(true)
    else
      res.send(false)
}




/* export const stripeCheckout = async(req, res) => {
    const order = await Order.findById(req.params.id);
    if (!order) {
      res.status(404).send({ message: 'Order Not Found' });
    };
  
    const user = await User.findById(order.user);
    if (!user) {
      res.status(404).send({ message: 'User Not Found' });
    };
    // const result = {
    //       orderId: [],
    //       order_id : [],
    //     }
    // order.orderItems.map(single => {
    //   result.orderId.push(single.id)
    //   result.order_id.push(single._id)
    // })
  
    const price = await stripe.prices.create(
        {
          unit_amount: parseInt((order.totalPrice * 100).toFixed()),
          currency: 'aud',
          product_data: 
              {
                name: `Da Salva Order n. ${order.id}`,
                //metadata: JSON.stringify(result),//{orderId: order.orderItems.id.toString(), order_id: order.orderItems._id.toString()},
                statement_descriptor: 'Da Salva Order'
              },
      }
    );
    if (!price) {
      res.status(404).send({ message: 'Price Not Created' });
    };
    
    const lastAddress = user.shipping[user.shipping.length - 1];
  
    const customer = 
      (user.stripeId) 
        ? await stripe.customers.retrieve(user.stripeId) 
        : await stripe.customers.create(
            {
              address: 
                  {
                    line1: lastAddress.addressA || req.body.addressA,
                    line2: lastAddress.addressB || req.body.addressB,
                    city: lastAddress.city || req.body.city,
                    postal_code: lastAddress.postalCode || req.body.postalCode,
                    state: lastAddress.state || req.body.state,
                  },
              email: user.email,
              name: user.fname + ' ' + user.lname,
              phone: user.telephone,
              shipping: 
                  {
                    address: 
                        {
                          line1: lastAddress.addressA || req.body.addressA,
                          line2: lastAddress.addressB || req.body.addressB,
                          city: lastAddress.city || req.body.city,
                          postal_code: lastAddress.postalCode || req.body.postalCode,
                          state: lastAddress.state || req.body.state,
                        },
                    name: user.fname + ' ' + user.lname,
                    phone: user.telephone,
                  }
              }
          );
  
    if (!customer) {
      res.status(404).send({ message: 'Customer Not Created' });
    };
  
    User.findByIdAndUpdate(
      order.user,  
        {
          stripeId: customer.id,
        }, 
      null, 
      function (err, docs) { 
          if (err){ 
            console.log(err)
          } 
      }
    );
  
      const session = await stripe.checkout.sessions.create(
            {
              success_url: `https://dasalva.com.au/order/${req.params.id}`,
              cancel_url: `https://dasalva.com.au/order/${req.params.id}`,
              payment_method_types: ['card'],
              metadata: 
                  {
                    "orderID": req.params.id,
                    // "orderItems": order.orderItems.toString()
                  },
              line_items: 
                [
                  {
                    price: price.id, 
                    quantity: 1,
                  }
                ],
              mode: 'payment',
              client_reference_id: user._id.toString(),
              customer: customer.id,
              //customer_email: user.email,
              billing_address_collection: 'required',
              locale: 'auto',
              shipping_address_collection: 
                  {
                    allowed_countries: ['AU']
                  },
              submit_type: 'pay',
              payment_intent_data: 
                  {
                    receipt_email: user.email,
                    statement_descriptor: 'Da Salva Purchase',
                  },
            }
        );
      
      res.json({ id: session.id });
  
  } */
