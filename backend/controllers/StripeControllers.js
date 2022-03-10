import Stripe from 'stripe';
import Order from '../models/orderModel';
import User from '../models/userModel';
import config, { transporter } from '../config';
import { Templates } from "../emailService";


const stripe = Stripe(config.STRIPE_PRIVATE_KEY); 
const endpointSecret = config.END_POINT_SECRET;
let receipt;

const fulfillOrder = async session =>
{
  const order = await Order.findById(session.metadata.orderID).populate('user');
  if(order)
  {
    order.isPaid = true,
    order.paidAt = Date.now(),
    order.payment.paymentResult = {
      orderID: session.id,
      payerID: session.customer,
      paymentID: session.payment_intent,
      receipt: receipt,
    };
    const finalOrder = await order.save();
    const user = order.user;
    receipt = '';
    let items = finalOrder.orderItems.map(
      item => 
      {
        let string = '';
        string += `&nbsp;&nbsp;&nbsp;&nbsp;${item.title}  $${item.price} <br>`
        return string;
      }
    ).join('')

    const template = new Templates(
      finalOrder._id.toString(), 
      user.fname, 
      { 
        isPickUp: finalOrder.isPickUp, 
        name: user.fname, 
        email: user.email, 
        shipping: finalOrder.shipping, 
        items, totalPrice: 
        finalOrder.totalPrice
      }
    )
    const { body, subject } = template.paymentSuccess() 


    let mailOptions = {
        from: 'Da Salva - NO REPLY no-reply@dasalva.com.au',
        to: user.email.toString(),
        bcc: 'ciao@dasalva.com.au',
        replyTo: 'ciao@dasalva.com.au',
        subject: subject,
        html: body,
    }

    transporter.sendMail(mailOptions, (err, data) => {
    if (err) console.log(err);
    });

  }
}

export const stripePayment = (req, res) =>
{
    const sig = req.headers['stripe-signature'];
    const payload = req.body;
    let event;
    try
    {
      event = stripe.webhooks.constructEvent(payload, sig, endpointSecret);
    }
    catch(err)
    {
        console.log('errore', err);
        return res.status(400).send(`Webhook Error: ${err}`);
    }

    if(event.type === 'charge.succeeded')
      receipt = event.data.object.receipt_url;

    if(event.type === 'checkout.session.completed')
    {
      const session = event.data.object;
      fulfillOrder(session);
    }
    res.status(200).json({received: true});
}

export const stripeCheckout = async(req, res) => 
{
    const order = await Order.findById(req.params.id);

    if(!order)
      res.status(404).send({ message: 'Order Not Found' });
  
    const user = await User.findById(order.user);
    if(!user)
      res.status(404).send({ message: 'User Not Found' });

    const price = await stripe.prices.create(
      {
        unit_amount: parseInt((order.totalPrice * 100).toFixed()),
        currency: 'aud',
        product_data: {
          name: `Da Salva Order n. ${order.id}`,
          //metadata: JSON.stringify(user.emaill),
          statement_descriptor: 'Da Salva Order'
        },
      }
    );
    if(!price)
      res.status(404).send({ message: 'Price Not Created' });
    
    const lastAddress = order.shipping;
  
    const customer = 
      (user.stripeId) 
        ? await stripe.customers.retrieve(user.stripeId) 
        : await stripe.customers.create(
            {
              address: {
                    line1: lastAddress.addressA,
                    line2: lastAddress.addressB || '',
                    city: lastAddress.city,
                    postal_code: lastAddress.postalCode,
                    state: lastAddress.state,
                  },
              email: user.email,
              name: user.fname + ' ' + user.lname,
              phone: user.telephone,
              shipping: 
                  {
                    address: 
                        {
                          line1: lastAddress.addressA,
                          line2: lastAddress.addressB || '',
                          city: lastAddress.city,
                          postal_code: lastAddress.postalCode,
                          state: lastAddress.state,
                        },
                    name: user.fname + ' ' + user.lname,
                    phone: user.telephone,
                  }
              }
          );
  
    if(!customer)
      res.status(404).send({ message: 'Customer Not Created' });
   
    await User.findByIdAndUpdate(
      order.user,  
        { stripeId: customer.id }, 
      null, 
      (err, docs) =>
      { 
          if(err)
            return err
      }
    ).clone();
  
    const session = await stripe.checkout.sessions.create({
      success_url: `https://dasalva.com.au/user/order/${req.params.id}`,
      cancel_url: `https://dasalva.com.au/user/order/${req.params.id}`,
      payment_method_types: ['card'],
      metadata: { "orderID": req.params.id },
      line_items: [{ price: price.id, quantity: 1 }],
      mode: 'payment',
      client_reference_id: user._id.toString(),
      customer: customer.id,
      //billing_address_collection: 'required',
      locale: 'auto',
      //shipping_address_collection: { allowed_countries: ['AU'] },
      submit_type: 'pay',
      payment_intent_data: {
        receipt_email: user.email,
        statement_descriptor: 'Da Salva Purchase',
      },
    });
      
    res.json({ id: session.id });
  
  }