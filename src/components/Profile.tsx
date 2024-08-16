import { FaUser } from 'react-icons/fa';

const ProfilePage = () => (
    <div className='container mx-auto px-10 py-10 bg-slate-100 flex items-center'>
        <div className='flex-1 flex items-center space-x-4 bg-white'>
            <div className='flex items-center space-x-4'>
                <FaUser className='text-6xl' />
                <h1 className='text-3xl font-bold'>Neerav</h1>
            </div>
        </div>
        <div className='flex flex-col items-end space-y-4'>
            <button className='w-60 bg-gradient-to-r from-red-700 via-red-600 to-red-500 text-white rounded-lg py-2 px-4'>
                Edit Profile
            </button>
            <button className='w-60 bg-gradient-to-r from-red-700 via-red-600 to-red-500 text-white rounded-lg py-2 px-4'>
                Logout
            </button>
        </div>
    </div>
);

export default ProfilePage;
