import * as Yup from 'yup';

export const loginValidationSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email address').required('The field is empty'),
  password: Yup.string().min(4, 'Must be 4 characters or more').required('The field is empty'),
  terms: Yup.boolean().oneOf([true], 'You must accept the terms and conditions'),
});
