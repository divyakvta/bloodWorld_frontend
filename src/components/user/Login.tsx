import { Link } from 'react-router-dom';
import { useForm } from "../../hooks/useForm"; 
import  toast from 'react-hot-toast';
import { useEffect } from 'react';


function Login() {
  const { formData, errors, handleChange, handleSubmit, loginError } = useForm();


  useEffect(()=>{
    if(loginError === 'Invalid credentials'){
      toast.error(loginError);
    }
  },[loginError])
  

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row w-full max-w-4xl bg-white rounded-xl mx-auto shadow-lg overflow-hidden">
          <div className="w-full md:w-1/2 py-10 px-12">
            <h1 className="text-3xl mb-4 font-bold text-gray-800">Log In</h1>
            <p className="mb-4 text-gray-600">Log In with your credentials</p>
            <form onSubmit={handleSubmit}>
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
              <div className="mt-5 flex items-center">
                <input
                  type="checkbox"
                  name="terms"
                  checked={formData.terms}
                  onChange={handleChange}
                  className="mr-2"
                />
                <label className="text-gray-600">I agree to the terms & policy</label>
              </div>
              {errors.terms && <div className="text-red-500 text-sm">{errors.terms}</div>}

              <button type="submit" className="w-full mt-6 bg-gradient-to-r from-red-700 via-red-600 to-red-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-200">Log In</button>
            </form>
            <p className="mt-6 text-gray-600">
              Don't Have an Account? <Link to="/register" className="text-blue-500 hover:underline">Register</Link>
            </p>
          </div>
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
}

export default Login;
