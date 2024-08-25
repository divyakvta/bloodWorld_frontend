import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import axios from 'axios';
import * as Yup from 'yup';

// Validation schema for form data
const loginValidationSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email address').required('Email is required'),
  password: Yup.string().required('Password is required')
});

// TypeScript interfaces for form data and form errors
interface FormData {
  email: string;
  password: string;
}

interface FormErrors {
  email?: string;
  password?: string;
}

function AdminLogin() {
  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const [errors, setErrors] = useState<FormErrors>({});
  const [accessToken, setAccessToken] = useState<string | null>(null); // Store access token

  // Handle input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      // Validate form data using Yup
      await loginValidationSchema.validate(formData, { abortEarly: false });
      setErrors({}); // Clear errors if validation passes

      // Proceed with API call
      const response = await axios.post('/api/admin/login', formData);
      if (response.data && response.data.accessToken) {
        setAccessToken(response.data.accessToken); // Store access token in state
        toast.success('Logged in successfully!');
        navigate('/admin_dash'); // Redirect to admin page
      }
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        const validationErrors: FormErrors = err.inner.reduce((acc: any, error: any) => {
          if (typeof error.path === 'string') {
            acc[error.path] = error.message;
          }
          return acc;
        }, {} as FormErrors);
        setErrors(validationErrors);
      } else {
        console.error('Unexpected error:', err);
        toast.error('An unexpected error occurred.');
      }
    }
  };

  // Function to refresh access token using refresh token
  const refreshAccessToken = async () => {
    try {
      const response = await axios.post('/api/admin/refresh-token');
      setAccessToken(response.data.accessToken);
    } catch (error) {
      console.error('Failed to refresh token', error);
      toast.error('Session expired, please log in again.');
      navigate('/login');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row w-full max-w-4xl bg-white rounded-xl mx-auto shadow-lg overflow-hidden">
          {/* Form Section */}
          <div className="w-full md:w-1/2 py-10 px-12">
            <h1 className="text-3xl mb-4 font-bold text-gray-800">Admin Log In</h1>
            <p className="mb-4 text-gray-600">Log In with your credentials</p>
            <form onSubmit={handleSubmit}>
              {/* Email Field */}
              <div className="mt-5">
                <label className="block font-semibold text-gray-700">Email Address</label>
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full border border-gray-300 py-2 px-4 rounded-lg focus:outline-none focus:border-blue-500 ${errors.email ? 'border-red-500' : ''}`}
                />
                {errors.email && <div className="text-red-500 text-sm">{errors.email}</div>}
              </div>

              {/* Password Field */}
              <div className="mt-5">
                <label className="block font-semibold text-gray-700">Password</label>
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleChange}
                  className={`w-full border border-gray-300 py-2 px-4 rounded-lg focus:outline-none focus:border-blue-500 ${errors.password ? 'border-red-500' : ''}`}
                />
                {errors.password && <div className="text-red-500 text-sm">{errors.password}</div>}
              </div>

              <button type="submit" className="w-full mt-6 bg-gradient-to-r from-red-700 via-red-600 to-red-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-200">
                Log In
              </button>
            </form>
          </div>

          {/* Image Section */}
          <div
            className="hidden md:block w-1/2"
            style={{
              backgroundImage: "url('/src/assets/signup-bg.jpg')",
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat'
            }}
          >
            <div className="h-full flex items-center justify-center">
              <h1 className="text-4xl text-white font-bold">Welcome</h1>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
