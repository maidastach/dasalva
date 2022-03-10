import config from "./config";
import jwt from 'jsonwebtoken';

const emailRegex = ******;
const passwordRegex = ******;
const sanitizeRegex = ******

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
