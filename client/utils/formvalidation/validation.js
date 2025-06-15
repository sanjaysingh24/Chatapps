import * as yup from 'yup';
export const loginValidation = yup.object({
  email: yup.string().required("email is required."),
  password: yup.string().required("Password is required.")
  

});
export const registerValidation = yup.object({
  username: yup.string().required("Username is required."),
  email: yup.string().email("Invalid email format").required("Email is required."),
  password: yup.string().min(6, "Password must be at least 6 characters").required("Password is required.")
});
