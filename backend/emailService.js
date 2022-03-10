export const customizeEmail = (title, body, name) => `
    <table style="border-spacing:0;border-collapse: collapse !important;border-color: transparent !important;width: 100%;height: 100vh;
                    word-break: break-word !important;background-color: #c3151c;">
        <thead>
            <tr>
                <td rowspan="4" style='text-align:left;vertical-align:top;font-size:14px;overflow:hidden;padding:10px 5px;max-width: 5%;width: 5%;'>
                </td>
                <td style="text-align:left;vertical-align:top;font-size:14px;overflow:hidden;padding:10px 5px;height: 20vh;clip-path:ellipse(84% 141% at 17.62% -40%);background-color: white !important;text-align: center !important;
                            border-bottom-left-radius: 10%;vertical-align:middle !important;padding: 0 1rem !important;">
                    <div style="height: 85%;">
                        <a href="https://dasalva.com.au">
                            <div style="height: 100%;width: auto;background-image: url(https://i.ibb.co/hHWVRRp/logo.png);background-repeat: no-repeat;
                                            background-size: auto 100%;background-position-y: center;">
                            </div>
                        </a>
                    </div>
                </td>
                <td rowspan="4" style='text-align:left;vertical-align:top;font-size:14px;overflow:hidden;padding:10px 5px;max-width: 5%;width: 5%;'>
                </td>
            </tr>
            <tr>
                <td style='text-align:left;vertical-align:top;font-size:14px;overflow:hidden;padding:10px 5px;color: white;min-height: 10vh;text-align: center !important;'>
                    <div style='height: 45%;display: flex;justify-content: center;align-items: center;'>
                        <h2>
                            ${title}
                        </h2> 
                    </div>
                </td>
            </tr>
            <tr>
                <td style='text-align:left;vertical-align:top;font-size:14px;overflow:hidden;padding:10px 5px;min-height: 62vh; padding: 0 !important; display: flex;background-color: white !important;'>
                    <div style="width: 100%;">
                        <p style='min-height: 60%; padding: 1rem 2rem;'>
                            Hello ${name},
                            <br><br>
                            ${body}
                        </p>
                        <hr>
                        <p style='padding: 0rem 1rem;font-size: smaller !important;text-align: center !important;line-height: 16px;'>
                            <i>
                                Please do not reply to this message. 
                                This is an unmonitored mailbox.
                                <br> 
                                If you have questions please reply to 
                            </i>
                            <a href="mailto:ciao@dasalva.com.au">ciao@dasalva.com.au</a> 
                            <br>
                            <i>Or through our website</i>
                            <br>
                            <a href='https://www.dasalva.com.au/contact'>
                                <button>Contact Us</button>
                            </a>
                        <p>
                    </div>
                </td>
            </tr>
            <tr>
                <td style="height: 6vh;background-color: white !important;padding: 0 !important;text-align:left;vertical-align:top;font-size:14px;overflow:hidden;padding:10px 5px;">
                    <div style="height: 100%;">
                        <a href="https://dasalva.com.au">
                            <div style="height: 100%;background-image:url(https://www.dasalva.com.au/image/written.png)!important;background-size: auto 65%;
                                            background-position-x:right;background-repeat: no-repeat;background-position-y: center;">
                            </div>
                        </a>
                    </div>
                </td>
            </tr>
        </thead>
    </table>
`

export class Templates 
{
    constructor(id, name, obj) {
        this.id = id;
        this.name = name;
        this.obj = obj;
    }

