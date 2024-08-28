
import { useLocation } from 'react-router-dom';

const Response: React.FC = () => {

  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const action = query.get('action');


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
