import bCrypt from 'bcryptjs';
import User from '../models/userModel';
import { generateToken, isValid, pswSafe, sanitize, telephoneValidator, validateEmail } from '../utils';
import { transporter } from '../config';
import { Templates } from '../emailService';

export const amILogged = async(req, res) =>
{
    const id = req.session.user
    if(id)
    {
        const user = await User.findById(id)
        if(!user)
            return res.send(null)
        return res.send(user)
    }
    return res.send(null)
}




export const signIn = async(req, res) => 
{
    const { email, password } = req.body;
    if(isValid(email, validateEmail))
    {
        if(!isValid(password, pswSafe))
            return res.status(401).send({ message: 'Password does not match your email.' });
        const user = await User.findOne({ email });
        if(!user)
            return res.status(401).send({ message: 'This Email is not registered with us! Please Register an account' });
        if(!user.isVerified)
            return res.status(401).send({
                message: 'Please verify your Account following the instructions sent into your mailbox Please also check the Spam/Junk folder'
            });
        const isMatch = await bCrypt.compare(password, user.password);
        if(!isMatch)
            return res.status(401).send({ message: 'Password does not match your email.' });

        req.session.user = user._id.toString()
        return res.send(user); 
    }
    return res.status(400).send({ message: 'Email not valid' })
}

