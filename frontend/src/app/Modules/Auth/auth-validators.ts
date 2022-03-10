import { FormControl } from "@angular/forms";

const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const passwordRegex = /^(?=.*[0-9])^(?=.*[a-zA-Z])[a-z0-9A-Z!@#$%^&*]{8,20}$/;
export function validatePostalCode(c: FormControl)
{
  const num: string = c.value;

  if(
      num.length === 4 
      && parseInt(num) < 2235 
      && parseInt(num) > 1999
    )
    return null

  return { validatePostalCode: { valid: false } };
};

export function emailValidator(c: FormControl)
{
  if(c.pristine)
    return null

  const email: string = c.value;
  
  if(
      emailRegex.test(email.toLowerCase()) 
      || c.pristine
    )
    return null

  return { validateEmail: { valid: false } };
};

export function passwordValidator(c: FormControl)
{
  if(c.pristine)
    return null

  const password: string = c.value;
    
  if(
      passwordRegex.test(password)
      || c.pristine
    )
    return null

  return { validatePassword: { valid: false } };
};

export function telephoneValidator(c: FormControl)
{
  if(c.pristine)
    return null

  const telephone: string = c.value;

  for(const n of telephone)
  {
    if(n === '+' && (telephone.lastIndexOf(n) === 0))
      continue
    if(isNaN(parseInt(n)))
      return { validateTelephone: { valid: false } };
  }

  return null;
};

export function signinPasswordValidator(password: string)
{
  if(passwordRegex.test(password))
    return true

  return false;
};
  
      