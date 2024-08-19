import { FaUser } from "react-icons/fa"
import Header from "./header/Header"
import { useEffect, useState } from "react"
import axios from "axios";
import { useSelector } from "react-redux";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from "react-router-dom";


interface UserData {
    name: string;
    phone: string;
    email: string;
    age: string;
    bloodGroup: string;
    city: string;
    district: string;
    lastDonated: string;
}

function EditProfile() {

    const { currentUser } = useSelector((state: any) => state.user)
    const [formData, setFormData] = useState<UserData>({
        name: '',
        phone: '',
        email: '',
        age: '',
        bloodGroup: '',
        city: '',
        district: '',
        lastDonated: ''
    });

    const navigate = useNavigate();

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await axios.get<UserData>(`/api/users/get_user/${currentUser._id}`);
                const user = response.data;

                setFormData({
                    name: user.name || '',
                    phone: user.phone || '',
                    email: user.email || '',
                    age: user.age || '',
                    bloodGroup: user.bloodGroup || '',
                    city: user.city || '',
                    district: user.district || '',
                    lastDonated: user.lastDonated || ''
                })

            }catch (error) {
                console.error('Error fetching user data', error);
            }
        }
        fetchUserData();
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
             await axios.put(`/api/users/update_user/${currentUser._id}`, formData);
              toast.success('Profile updated succesfully');
              setTimeout(() => {
                navigate('/profile')
              }, 2000)
        }catch (error) {
            console.log('Error updating profile', error);
            toast.error('Failed to update. Please try again');
        }
    };


  return (
    <div>
        <Header />
        <ToastContainer />
        <div className="min-h-screen flex  bg-gray-100 py-12">
            <div className=" container mx-auto max-w-4xl bg-white shadow-lg rounded-lg p-8 ">
                <div className="flex justify-between items-center mb-8 w-full bg-gradient-to-r from-red-700 via-red-600 to-red-500 rounded-lg p-5">
                    <h1 className="text-2xl font-semibold text-white px-8  ">
                        Edit user details
                    </h1>
                    <FaUser className="text-4xl" />
                </div>
                <form className="space-y-8" onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-gray-600">Name</label>
                            <div className="flex gap-4">
                                <input type="text" 
                                name="name"  
                                value={formData.name} 
                                onChange={handleChange} 
                                placeholder="Name" 
                                className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-red-500" />
                            </div>
                        </div>
                        <div>
                            <label className="block text-gray-600">Age</label>
                            <input type="text" 
                            name="age"  
                            value={formData.age} 
                            onChange={handleChange} 
                            placeholder="Age" 
                            className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-red-500" />
                        </div>
                        <div>
                            <label className="block text-gray-600">Blood Group</label>
                            <input type="text" 
                            name="bloodGroup"  
                            value={formData.bloodGroup} 
                            onChange={handleChange} 
                            className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-red-500" />
                        </div>

                        <div>
                            <label className="block text-gray-600">Phone Number</label>
                            <input type="text"
                            name="phoneNumber"  
                            value={formData.phone} 
                            onChange={handleChange}  
                            className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-red-500" />
                        </div>

                        <div>
                            <label className="block text-gray-600">Email</label>
                            <input type="email" 
                            name="email"  
                            value={formData.email} 
                            onChange={handleChange} 
                            className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-red-500" />
                        </div>       

                        <div>
                            <label className="block text-gray-600">City</label>
                            <input type="text" 
                            name="city"  
                            value={formData.city} 
                            onChange={handleChange} 
                            className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-red-500" />
                        </div>

                        <div>
                            <label className="block text-gray-600">District</label>
                            <input type="text"
                            name="district"  
                            value={formData.district} 
                            onChange={handleChange}  
                            className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-red-500" />
                        </div>
                        <div>
                            <label className="block text-gray-600">Last Donation</label>
                            <input type="date" 
                            name="lastDonation"  
                            value={formData.lastDonated} 
                            onChange={handleChange} 
                            className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-red-500" />
                        </div>
                    </div>

                    {/* Submit Button */}
                    <div className="flex justify-end mt-6">
                        <button
                            type="submit"
                            className="flex items-center justify-center w-40 p-3 text-white bg-gradient-to-r from-red-700 via-red-600 to-red-500 rounded-lg shadow-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
                        >
                            Submit
                            <FaUser className="ml-2" />
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </div>
  )
}

export default EditProfile