export const register = async(req, res) => { 
    const { fname, lname, email, telephone, password, repassword } = req.body;
    if(
        isValid(fname, sanitize)
        && isValid(lname, sanitize)
        && isValid(email, validateEmail)
        && isValid(telephone, telephoneValidator)
        && isValid(password, pswSafe)
        && isValid(repassword, pswSafe)
    )
    {
        const findUser = await User.findOne({ email });
        if(findUser)
            return res.status(403).send({ message: 'This Email has already been registered with us!' })
        else
        {
            if(password === repassword)
            {
                const hashedPassword = await bCrypt.hash(password, 12);
                const user = await new User(
                    {
                        fname,
                        lname,
                        email,
                        telephone,
                        password: hashedPassword,
                        isAddingAddress: true,
                    }
                );
                const tempUser = await user.save()
                if(tempUser)
                    tempUser.verificationLink = generateToken(tempUser);
                else
                    return res.status(400).send({ message: 'Internal Error' })
                const createdUser = await tempUser.save();
                if(!createdUser)
                    return res.status(403).send({ message: 'Error occurred please contact us at: ciao@dasalva.com.au' })
                else
                {
                    const name = createdUser.fname;
                    const template = new Templates(createdUser.verificationLink, name, null)
                    
                    const { subject, body } = template.registration()
                    //const { subject: subjectAlert, body: bodyAlert } = template.registrationAlert()


                    let mailOptions = {
                        from: 'Da Salva - NO REPLY no-reply@dasalva.com.au',
                        to: createdUser.email.toString(),
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

                    // transporter.sendMail(
                    //     {
                    //         from: 'Da Salva - NO REPLY no-reply@dasalva.com.au',
                    //         to: 'ciao@dasalva.com.au',
                    //         subject: subjectAlert,
                    //         html: bodyAlert,
                    //     },
                    //         (err, data) =>
                    //         {
                    //             if(err)
                    //                 return res.status(400).send({ message: 'Email Not Sent' }); 
                    //         }
                    //     )
                    //req.session.user = createdUser._id.toString()

                    return res.status(200).send(
                        {
                            message: 'Registration complete! Please check your Inbox or Spam/Junk folder to verify your account',
                        }
                    )
                }
            }
            else
                return res.status(404).send({ message: 'Passwords do not match' })
        };
    }
    else
        return res.sendStatus(400);
}

export const activateAccount = async(req, res) =>
{
    const { token } = req.params;
    if(token)
    {
        const user = await User.findOne({ verificationLink: token });
        if(!user)
            return res.redirect('/')
            //status(401).send({ message: 'This Link is expired!<br><br>Please Make a new Request'})
        else if(user.isVerified)
        {
            user.verificationLink = '';
            await user.save();
            req.session.user = user._id.toString();
            return res.redirect('/user/profile')
        }
        else
        {
            user.isVerified = true;
            user.verificationLink = '';
            await user.save();
            req.session.user = user._id.toString();
            return res.redirect('/user/profile')
        };
    }
    res.redirect('/'); 
}

export const updateProfile = async(req, res) => 
{
    const id = req.session.user;
    if(!id)
        return res.status(401).send({ error: 'Not Authorized' })
    const { fname, lname, email, telephone, oldPassword, newPassword, repassword } = req.body;
    if(
        !isValid(fname, sanitize)
        || !isValid(lname, sanitize)
        || !isValid(email, validateEmail)
        || !isValid(telephone, telephoneValidator)
        || !isValid(oldPassword, pswSafe)
    )
        return res.status(400).send({ error: 'Invalid Data' })
      
    const signinUser = await User.findById(id);
  
    if(!signinUser)
        return res.sendStatus(400);
    else if(signinUser.email !== email)
        return res.sendStatus(400);
    else
    {
        const isMatch = await bCrypt.compare(oldPassword, signinUser.password);
        if(!isMatch) //OLD PASSWORD DOESNT MATCH
            return res.status(401).send({ message: 'Password does not match your email',});
        else
        { //OLD PASSWORD MATCH
            signinUser.fname = fname || signinUser.fname;
            signinUser.lname = lname || signinUser.lname;
            signinUser.telephone = telephone || signinUser.telephone;
            
            if(newPassword && repassword)
            { //IF TRYING TO CHANGE OLD PASSWORD
                if(
                    isValid(newPassword, pswSafe) //PASSWORD SAFE
                    && newPassword === repassword //PASSWORD MATCHING
                    && newPassword !== oldPassword // PASSWORD DIFFERENT FROM OLD ONE
                )
                {
                    const hashedPassword = await bCrypt.hash(newPassword, 12);
                    signinUser.password = hashedPassword;
                    const updatedUser = await signinUser.save();
                    
                    const name = updatedUser.fname;
                    const template = new Templates(null, name, null)
                    const { body, subject } = template.passwordUpdate()

                    let mailOptions = {
                        from: 'Da Salva - NO REPLY no-reply@dasalva.com.au',
                        to: updatedUser.email.toString(),
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
                    return res.status(200).send({ data: updatedUser, message: 'Details and Password Updated!' });//ALL GOOD RERENDER PAGE WITH MESSAGE
                }
                else
                //ANY ERROR WITH NEW PASSWORD INPUT
                    res.status(401).send({
                        message: 'Password Not Updated, Try Again',
                    });
                
            }
            //NOT UPDATING PASSWORD
            const lastUser = await signinUser.save();
            return res.status(200).send({ data: lastUser, message: 'Details Updated' });
        }
    }
}

export const logout = async(req, res) => 
{
    req.session.destroy(
        (err) =>
        {
            if(err)
            {
                console.log(err);
                res.status(401).send({ message: 'Could not logout' });
            }
        }
    );
    res.send({ message: 'Logged out' });
}




export const resetPassword = async(req, res) => 
{
    const { email } = req.body;
    if(isValid(email, validateEmail))
    {
        const user = await User.findOne({ email });
        if(!user)
            res.status(401)
                .send(
                    { message: 'This Email is not registered with us! Please Register an account' }
                );
        else
        {
            user.resetLink = generateToken(user);
            await user.save();
            const name = user.fname;

            const template = new Templates(user.resetLink, name, null)
            const { body, subject } = template.resetPassword()

            let mailOptions = {
                from: 'Da Salva - NO REPLY no-reply@dasalva.com.au',
                to: user.email.toString(),
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
            res.send(
                { message: 'Follow the instructions received by email' }
            );
        };
    }
    res.sendStatus(401); 
}

export const setNewPassword = async(req, res) => 
{
    const { email, token, password } = req.body;
    if(!token)
        return res.sendStatus(401)

    const user = await User.findOne({ email });

    if(!user)
        res.status(401).send({ message: 'Email not registered with us' });
    else if(user && !user.resetLink)
        res.status(401).send({ message: 'This Link is expired!<br><br>Please Make a new Request' });
    else if(user && (user.resetLink !== token))
        res.status(401).send({ message: 'Please make a new Request ' });
    else if(user && (user.resetLink === token))
    {
        const isMatch = await bCrypt.compare(password, user.password);
        
        if(isMatch)
            res.status(401).send({ message: 'Password already used, Please create a different one' });
        else
        {
            user.resetLink = '';
            const hashedPassword = await bCrypt.hash(password, 12);
            user.password = hashedPassword;

            const updatedUser = await user.save();
            req.session.user = updatedUser._id.toString()
            
            const name = updatedUser.fname;
            const template = new Templates(null, name, null)
            const { body, subject } = template.resetPasswordSuccess()

            let mailOptions = {
                from: 'Da Salva - NO REPLY no-reply@dasalva.com.au',
                to: updatedUser.email.toString(),
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

            res.send(updatedUser)
        };
    }
    else
        res.sendStatus(400)
}

export const resendToken = async (req, res) => 
{
    const { email } = req.body
    if(!isValid(email, validateEmail))
        return res.status(400).send({ message: 'Ivalid Email' })
    
    const user = await User.findOne({ email });
    if(!user)
        return res.status(401).send({ message: 'This Email is not registered with us! Please Register an account' });
    else if(user.isVerified)
        return res.status(401).send({ message: 'This Account is Verified!' });

    user.verificationLink = generateToken(user);
    const createdUser = await user.save();
    if(!createdUser)
        return res.status(403).send({ message: 'Error occurred please contact us at: ciao@dasalva.com.au' })

    const name = createdUser.fname;
    const template = new Templates(createdUser.verificationLink, name, null)
    
    const { subject, body } = template.resendVerification()

    let mailOptions = {
        from: 'Da Salva - NO REPLY no-reply@dasalva.com.au',
        to: createdUser.email.toString(),
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
    res.send({ message: 'Please check you mailbox!'})
}
