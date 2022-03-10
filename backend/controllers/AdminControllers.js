import User from '../models/userModel'
import Order from '../models/orderModel'
import Product from '../models/productModel'
import Contact from '../models/contactModel'
import { Templates } from '../emailService';
import { MongoStoreConfig, transporter } from '../config';

// export const createAdmin = async(req, res) => 
// {
//     const user = new User({
//         fname: 'Sasa',
//         lname: 'Da Salva',
//         email: 'tua@email.com',
//         password: await bCrypt.hash('dasalva', 12),
//         telephone: '000000000',
//         isAdmin: true,
//         isVerified: true,
//     });
//     const createdUser = await user.save();
//     transporter.sendMail(
//         {
//             from: 'Da Salva - NO REPLY no-reply@dasalva.com.au',
//             to: 'ciao@dasalva.com.au',
//             subject: 'New Admin registration',
//             html: 'New Admin Created',
//         }, (err, data) => {
//         if (err) console.log(err);
//     });
//     res.send('User Created');
// }

export const getUsers = async(req, res) =>
{
    const users = await User.find({});
    res.send(users);
}




export const getOrders = async(req, res) => 
{
    const orders = await Order.find({}).populate('user');
    res.send(orders);
}

export const deleteOrder = async(req, res) => 
{
    const id = req.params.id;
    const order = await Order.findById(id);

    if(order)
    {
      await order.remove();
      res.send(order);
    }
    else
      res.status(404).send({ message: 'Order Not Found' });
}

export const deliverOrder = async(req, res) => 
{
    const id = req.params.id;
    const order = await Order.findById(id).populate('user');
    if(order)
    {
        const user = order.user;
        order.isDelivered = true;
        order.deliveredAt = Date.now();
        const updatedOrder = await order.save();

        const orderId = updatedOrder._id.toString();
        const name = user.fname

        const template = new Templates(orderId, name, { isPickUp: order.isPickUp })

        const { body, subject } = template.deliver();

        let mailOptions = {
            from: 'Da Salva - NO REPLY no-reply@dasalva.com.au',
            to: user.email.toString(),
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
                    return res.status(400).send({ message: 'Email Not Sent' }); 
            }
        )
        return res.send(updatedOrder);
    }
    else
        res.status(404).send({ message: 'Order Not Found.' });
}

export const sendInstructions = async(req, res) => 
{
    const { id, ...obj } = req.body
    const order = await Order.findById(id).populate('user')

    order.instructionsSent = true;

    const template = new Templates(order._id.toString(), order.user.fname, obj)

    const { body, subject } = (order.isPickUp) ? template.pickUp() : template.shipping();

    let mailOptions = {
        from: 'Da Salva - NO REPLY no-reply@dasalva.com.au',
        to: order.user.email.toString(),
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
                return res.status(400).send({ message: 'Email Not Sent' }); 
        }
    )

    const updatedOrder = await order.save()

    return res.send(updatedOrder);

}




export const createProduct = async(req, res) => 
{
    const product = new Product(req.body);
    const createdProduct = await product.save();
    if(createdProduct)
        res.status(201).send({message: 'Product Created', product: createdProduct});
    else
        res.status(500).send({message: 'Error in creating Product'});
}

export const updateProduct = async(req, res) => 
{
    const productId = req.params.id;
    const product = await Product.findById(productId);
    if(product)
    {
      product.title = req.body.title;
      product.price = req.body.price;
      product.image = product.image.concat(req.body.image);
      product.description = req.body.description;
      product.countInStock = req.body.countInStock;

      const updatedProduct = await product.save();

        if(updatedProduct)
            res.send({ message: 'Product Updated', product: updatedProduct });
        else
            res.status(500).send({ message: 'Error in updating product' });
    }
    else
      res.status(404).send({ message: 'Product Not Found' });
}

export const deleteProduct = async(req, res) => 
{
    const product = await Product.findById(req.params.id);
    if(product)
    {
      const deletedProduct = await product.remove();
      res.send({ message: 'Product Deleted', product: deletedProduct });
    }
    else
      res.status(404).send({ message: 'Product Not Found' });
}

export const uploadImage = (req, res) => 
{
    const files = req.files;
    const data = files.map(file => file.path);
    res.status(201).send(data);
}

export const deleteImage = async(req, res) => 
{
    const { productId, img } = req.body;
    const product = await Product.findById(productId);
    if(product)
    {
        product.image.splice(img, 1)
        const updatedProduct = await product.save();
        if(updatedProduct)
            res.send({ message: 'Product Updated', product: updatedProduct });
        else
            res.status(500).send({ message: 'Error in updating product' });
    } 
    else
      res.status(404).send({ message: 'Product Not Found' });
}




export const getContacts = async(req, res) => 
{
    const contacts = await Contact.find({});
    res.send(contacts);
}




export const getSessions = async(req, res) => 
{
    const sessions = await MongoStoreConfig.all();
    res.send(sessions);
}
