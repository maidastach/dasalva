import User from '../models/userModel';
import { emailFunction, isValid, sanitize, validateEmail, validatePostalCode } from '../utils';
import Contact from '../models/contactModel';
import { transporter } from '../config';

export const getCart = async(req, res) =>
{
    //console.log(req.session.cart);
    res.send(req.session.cart || [])
}

export const setCart = async(req, res) =>
{
    //console.log(req.body);
    req.session.cart = req.body
    res.send(req.session.cart)
}




// export const getShippings = async(req, res) => 
// {
//     try {
//         const id = req.session.user;
//         const user = await User.findById(id);
//         res.send(user.shipping);
//     }catch(error){
//         res.status(401).send({message: 'Access Unauthorized'});
//     }
// }

export const createShipping = async(req, res) => 
{
    const { addressA, addressB, city, postalCode, state } = req.body
    if(
        isValid(addressA, sanitize)
        && isValid(addressB, sanitize)
        && isValid(state, sanitize)
        && isValid(city, sanitize)
        && isValid(postalCode, validatePostalCode)
    )
    {
        const id = req.session.user;
        const user = await User.findById(id);

        if(!user)
            return res.status(401).send({ message: "Unable to verify your identity. Login Again" })

        user.shipping.map(address => address.isSelected = false);
        user.shipping.push(
            {   
                addressA: addressA,
                addressB: addressB || '',  
                city: city, 
                postalCode: postalCode, 
                state: state,
                isSelected: true, 
            }
        );
        user.isAddingAddress = false;
        user.isPickingUp = false;
        await user.save();
        res.send({ 
            success: true, 
            user, 
            address: user.shipping[user.shipping.length - 1],
            message: 'Address created succesfully!',
        });
    }
    else
        res.status(400).send({ message: "Invalid data format!" })
}

export const deleteShipping = async(req, res) => 
{
    const id = req.session.user;
    const user = await User.findById(id);
    if(!user)
        res.status(401).send(
            {
                message: 'User Not Found',
            }
        )
    else
    {
        const shippingId = req.params.id;
        user.shipping = user.shipping.filter(
            address => address._id.toString() !== shippingId
        )
        await user.save();
            res.send(user)    
    }
}

export const editShipping = async(req, res) => 
{
    const { addressA, addressB, city, postalCode, state, _id } = req.body;
    const userId = req.session.user;
    const user = await User.findById(userId);
    let findAddress;
    user.shipping = user.shipping.map(
        address => 
        {
            if(address._id.toString() === _id)
            {
                findAddress = { addressA, addressB, city, postalCode, state, isSelected: true, _id: address._id }
                return findAddress
            }
            return address
        }
    );
    user.isAddingAddress = false;
    await user.save()
    res.send({ user, findAddress })
}




export const selectShipping = async(req, res) => 
{
    console.log(req.body);
    const addressId = req.body.id;
    const userId = req.session.user;
    const user = await User.findById(userId);
    user.isAddingAddress = false;
    user.isPickingUp = false;
    user.shipping.map(
        address => 
            (address._id.toString() === addressId) 
                ? address.isSelected = true
                : address.isSelected = false
    );
    await user.save();
    res.send(user)
}

export const getSelectedAddress = async(req, res) =>
{
    const id = req.session.user;
    const user = await User.findById(id);
    const address = user.shipping.filter(address => address.isSelected)[0]
    res.send(address)
}




export const isAddingAddress = async(req, res) => 
{
    const id = req.session.user;
    const user = await User.findById(id);
    user.isAddingAddress = true;
    user.isPickingUp = false;
    user.shipping.map(
        address => address.isSelected = false
    );
    await user.save();
    res.send(user)
}

export const isPickingUp = async(req, res) => 
{
    const id = req.session.user;
    const user = await User.findById(id);
    user.isAddingAddress = false;
    user.isPickingUp = true
    user.shipping.map(
        address => address.isSelected = false
    );
    await user.save();
    res.send(user)
}