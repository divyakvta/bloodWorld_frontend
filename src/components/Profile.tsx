import axios from 'axios';
import { useEffect, useState } from 'react';
import { FaUser } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface UserData {
    name: string;
    age: number;
    bloodGroup: string;
    email: string;
    phone: string;
    city: string;
    district: string;
    isActive: boolean;
    lastDonated: string;
}

function Profile() {
    const { currentUser } = useSelector((state: any) => state.user);
    const [userData, setUserData] = useState<UserData | null>(null);
    const [activateUser, setActivateUser] = useState(true);


    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await axios.get(`/api/users/get_user/${currentUser._id}`);
                setUserData(response.data);
                setActivateUser(response.data.isActive);
            } catch (error) {
                console.error('Error fetching userData', error);
            }
        };
        fetchUserData();
    }, [currentUser._id]);


//Activate/deactivate account

    const handleUpdateStatus = async (toggle: boolean, checkLastDonation: boolean) => {
        try {
            const response = await axios.post(`/api/users/update_status/${currentUser._id}`, { toggle, checkLastDonation });
            console.log(response.data);
            setUserData((prevData) => prevData ? { ...prevData, status: response.data.status } : null);
    
            if (response.data.status === true) {
                setActivateUser(true)
                toast.success('Account activated successfully!');
            } else {
                setActivateUser(false)
                toast.error('Account deactivated successfully!');
            }
        } catch (error) {
            console.error('Error updating status', error);
            toast.error('Failed to update account status.');
        }
    };
    

    return (
        <div className='container mx-auto  min-h-screen p-8 my-8 flex flex-col justify-center items-center bg-gray-100'>
            <ToastContainer />
            {/* Profile Header */}
            <div className='container w-1/2 mx-auto my-10 p-8 bg-white shadow-lg rounded-xl'>
                <div className='flex items-center gap-6'>
                    <div className='h-24 w-24 bg-gray-300 rounded-full flex items-center justify-center'>
                        <FaUser className='text-6xl text-gray-500' />
                    </div>
                    <div>
                        <h1 className='text-2xl font-bold text-gray-600'>{userData ? userData.name : 'Loading...'}</h1>
                    </div>
                    <div className='ml-auto flex flex-col space-y-4'>
                        <a href='/editProfile'>
                            <button className='w-60 py-2 px-4 bg-gradient-to-r from-red-700 via-red-600 to-red-500 text-white rounded-md shadow hover:bg-red-700'>
                                Edit Profile
                            </button>
                        </a>
                        {activateUser ? (
                            <button
                                onClick={() => handleUpdateStatus(true, false)}
                                className="w-60 py-2 px-4 bg-gradient-to-r from-red-700 via-red-600 to-red-500 text-white rounded-md shadow hover:bg-red-600"
                            >
                                Deactivate Account
                            </button>
                        ) : (
                            <button
                                onClick={() => handleUpdateStatus(true, false)}
                                className="w-full py-2 px-4 bg-gradient-to-r from-red-700 via-red-600 to-red-500 text-white rounded-md shadow hover:bg-green-600"
                            >
                                Activate Account
                            </button>
                        )}
                    </div>

                </div>
            </div>

            {/* User Details */}
            <div className='container  w-1/2 flex flex-col justify-center my-8 p-6 bg-white shadow-lg rounded-xl'>

            <div className='flex flex-col justify-center space-y-4 w-full'>
    <h2 className='text-xl font-semibold text-gray-700 mb-6 text-center'>About</h2>
    {userData ? (
        <>
            <div className='flex justify-center'>
                <div className='w-2/4 text-right font-semibold text-gray-800 pr-8'>Full Name:</div>
                <div className='w-2/4 text-left text-gray-600 pl-8'>{userData.name}</div>
            </div>
            <div className='flex justify-center items-center'>
                <div className='w-2/4 text-right font-semibold text-gray-800 pr-8'>Age:</div>
                <div className='w-2/4 text-left text-gray-600 pl-8'>{userData.age}</div>
            </div>
            <div className='flex justify-center items-center'>
                <div className='w-2/4 text-right font-semibold text-gray-800 pr-8'>Phone Number:</div>
                <div className='w-2/4 text-left text-gray-600 pl-8'>{userData.phone}</div>
            </div>
            <div className='flex justify-center items-center'>
                <div className='w-2/4 text-right font-semibold text-gray-800 pr-8'>Blood Group:</div>
                <div className='w-2/4 text-left text-gray-600 pl-8'>{userData.bloodGroup}</div>
            </div>
            <div className='flex justify-center'>
                <div className='w-2/4 text-right font-semibold text-gray-800 pr-8'>City:</div>
                <div className='w-2/4 text-left text-gray-600 pl-8'>{userData.city}</div>
            </div>
            <div className='flex justify-center items-center'>
                <div className='w-2/4 text-right font-semibold text-gray-800 pr-8'>District:</div>
                <div className='w-2/4 text-left text-gray-600 pl-8'>{userData.district}</div>
            </div>
            <div className='flex justify-center items-center'>
                <div className='w-2/4 text-right font-semibold text-gray-800 pr-8'>Last Donated Date:</div>
                <div className='w-2/4 text-left text-gray-600 pl-8'>{userData.lastDonated}</div>
            </div>
            <div className='flex justify-center items-center'>
                <div className='w-2/4 text-right font-semibold text-gray-800 pr-8'>Status:</div>
                <div className='w-2/4 text-left text-gray-600 pl-8'>{activateUser ? 'Active' : 'Inactive'}</div>
            </div>
        </>
    ) : (
        <p className='text-gray-600 text-center'>Loading User Data...</p>
    )}
</div>
            </div>
        </div>
    );
}

export default Profile;
