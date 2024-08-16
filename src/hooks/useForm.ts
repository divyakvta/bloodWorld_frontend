import { useEffect, useState } from 'react';
import * as Yup from 'yup';
import { loginValidationSchema } from '../utils/validationSchema'; 
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { signInSuccess } from '../redux/userSlice';
import toast from 'react-hot-toast';


interface FormData {
  email: string;
  password: string;
  terms: boolean;
}

interface FormErrors {
  [key: string]: string;
}

export function useForm() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state: any)=> state.user)

  const [formData, setFormData] = useState<FormData>({
    email: '',
    password: '',
    terms: false,
  });
  const [loginError, setLoginError] = useState<string>('')

  useEffect(()=>{
  if(currentUser){
    navigate('/');
  }
  },[])

  const [errors, setErrors] = useState<FormErrors>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type, checked } = e.target as HTMLInputElement;

    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await loginValidationSchema.validate(formData, { abortEarly: false });
      setErrors({});
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        const validationErrors: FormErrors = err.inner.reduce((acc, error) => {
          if (typeof error.path === 'string') {
            acc[error.path] = error.message;
          }
          return acc;
        }, {} as FormErrors);
        setErrors(validationErrors);
      } else {
        console.error('Unexpected error:', err);
      }
    }

    try {
      const res = await axios.post('/api/users/login', {
       email: formData.email,
       password: formData.password
      })
      console.log(res.data)
      if(res.data.message === 'Invalid credentials'){
     return  setLoginError(res.data.message)
      }
       
        dispatch(signInSuccess(res.data.userData));
      navigate('/');
      
    } catch (error) {
      console.log(error)
    }alert

  };

  return {
    formData,
    errors,
    handleChange,
    handleSubmit,
    loginError
  };
}
