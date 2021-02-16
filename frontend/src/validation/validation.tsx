import * as yup from 'yup'


export const registerSchema = yup.object().shape({
  firstName: yup.string().trim().required('Name is Required!'),
  lastName: yup.string().trim().required('Last Name is Required!'),
  email: yup.string()
    .matches((/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/), 'Not correct email!')
    .email('Not correct email!').trim().lowercase().required('Email is Required!'),
  password: yup.string().required('Password is Required!').min(5, 'Password length min 5 chars!').matches(/\d/, 'Password must contains a number!'),
  passwordRepeat: yup.string().required('Confirm passwords is required!').oneOf([yup.ref('password'), null], 'Passwords does not match'),
})

export const loginSchema = yup.object().shape({
  email: yup.string()
    .matches((/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/), 'Not correct email!')
    .email('Not correct email!').trim().lowercase().required('Email is Required!'),
  password: yup.string().required('Password is Required!').min(5, 'Password length min 5 chars!')
})

export const resetSchema = yup.object().shape({
  password: yup.string().required('Password is Required!').min(5, 'Password length min 5 chars!').matches(/\d/, 'Password must contains a number!'),
  passwordRepeat: yup.string().required('Confirm passwords is required!').oneOf([yup.ref('password'), null], 'Passwords does not match'),
})

export const forgotPasswordSchema = yup.object().shape({
  email: yup.string()
    .matches((/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/), 'Not correct email!')
    .email('Not correct email!').trim().lowercase().required('Email is Required!'),
})