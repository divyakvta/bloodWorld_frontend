
import axios from 'axios';
import { useEffect } from 'react';
import toast from 'react-hot-toast';
import { useLocation } from 'react-router-dom';

const Response: React.FC = () => {

  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const action = query.get('action');
  const don = query.get('don')
  const rec = query.get('rec')
  const date = query.get('date')

  console.log(action, don, rec, date)

  useEffect(()=>{
    const handleResponse = async(action: string | null)=>{
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
         }
       } catch (error) {
         console.log(error)
       }
      }else{
       toast("thank you for your response..")
      }
   }

   handleResponse(action)
  },[])

  return (
    <div className="flex flex-col justify-center items-center h-screen bg-gray-100 p-6">
      <div className="max-w-md w-full bg-white shadow-lg rounded-lg p-6 text-center">
        {action ? (
          <>
            <h1 className="text-3xl font-bold text-green-600 mb-4">Thank You!</h1>
            <p className="text-lg text-gray-700">Your acceptance has been received and processed. We appreciate your response.</p>
          </>
        ) : (
          <>
            <h1 className="text-3xl font-bold text-blue-600 mb-4">Thank You!</h1>
            <p className="text-lg text-gray-700">We have received your response.</p>
          </>
        )}
      </div>
    </div>
  );
};

export default Response;
