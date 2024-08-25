import { signInWithPhoneNumber } from 'firebase/auth';
import { RecaptchaVerifier } from 'firebase/auth';
import React, { useState, useEffect, ChangeEvent } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { auth } from '../../firebase/firebase';
import { PhoneAuthProvider, signInWithCredential } from 'firebase/auth';
import axios from 'axios';
import { toast } from  'react-hot-toast';


const OtpVerification: React.FC = () => {
  const [otp, setOtp] = useState<string[]>(new Array(6).fill(""));
  const [seconds, setSeconds] = useState(30);
  const [userData, setUserData] = useState<any>({});
  const params = useParams<{ ph: string  } >();
  const navigate = useNavigate();
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const userId = query.get("userId");

  useEffect(() => {
    if (seconds > 0) {
      const timer = setTimeout(() => setSeconds(seconds - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [seconds]);

  useEffect(() => {
    const fetchUser = async () => {
      if (userId) {
        try {
          const res = await fetch(`/api/users/get_user/${userId}`);
          if (res.ok) {
            const data = await res.json();
            setUserData(data);
      } else {
          console.log('Error fetching user data:', res.status);
        }
      } catch (error) {
        console.log('Error fetching user data:', error);
      }
    }else {
      console.log (' User Id is missing')
    }
    };
    fetchUser();
  }, [userId, params.ph]);

  

  const handleChange = (element: HTMLInputElement, index: number) => {
    if (isNaN(Number(element.value))) return;

    const newOtp = [...otp];
    newOtp[index] = element.value;
    setOtp(newOtp);

    if (element.nextSibling && element.value !== "") {
      (element.nextSibling as HTMLInputElement).focus();
    }
  };

  //Resend OTP

  const handleResendOtp = async () => {
    if(userData._id) {
      setSeconds(60);
      sendOtp(userData._id);
    }else {
      console.log('User data is not available.')
    }  

  };

 // Sending OTP

  const sendOtp = async(id: string)=>{
    
    try {
        const recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha', {});
        const confirmationResult = await signInWithPhoneNumber(auth, "+"+ userData.phone, recaptchaVerifier);
          console.log(confirmationResult);

          if(confirmationResult){
            const otp: string = confirmationResult.verificationId;
            const response = await axios.post("/api/users/update_otp", {
                otp: otp,
                id: id           })
            if(response){
                navigate(`/otp_verify?userId=${id}`);
            }
          }

         

   
      } catch (error) {
        console.log('Error resending OTP:', error);
      }
}


// Otp varification

  const handleVerifyOtp = async () => {
    const enteredOtp = otp.join('');
    const verificationId = userData.otp;

    if (!verificationId) {
      console.log('Verification ID is missing.');
      return;
    }

    try {
      const credential = PhoneAuthProvider.credential(verificationId, enteredOtp);
      const verifyResult = await signInWithCredential(auth, credential);
      console.log('Verification result:', verifyResult);

   
    // OTP verification 

    const res = await axios.get(`/api/users/verify_user/${userData._id}`);
    

    console.log(res.data)

    if(res.data.verified){
      toast.success('User sucessfully verified..');
      navigate('/login');
    }
    } catch (error: any) {
      if (error.code === 'auth/code-expired') {
        toast.error('The OTP has expired. Please request a new one.');
      } else if (error.code === 'auth/invalid-verification-code') {
       toast.error('The OTP entered is invalid. Please try again.');
      } else {
        alert('Error verifying OTP. Please try again.');
      }
      console.log('Error verifying OTP:', error);
    }
  };

  
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-200 p-4">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-sm w-full">
        <div className="flex justify-center mb-6">
          <img src="https://plugins.miniorange.com/wp-content/uploads/2023/07/magento1-otp-verification-banner.webp" alt="OTP Icon" className="w-50 h-60 object-cover" />
        </div>
        <h2 className="text-center text-lg font-semibold mb-4">Enter the OTP sent to your mobile</h2>
        <div className="flex justify-center mb-4 space-x-2">
          {otp.map((data, index) => (
            <input
              key={index}
              type="text"
              name="otp"
              maxLength={1}
              className="w-12 h-12 text-center text-lg border border-gray-300 rounded-md focus:ring-2 focus:ring-sky-500 focus:border-transparent"
              value={data}
              onChange={(e: ChangeEvent<HTMLInputElement>) => handleChange(e.target, index)}
              onFocus={(e) => e.target.select()}
            />
          ))}
        </div>
        <button onClick={handleVerifyOtp} className="w-full py-2 bg-red-500 text-white font-semibold rounded-md hover:bg-red-600 transition duration-300">Verify</button>
        <div className="mt-4 flex justify-center">
          <button disabled={seconds !== 0} onClick={handleResendOtp} className="text-red-500 underline">{seconds === 0 ? 'Resend OTP' : `Resend OTP in ${seconds} seconds`}</button>
        </div>
      <div className="" id='recaptcha'></div>
      </div>
    </div>
  );
};

export default OtpVerification;
