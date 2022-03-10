import config from "./config";
import jwt from 'jsonwebtoken';

const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const passwordRegex = /^(?=.*[0-9])^(?=.*[a-zA-Z])[a-z0-9A-Z!@#$%^&*]{8,20}$/;
const sanitizeRegex = /[<>&`'"\{\}\(\[\)\]]/;

export const generateToken = user => jwt.sign({ user }, config.JWT_SECRET)
//export const decodeToken = token => jwt.verify(token, config.JWT_SECRET, (err, decoded) => decoded)

export const errorHandler = (err, req, res, next) => 
{
  const status = err.name && err.message === 'ValidationError' ? 400 : 500;
  res.status(status).send({ message: err.message })
}

export const isValid = (value, checker) => checker(value);

export const validateEmail = mail => emailRegex.test(mail);

export const pswSafe = psw => passwordRegex.test(psw);

export const sanitize = value => !(sanitizeRegex.test(value));

export const validatePostalCode = postcode => (
  postcode.length === 4 
  && parseInt(postcode) < 2235 
  && parseInt(postcode) > 1999
)

export function telephoneValidator(number)
{
  for(const n of number)
  {
    if(n === '+' && (number.lastIndexOf(n) === 0))
      continue
    if(isNaN(parseInt(n)))
      return false;
  }

  return true;
};


// export const emailFunction = (title, bodyA, bodyB) => {
//   return `
//   <!DOCTYPE html>
//       <html lang="en">
//           <head>
//               <meta charset="UTF-8">
//               <meta http-equiv="X-UA-Compatible" content="IE=edge">
//               <meta name="viewport" content="width=device-width, initial-scale=1.0">
//               <title>${title}</title>
//               <style>
//                   * {
//                     box-sizing: border-box;
//                   }
//                   body {
//                       font-family: 'Oxygen', sans-serif, Arial, Helvetica;
//                       width: 90% !important;
//                       margin: auto;
//                   }
//                   table {
//                       width: 100%;
//                   }
//                   .logo {
//                       background-image: url(https://www.dasalva.com.au/image/logo.png) !important;
//                       width: 20vmax !important;
//                       height: 20vmax !important;
//                       background-size: contain;
//                       background-position: center;
//                       background-repeat: no-repeat;
//                   }
//                   h1 {
//                       font-size: 2vmax;
//                   }
//                   .footer {
//                       background-image: url(https://www.dasalva.com.au/image/written.png) !important;
//                       width: 10vmax !important;
//                       height: 7vmax !important;
//                       background-size: contain;
//                       background-position: center;
//                       background-repeat: no-repeat;
//                       margin-left: auto;
//                   }
//               </style>
//           </head>
//           <body>
//               <table>
//                     <tr>

//                         <td>
//                             <a href="www.dasalva.com.au"><div class="logo"> </div></a>
//                             <h1 style="text-align: center;margin: 0!important;">${title}</h1>
//                         </td>
                    
//                     </tr>
//                     <tr >
//                         <td >
//                             <p style="margin: 2rem 0 !important;">${bodyA}
//                             </p>
//                             <br>
//                             <br>
//                             <p style="margin: 2rem 0 !important;"> 
//                                 ${bodyB}
//                             </p>
//                         </td>
//                     </tr>
//                     <tr>
//                         <td>
//                         <a href="www.dasalva.com.au"><div class="footer"></div></a>
//                         </td>
                        
//                     </tr>   
//               </table>
//           </body>
//       </html>
// `;
// }

// export const protector = (req, res, next) =>
// {
//   const isPost = req.method === 'POST';
//   if(isPost)
//   {
//     if(Array.isArray(req.body))
//     {
//       for(const object of req.body)
//         for(const property in object)
//           if(object[property].toString().includes('<'))
//             res.sendStatus(500)
//     }
//     else
//       for(const property in req.body)
//         if(req.body[property].includes('<'))
//           res.sendStatus(500)    
//   }
//   next()
// }