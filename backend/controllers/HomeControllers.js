import User from '../models/userModel'
import Contact from '../models/contactModel'
import { isValid, sanitize, telephoneValidator, validateEmail } from '../utils'
import { Templates } from '../emailService'
import { transporter } from '../config'

// export const cookie = async (req, res) => {
//     try{
//       const id = req.session.user;
//       const user = await User.findById(id);
//       res.status(200).json(
//         {
//           fname: user.fname,
//           lname: user.lname,
//           email: user.email,
//           telephone: user.telephone,
//           isGuest: user.isGuest,
//           isAdmin: user.isAdmin,
//           shipping: user.shipping,
//           isAddingAddress: user.isAddingAddress,
//           cart: req.session.cart,
//         }
//       )
//     }catch(err){
//       res.status(200).json(
//         {
//           cart: req.session.cart
//         }
//       )
//     }
// }

// export const setCookie = async (req, res) => {
//     const element = req.body;
//     if (element.field.length > 0) {
//             req.session.cart = element.field;
//     }else if (element.field.length === 0) {
//             req.session.cart = [];
//     }
//     res.end();
// }

export const sitemap = async(req, res) =>
{
  res.sendFile(path.join(__dirname, '/sitemap.xml'))
}

export const addContact = async(req, res) => 
{
    const { name, email, telephone, city, message } = req.body;
    if(
        isValid(name, sanitize)
        && isValid(email, validateEmail)
        && isValid(telephone, telephoneValidator)
        && isValid(city, sanitize)
        && isValid(message, sanitize)
      )
    {
      const user = await User.findOne({email: email}).clone();
      const contactForm = user ? { ...req.body, user } : { ...req.body }

      const contact = await new Contact(contactForm);
      const createdContact = await contact.save();

      if(!createdContact)
          res.status(401).send({ message: 'Invalid User Data' })
      else
      {
        const template = new Templates(createdContact._id, createdContact.name, createdContact)
        const { body, subject } = template.contact();
        const { body: bodyAlert, subject: subjectAlert } = template.contactAlert();
          
        let mailOptions = {
          from: 'Da Salva - NO REPLY no-reply@dasalva.com.au',
          to: email,
          subject: subject,
          html: body,
        }

        transporter.sendMail(
          mailOptions, 
          (err, data) =>
          {
            if(err) 
            res.status(401).send({ message: 'Message was not sent!' })
          }
        )
        transporter.sendMail(
          {
            from: email,
            to: 'ciao@dasalva.com.au',
            subject: subjectAlert,
            html: bodyAlert,
          }, 
          (err, data) => 
          {
            if(err) res.status(401).send({ message: 'Message was not sent!' })
          }
        )
          res.send({ message: 'Thanks for Contacting US',})
      }
    }
    else
      res.status(400).send({ message: 'Form not sent' });
}