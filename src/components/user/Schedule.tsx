import axios from 'axios';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Header from './header/Header';



const Schedule: React.FC = () => {
    const [date, setDate] = useState('');
    const [requestType, setRequestType] = useState<'normal' | 'urgent'>('normal');
    const navigate = useNavigate();
    const { userId } = useParams<{ userId: string }>();
   

    const handleSubmit = async () => {
        try {
            const response = await axios.post('/api/users/send_message', {
                userId,
                date,
                requestType
            });

            if (response.data.success) {
                toast.success('Message sent successfully!');
                navigate('/search_donor');
            } else {
                toast.error('Failed to send the message');
            }
        } catch (error) {
            console.log('Error scheduling donation', error);
        }
    };

    return (
        <>
        <Header />
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="max-w-md mx-auto bg-white shadow-lg rounded-lg p-6">
            <h2 className="text-2xl font-semibold text-center mb-4">Schedule Donation</h2>
            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">Select Date</label>
                <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
            </div>
            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">Request Type</label>
                <select
                    value={requestType}
                    onChange={(e) => setRequestType(e.target.value as 'normal' | 'urgent')}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                    <option value="normal">Normal</option>
                    <option value="urgent">Urgent</option>
                </select>
            </div>
            <button
                onClick={handleSubmit}
                className="w-full bg-gradient-to-r from-red-700 via-red-600 to-red-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
            >
                Submit
            </button>
        </div>
    </div>
        </>
        
    
    );
};

export default Schedule;