    registration()
    {
        const body = `
            Thanks for joining Da Salva, <br>
            In order to start enjoying your favourite pizzas, please verify your account!<br>
            <a href=https://dasalva.com.au/api/auth/activateaccount/${this.id}>
                <button>Verify Now</button>
            </a>
            <br><br>
            If the link doesn't work, just copy and paste this into your browser:<br>
            <i>
                https://www.dasalva.com.au/api/auth/activateaccount/${this.id}
            </i>
        `;
        const title = 'Verify your account at Da Salva!';

        return {
            subject: 'Verify your account at Da Salva!',
            body: customizeEmail(title, body, this.name)
        }
    }
    registrationAlert()
    { 
        const body = `New User Registered`;
        const title = 'New User Registration';
        
        return {
            subject: 'New User Registration',
            body: customizeEmail(title, body, this.name),
        }
    }
    resendVerification()
    { 
        const body = `
            In order to start enjoying your favourite pizzas, please verify your account!<br>
            <a href=https://dasalva.com.au/api/auth/activateaccount/${this.id}>
                <button>Verify Now</button>
            </a>
            <br><br>
            If the link doesn't work, just copy and paste this into your browser:<br>
            <i>
                https://www.dasalva.com.au/api/auth/activateaccount/${this.id}
            </i>
        `;
        const title = 'Verify your account at Da Salva!';
        
        return {
            subject: 'Verify your account at Da Salva!',
            body: customizeEmail(title, body, this.name),
        }
    }
    passwordUpdate()
    { 
        const body = `
            Password updated successfully!
            <br><br>
            <b>If you did not make this change please contact us immediately!</b>
        `;
        const title = 'Password Updated!';
        
        return {
            subject: 'Password Updated!',
            body: customizeEmail(title, body, this.name),
        }
    }
    resetPassword()
    { 
        const body = `
            You have requested to reset your password<br>
            <a href=https://dasalva.com.au/auth/password/${this.id}><button>Reset Password</button></a>
            <br><br>
            <b>If you have not requested to reset your password just ignore this email 
            and secure your account by changing you password from your profile page</b>
            <br>
            <a href="https://dasalva.com.au/user/profile"><button>Go to Profile</button></a>
        `;
        const title = 'Reset your password';
        
        return {
            subject: 'Reset your password',
            body: customizeEmail(title, body, this.name), 
        }
    }
    resetPasswordSuccess()
    { 
        const body = `
            Password updated successfully!
            <br>
            <a href="https://dasalva.com.au/products"><button>Get some Pizza!</button></a>
            <br><br>
            <b>If you did not make this change please contact us immediately!</b>
        `;
        const title = 'Password Updated!';
        
        return {
            subject: 'Password Updated!',
            body: customizeEmail(title, body, this.name),
        }
    }
    contact()
    { 
        const body = `
            We have received your request!<br>
            We will get in touch with you shortly!<br><br>
            Here is your Enquiry: <br><br>
            Name: ${this.obj.name}<br>
            Email: ${this.obj.email}<br>
            Phone Number: ${this.obj.telephone}<br>
            City: ${this.obj.city}
            <br><br>
            Message:<br>
            ${this.obj.message}
        `;
        const title = `Contact request n. ${this.id}`;
        
        return {
            subject: 'Thanks for reaching out!',
            body: customizeEmail(title, body, this.name), 
        }
    }
    contactAlert()
    { 
        const body = `
            New Contact Request:<br><br>
            Name: ${this.obj.name}<br>
            Email: ${this.obj.email}<br>
            Phone Number: ${this.obj.telephone}<br>
            City: ${this.obj.city}
            ${this.obj.user ? `<br>UserId: ${this.obj.user._id.toString()}` : ''}
            <br><br>
            Message:<br>
            ${this.obj.message}
        `;
        const title = `Contact request n. ${this.id}`;
        
        return {
            subject: `Contact request n. ${this.id}`,
            body: customizeEmail(title, body, this.name),
        }
    }
    orderPlaced()
    { 
        const body = `
            You are one step away from enjoying your pizzas!<br><br>
            Please proceed with payment:<br>
            <a href=https://dasalva.com.au/user/order/${this.id}>
                <button>Pay Now</button>
            </a>
            <br><br>
            You can find all of your order details in your Profile!
            <br><br>  
            Here is your order: <br><br>
            Name: ${this.obj.name}<br>
            Email: ${this.obj.email}<br>
            ${this.obj.isPickUp ? 'Pick Up Location' : 'Shipping Address'}:<br>            
            &nbsp;&nbsp;&nbsp;&nbsp;${this.obj.shipping.addressA}<br> 
            ${this.obj.shipping.addressB ? '&nbsp;&nbsp;&nbsp;&nbsp;' + this.obj.shipping.addressB + '<br>': ''}
            &nbsp;&nbsp;&nbsp;&nbsp;${this.obj.shipping.city}<br>
            &nbsp;&nbsp;&nbsp;&nbsp;${this.obj.shipping.postalCode}<br>
            &nbsp;&nbsp;&nbsp;&nbsp;${this.obj.shipping.state}<br>
            Products: <br>${this.obj.items}
            Delivery Fee: ${this.obj.isPickUp ? 'Pick Up Order' : '$' + this.obj.shippingPrice }<br>
            Total to pay: $${this.obj.totalPrice}
            <br><br><br>
            Thanks for supporting our business!
        `;
        const title = `Thanks! Order ${this.id} Placed!`;
        
        return {
            subject: `Thanks! Order ${this.id} Placed!`,
            body: customizeEmail(title, body, this.name), 
        }
    }
    orderPlacedAlert()
    { 
        const body = `
            New ${this.obj.isPickUp ? 'Pick Up' : 'Deliver'} Order Placed!
            <br><br>  
            Here is the order: <br>
            Name: ${this.obj.name}<br>
            Email: ${this.obj.email}<br>
            ${this.obj.isPickUp ? 'Pick Up Location' : 'Shipping Address'}:<br>
            &nbsp;&nbsp;&nbsp;&nbsp;${this.obj.shipping.addressA}<br> 
            ${this.obj.shipping.addressB ? '&nbsp;&nbsp;&nbsp;&nbsp;' + this.obj.shipping.addressB + '<br>': ''}
            &nbsp;&nbsp;&nbsp;&nbsp;${this.obj.shipping.city}<br>
            &nbsp;&nbsp;&nbsp;&nbsp;${this.obj.shipping.postalCode}<br>
            &nbsp;&nbsp;&nbsp;&nbsp;${this.obj.shipping.state}<br>
            Products: <br>${this.obj.items}
            Delivery Fee: ${this.obj.isPickUp ? 'Pick Up Order' : '$' + this.obj.shippingPrice }<br>
            Total to pay: $${this.obj.totalPrice}
        `;
        const title = `New Order placed! ${this.id}!`;
        
        return {
            subject: `New Order placed! ${this.id}!`,
            body: customizeEmail(title, body, this.name),  
        }
    }
    paymentSuccess()
    { 
        const body = `
            We are processing your order! We do our best to complete the order in 1 to 5 days.
            <br>
            We will email you back within 24h to provide the ${this.obj.isPickUp ? 'Pick Up' : 'Delivery'} details<br>
            <br><br>
            ${this.obj.isPickUp 
                ? 'Anyhow being yours a Pick Up Order, give us a call! Your order might be ready the same day :)'
                : ''
            }
            <br><br>
            You can find all of your order details in your Profile!
            <br>
            <a href=https://dasalva.com.au/user/profile>
                <button>Go</button>
            </a>
            <br><br>  
            Here is your order: <br><br>
            Name: ${this.obj.name}<br>
            Email: ${this.obj.email}<br>
            ${this.obj.isPickUp ? 'Pick Up Location' : 'Shipping Address'}:<br>
            &nbsp;&nbsp;&nbsp;&nbsp;${this.obj.shipping.addressA}<br> 
            ${this.obj.shipping.addressB ? '&nbsp;&nbsp;&nbsp;&nbsp;' + this.obj.shipping.addressB + '<br>': ''}
            &nbsp;&nbsp;&nbsp;&nbsp;${this.obj.shipping.city}<br>
            &nbsp;&nbsp;&nbsp;&nbsp;${this.obj.shipping.postalCode}<br>
            &nbsp;&nbsp;&nbsp;&nbsp;${this.obj.shipping.state}<br>
            Products: ${this.obj.items}
            Total Paid: $${this.obj.totalPrice}
            <br><br><br>
            Thanks for supporting our business!
        `;
        const title = `Thanks! Payment confirmed for Order ${this.id}`;
        
        return {
            subject: `Thanks! Payment confirmed for Order ${this.id}`,
            body: customizeEmail(title, body, this.name), 
        }
    }
    paymentSuccessAlert()
    { 
        const body = `
            ${this.obj.isPickUp ? 'Pick Up' : 'Deliver'} Order Paid!
            <br><br>  
            Here is the order: <br><br>
            Name: ${this.obj.name}<br>
            Email: ${this.obj.email}<br>
            ${this.obj.isPickUp ? 'Pick Up Location' : 'Shipping Address'}:<br>
            &nbsp;&nbsp;&nbsp;&nbsp;${this.obj.shipping.addressA}<br> 
            ${this.obj.shipping.addressB ? '&nbsp;&nbsp;&nbsp;&nbsp;' + this.obj.shipping.addressB + '<br>': ''}
            &nbsp;&nbsp;&nbsp;&nbsp;${this.obj.shipping.city}<br>
            &nbsp;&nbsp;&nbsp;&nbsp;${this.obj.shipping.postalCode}<br>
            &nbsp;&nbsp;&nbsp;&nbsp;${this.obj.shipping.state}<br>
            Products: ${this.obj.items}
            Total Paid: $${this.obj.totalPrice}
        `;
        const title = `Payment confirmation for Order ${this.id}`;
        
        return {
            subject: `Payment confirmation for Order ${this.id}`,
            body: customizeEmail(title, body, this.name),  
        }
    }
    shipping()
    { 
        const body = `
            Happy to communicate that your pizza are ready to be delivered
            <br>
            We will possibly be at your place on
            <br> 
            <br>
            <b>${this.obj.day} between ${this.obj.time}.</b>
            <br> 
            <br>
            We will call on your mobile once there.
            <br>
            <br>
            <b>If the time does not suit you, please let us know replying at</b> 
            <a href="mailto:ciao@dasalva.com.au">ciao@dasalva.com.au</a>
            <br><br>
            Thanks for supporting our business!
            <br><br>
            <br><br>
            <b>Storage & Cooking Instructions</b>
            <br>
            Product can be stored for as long as 3 months if kept frozen, otherwise until the expiry date shown on the package
            <br>
            To cook the pizza you simply need to pre-heat you oven at 200 degree then place your pizza into the oven and cook for 5min circa or until crust become soft
            <br>
            We suggest to cook the pizza from frozen
        `;
        const title = `Order ${this.id} is ready to be delivered!`;
        
        return {
            subject: `Shipping Update Order ${this.id}`,
            body: customizeEmail(title, body, this.name),
        }
    }
    pickUp()
    { 
        const body = `
            Happy to communicate that your pizza are ready to be Picked Up
            <br>
            You can collect the pizza on
            <br> 
            <br> 
            <b>${this.obj.day} between ${this.obj.time}.</b>
            <br>
            <br>
            <br>
            Pick Up Location:<br>
            &nbsp;&nbsp;&nbsp;&nbsp;Da Mario<br> 
            &nbsp;&nbsp;&nbsp;&nbsp;36 Morley Avenue<br>
            &nbsp;&nbsp;&nbsp;&nbsp;Rosebery<br>
            &nbsp;&nbsp;&nbsp;&nbsp;2018<br>
            &nbsp;&nbsp;&nbsp;&nbsp;NSW<br>
            <br>
            <br>
            <b>If the time does not suit you, please let us know replying at</b> 
            <a href="mailto:ciao@dasalva.com.au">ciao@dasalva.com.au</a>
            <br><br>
            Thanks for supporting our business!
            <br><br>
            <br><br>
            <b>Storage & Cooking Instructions</b>
            <br>
            Product can be stored for as long as 3 months if kept frozen, otherwise until the expiry date shown on the package
            <br>
            To cook the pizza you simply need to pre-heat you oven at 200 degree then place your pizza into the oven and cook for 5min circa or until crust become soft
            <br>
            We suggest to cook the pizza from frozen
        `;
        const title = `Order ${this.id} is ready to Pick Up!`;
        
        return { 
            subject: `Pick Up Update Order ${this.id}`,
            body: customizeEmail(title, body, this.name),
        }
    }
    deliver()
    { 
        const body = `
            It's time to enjoy your pizza!<br> 
            Your order ${this.id} has just been ${this.obj.isPickUp ? 'picked up' : 'delivered'}<br><br>
            <b>Storage & Cooking Instructions</b><br>
            Product can be stored for as long as 3 months if kept frozen, otherwise until the expiry date shown on the package<br>
            To cook the pizza you simply need to pre-heat you oven at 200 degree then place your pizza into the oven and cook for 5min circa or until crust become soft<br>
            We suggest to cook the pizza from frozen
            <br><br>
            Thanks for supporting our business!
        `;
        const title = `Order ${this.id} just Delivered!`;
        
        return {
            subject: 'Enjoy your Pizza!',
            body: customizeEmail(title, body, this.name),
        }
    }
    review()
    { 
        const body = '';
        const title = `Thanks for your Feedback on the ${this.id}`;
        
        return {
            subject: ``,
            body: customizeEmail(title, body, this.name), 
        }
    }
    reviewAlert()
    { 
        const body = '';
        const title = `New Feedback on the ${this.id}`;
        
        return {
            subject: ``,
            body: customizeEmail(title, body, this.name), 
        }
    }
}