
import axios from 'axios';
import * as Yup from 'yup';
import { FormEvent, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { auth } from '../firebase/firebase.ts';
import { RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth';
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import toast from 'react-hot-toast';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

interface PersonalData {
    name: string;
    age: string;
    city: string;
    district: string;
    bloodGroup : string;
    role : string; 
    lastDonated: string;
}

interface AuthData {
    email: string;
    password: string;
    confirmPassword: string;
    phone: string;  
    terms: boolean;
}

interface FormErrors {
    [key: string]: string;
}



function Signup() {

    const [personalData, setPersonalData] = useState<PersonalData>({
        name: '',
        age: '',
        city: '',
        district: '',
        bloodGroup: '',
        role: '',
        lastDonated: ''
    });

    const [authData, setAuthData] = useState<AuthData>({
        email: '',
        password: '',
        confirmPassword: '',
        phone: '',
        terms: false   
    })

    const [step, setStep] = useState<number>(1);
    const [errors, setErrors] = useState<FormErrors>({});
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const navigate = useNavigate()


    // Personal data form validation schema using yup

    const personalValidationSchema = Yup.object().shape({
        name: Yup.string().required('Enter the name'),
        role: Yup.string().oneOf(['Donor', 'Recipient'], 'Invalid role').required('Select a role'),
        age: Yup.number ()
        .required('Enter the Age'),
        // // .when('role', {
        // //     is: 'donor',
        // //     then: Yup.number().min(18, 'Age must be at least 18 for donors'),
        //     otherwise: Yup.number().positive('Age must be positive')
        // }),
        city: Yup.string().required('Enter the City'),
        district: Yup.string().required('Select District'),
        bloodGroup: Yup.string().required('Select Blood Group'),
    });

    // Auth data form validation schema using yup

    const authValidationSchema = Yup.object().shape({
        email: Yup.string().email('Invalid email address').required('Enter email address'),
        password: Yup.string().min(4, 'Password must be at least 4 characters').required('Enter password'),
        confirmPassword: Yup.string()
            .oneOf([Yup.ref('password')], 'Passwords must match')
            .required('Confirm Password is required'),
        // phone: Yup.string().matches(/^\d{10}$/, 'Phone number must be exactly 10 digits').required('Enter Phone number')
    });

    const handlePersonalChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setPersonalData({ ...personalData, [name]: value });
    };

    const handleAuthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value,type, checked } = e.target;
        setAuthData({ ...authData,
            [name]: type === 'checkbox' ? checked : value
         });
    };

   


    const handlePersonalSubmit = async (e: FormEvent) => {
        e.preventDefault();
        try {
            await personalValidationSchema.validate(personalData, { abortEarly: false });
            //alert(JSON.stringify(formData, null, 2));
            setErrors({});
            setStep(2)
        }catch (err) {
            if (err instanceof Yup.ValidationError) {
                const validationErrors: FormErrors = {};
                err.inner.forEach((error) => {
                    if (error.path) {
                        validationErrors[error.path] = error.message;
                    }
                });
                setErrors(validationErrors);
            }
        }
    };


    const handleAuthSubmit = async (e: FormEvent) => {
        e.preventDefault();

        try {
            await authValidationSchema.validate(authData, { abortEarly: false });
            setErrors({});
            const response = await axios.post('/api/users/signup', {...personalData, ...authData});
            console.log(response.data)
            if(response.data.error){
                return toast.error(response.data.error);
            }
            await sendOtp(response.data._id);
        }catch (err) {
            if (err instanceof Yup.ValidationError) {
                const validationErrors: FormErrors = {};
                err.inner.forEach((error) => {
                    if (error.path) {
                        validationErrors[error.path] = error.message;
                    }
                });
                setErrors(validationErrors);
            }
        }
    };

    const sendOtp = async(id: string)=>{
        try {
            const recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha', {});
            const confirmationResult = await signInWithPhoneNumber(auth, "+"+ authData.phone, recaptchaVerifier);
              console.log(confirmationResult);

              if(confirmationResult){
                const otp: string = confirmationResult.verificationId;
                const response = await axios.post("/api/users/update_otp", {
                    otp: otp,
                    id: id
                })
                if(response){
                    navigate(`/otp_verify?userId=${id}`);
                }
              }
          } catch (error) {
            console.log('Error resending OTP:', error);
          }
    }


    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="container mx-auto">
                <div className="flex flex-col md:flex-row w-full max-w-4xl bg-white rounded-xl mx-auto shadow-lg overflow-hidden">
                    <div className="w-full md:w-1/2 py-10 px-12">
                        <h1 className="text-3xl mb-4 font-bold text-gray-800">
                            {step === 1 ? 'Register' : 'Create Account'}
                        </h1>
                        <p className="mb-4 text-gray-600">{step === 1 ? 'Enter personal details' : 'Enter account details'}</p>
                        <form onSubmit={step === 1 ? handlePersonalSubmit : handleAuthSubmit}>
                            {step === 1 ? (
                                <>
                                    <div className="mt-5">
                                        <label className="block font-semibold text-gray-700">Role</label>
                                        <select
                                            name="role"
                                            value={personalData.role}
                                            onChange={handlePersonalChange}
                                            className={`w-full border border-gray-300 py-2 px-4 rounded-lg focus:outline-none focus:border-blue-500 ${errors.role ? 'border-red-500' : ''}`}
                                        >
                                            <option value="">Select your role</option>
                                            <option value="Donor">Donor</option>
                                            <option value="Recipient">Recipient</option>
                                        </select>
                                        {errors.role && <div className="text-red-500 text-sm">{errors.role}</div>}
                                    </div>
                                    <div className="mt-5">
                                        <label className="block font-semibold text-gray-700">Name</label>
                                        <input
                                            type="text"
                                            name="name"
                                            value={personalData.name}
                                            onChange={handlePersonalChange}
                                            placeholder="Enter your name"
                                            className={`w-full border border-gray-300 py-2 px-4 rounded-lg focus:outline-none focus:border-blue-500 ${errors.name ? 'border-red-500' : ''}`}
                                        />
                                        {errors.name && <div className="text-red-500 text-sm">{errors.name}</div>}
                                    </div>
                                    <div className="mt-5">
                                        <label className="block font-semibold text-gray-700">Age</label>
                                        <input
                                            type="number"
                                            name="age"
                                            value={personalData.age}
                                            onChange={handlePersonalChange}
                                            placeholder="Age"
                                            className={`w-full border border-gray-300 py-2 px-4 rounded-lg focus:outline-none focus:border-blue-500 ${errors.age ? 'border-red-500' : ''}`}
                                        />
                                        {errors.age && <div className="text-red-500 text-sm">{errors.age}</div>}
                                    </div>
                                    <div className="mt-5">
                                        <label className="block font-semibold text-gray-700">Blood Group</label>
                                        <select
                                            name="bloodGroup"
                                            value={personalData.bloodGroup}
                                            onChange={handlePersonalChange}
                                            className={`w-full border border-gray-300 py-2 px-4 rounded-lg focus:outline-none focus:border-blue-500 ${errors.bloodGroup ? 'border-red-500' : ''}`}
                                        >
                                            <option value="">Select Blood Group</option>
                                            <option value="A+">A+</option>
                                            <option value="A-">A-</option>
                                            <option value="B+">B+</option>
                                            <option value="B-">B-</option>
                                            <option value="AB+">AB+</option>
                                            <option value="AB-">AB-</option>
                                            <option value="O+">O+</option>
                                            <option value="O-">O-</option>
                                        </select>
                                        {errors.bloodGroup && <div className="text-red-500 text-sm">{errors.bloodGroup}</div>}
                                    </div>
                                    <div className="mt-5">
                                        <label className="block font-semibold text-gray-700">City</label>
                                        <input
                                            type="text"
                                            name="city"
                                            value={personalData.city}
                                            onChange={handlePersonalChange}
                                            placeholder="City"
                                            className={`w-full border border-gray-300 py-2 px-4 rounded-lg focus:outline-none focus:border-blue-500 ${errors.city ? 'border-red-500' : ''}`}
                                        />
                                        {errors.city && <div className="text-red-500 text-sm">{errors.city}</div>}
                                    </div>
                                    <div className="mt-5">
                                        <label className="block font-semibold text-gray-700">District</label>
                                        <select
                                            name="district"
                                            value={personalData.district}
                                            onChange={handlePersonalChange}
                                            className={`w-full border border-gray-300 py-2 px-4 rounded-lg focus:outline-none focus:border-blue-500 ${errors.district ? 'border-red-500' : ''}`}
                                        >
                                            <option value="">Select District</option>
                                            <option value="Thiruvananthapuram">Thiruvananthapuram</option>
                                            <option value="Kollam">Kollam</option>
                                            <option value="Pathanamthitta">Pathanamthitta</option>
                                            <option value="Alappuzha">Alappuzha</option>
                                            <option value="Kottayam">Kottayam</option>
                                            <option value="Idukki">Idukki</option>
                                            <option value="Ernakulam">Ernakulam</option>
                                            <option value="Thrissur">Thrissur</option>
                                            <option value="Palakkad">Palakkad</option>
                                            <option value="Malappuram">Malappuram</option>
                                            <option value="Kozhikode">Kozhikode</option>
                                            <option value="Wayanad">Wayanad</option>
                                            <option value="Kannur">Kannur</option>
                                            <option value="Kasargod">Kasargod</option>
                                        </select>
                                        {errors.district && <div className="text-red-500 text-sm">{errors.district}</div>}
                                    </div>
                                    <div className="mt-5">
                                <label className="block font-semibold text-gray-700">Last Donated</label>
                                <input
                                    type="date"
                                    name="lastDonated"
                                    value={personalData.lastDonated}
                                    onChange={handlePersonalChange}
                                    placeholder="Last Donated"
                                    className={`w-full border border-gray-300 py-2 px-4 rounded-lg focus:outline-none focus:border-blue-500 ${errors.lastDonated ? 'border-red-500' : ''}`}
                                />
                                {errors.lastDonated && <div className="text-red-500 text-sm">{errors.lastDonated}</div>}
                            </div>

                                </>
                            ) : (
                                <>
                                    <div className="mt-5">
                                        <label className="block font-semibold text-gray-700">Email Address</label>
                                        <input
                                            type="email"
                                            name="email"
                                            value={authData.email}
                                            onChange={handleAuthChange}
                                            placeholder="Email"
                                            className={`w-full border border-gray-300 py-2 px-4 rounded-lg focus:outline-none focus:border-blue-500 ${errors.email ? 'border-red-500' : ''}`}
                                        />
                                        {errors.email && <div className="text-red-500 text-sm">{errors.email}</div>}
                                    </div>
                                    <div className="mt-5">
                                        <label className="block font-semibold text-gray-700">Phone Number</label>
                                        <PhoneInput
                                            country={'in'}
                                            value={authData.phone}
                                            onChange={(phone) => setAuthData({ ...authData, phone })}
                                            placeholder="Phone Number"
                                            containerClass="w-full"
                                            inputClass={`w-full border border-gray-300 py-2 px-4 rounded-lg focus:outline-none focus:border-blue-500 ${errors.phone ? 'border-red-500' : ''}`}
                                        />
                                        {errors.phone && <div className="text-red-500 text-sm">{errors.phone}</div>}
                                    </div>
                                    <div className="mt-5">
                                        <label className="block font-semibold text-gray-700">Password</label>
                                        <div className="relative">
                                            <input
                                                type={showPassword ? 'text' : 'password'}
                                                name="password"
                                                value={authData.password}
                                                onChange={handleAuthChange}
                                                placeholder="Password"
                                                className={`w-full border border-gray-300 py-2 px-4 rounded-lg focus:outline-none focus:border-blue-500 ${errors.password ? 'border-red-500' : ''}`}
                                            />
                                            <div
                                                className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5 cursor-pointer"
                                                onClick={() => setShowPassword(!showPassword)}
                                            >
                                                {showPassword ? <FaEyeSlash /> : <FaEye />}
                                            </div>
                                        </div>
                                        {errors.password && <div className="text-red-500 text-sm">{errors.password}</div>}
                                    </div>
                                    <div className="mt-5">
                                        <label className="block font-semibold text-gray-700">Confirm Password</label>
                                        <div className="relative">
                                            <input
                                                type={showConfirmPassword ? 'text' : 'password'}
                                                name="confirmPassword"
                                                value={authData.confirmPassword}
                                                onChange={handleAuthChange}
                                                placeholder="Confirm Password"
                                                className={`w-full border border-gray-300 py-2 px-4 rounded-lg focus:outline-none focus:border-blue-500 ${errors.confirmPassword ? 'border-red-500' : ''}`}
                                            />
                                            <div
                                                className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5 cursor-pointer"
                                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                            >
                                                {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                                            </div>
                                        </div>
                                        {errors.confirmPassword && (
                                            <div className="text-red-500 text-sm">{errors.confirmPassword}</div>
                                        )}
                                    </div>
                                    <div className="mt-5 flex items-center">
                                        <input
                                            type="checkbox"
                                            name="terms"
                                            checked={authData.terms}
                                            onChange={(e) => setAuthData({ ...authData, terms: e.target.checked })}
                                            className="mr-2"
                                        />
                                        <label className="text-gray-600">I agree to the terms & policy</label>
                                    </div>
                                    {errors.terms && <div className="text-red-500 text-sm">{errors.terms}</div>}
                                </>
                            )}
                            <button type="submit" className="w-full mt-6 bg-gradient-to-r from-red-700 via-red-600 to-red-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-200">
                                {step === 1 ? 'Next' : 'Sign Up'}
                            </button>
                            <div id="recaptcha"></div>
                        </form>
                        <p className="mt-6 text-gray-600">
                            Already have an account? <Link to="/login" className="text-blue-500 hover:underline">Sign in</Link>
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

export default Signup;
