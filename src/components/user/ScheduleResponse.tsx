import React from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-hot-toast';

const ScheduleResponse: React.FC = () => {
  const { userId, action } = useParams<{ userId: string; action: 'accept' | 'reject' }>();
  const navigate = useNavigate();
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const don = query.get('don')
  const rec = query.get('rec')
  const date = query.get('date')


 
  React.useEffect(() => {
    const handleResponse = async () => {
      try {
        if (!userId || !action) {
          toast.error('Invalid URL parameters.');
          return;
        }

        const response = await axios.get(`/api/schedule/${userId}/${action}`);

        if (response.data.success) {
          if (action === 'accept') {
            toast.success('Schedule accepted successfully!');
            navigate('/thank-you');
          } else if (action === 'reject') {
            toast.error('Schedule rejected.');
            navigate('/rejection-info');
          }
        } else {
          toast.error('Failed to process your request.');
        }
      } catch (error) {
        console.error('Error handling schedule response:', error);
        toast.error('An error occurred. Please try again.');
      }
    };

    handleResponse();
  }, [userId, action, navigate]);

  const handleResponse = async(action: string)=>{
     if(action === "accept"){
      try {
        const res = await axios.post("/api/users/schedule-response", {
          donerId: don,
          recieverId: rec,
          action: action,
          date: date
        })
  
console.log("accepting")
console.log(res.data)

        if(res.data.success){
          toast.success("Thank you for accepting the request..");
          navigate(`/schedule-response?action=${action}`, { replace: true })
        }
      } catch (error) {
        console.log(error)
      }
     }else{
      navigate(`/schedule-response?action=${action}`, {replace: true})
     }
  }

 

  return (
    <div className="flex flex-col justify-center items-center h-screen bg-gray-50 p-4">
      <h1 className="text-2xl font-bold text-gray-800 mb-4">Waiting for Your Response...</h1>
      <p className="text-lg text-gray-600 mb-8">Please give a response.</p>
      <div className="flex flex-col gap-4">
        <button
          className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition duration-200"
          onClick={()=> handleResponse ('accept')}
        >
          Accept
        </button>
        <button
          className="px-6 py-3 bg-red-600 text-white font-semibold rounded-lg shadow-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 transition duration-200"
          onClick={()=> handleResponse ("reject")}
        >
          Reject
        </button>
      </div>
    </div>
  );
};

export default ScheduleResponse;
