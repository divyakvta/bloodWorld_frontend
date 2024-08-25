
import { useEffect, useState } from 'react';
import Header from './header/Header'
import axios from 'axios';

interface User {
    name?: string;
    bloodGroup: string;
    city?: string;
    district: string;
    isActive?: boolean
}
function DonorList() {

    const [users, setUsers] = useState<User[]>([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterCriteria, setFilterCriteria] = useState<User>({
        bloodGroup: '',
        district: ''
    });



    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get('/api/users/get_users');
                setUsers(response.data);
            } catch (error) {
                console.log('Error fetching users:', error);
            }
        };
        fetchUsers();
    }, []);

    const filteredUsers = users.filter(user => {
        const searchLower = searchTerm.toLowerCase();
        return (
            (filterCriteria.bloodGroup ? user.bloodGroup === filterCriteria.bloodGroup : true) &&
            (filterCriteria.district ? user.district === filterCriteria.district : true) &&
            (!searchTerm ||
                (user.name && user.name.toLowerCase().includes(searchLower)) ||
                (user.bloodGroup && user.bloodGroup.toLowerCase().includes(searchLower)) ||
                (user.city && user.city.toLowerCase().includes(searchLower)) ||
                user.district.toLowerCase().includes(searchLower))
        );
    });

    return (
        <div>
            <Header />
            <div className='flex justify-center mb-4 space-x-2'>
                <div className="relative">
                    <input
                        type="text"
                        placeholder="Search"
                        className='border rounded pl-10 pr-4 py-2 mr-2'
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-4.35-4.35m1.2-5.45A7.5 7.5 0 1111 3a7.5 7.5 0 017.5 7.5z"></path>
                        </svg>
                    </div>
                </div>

                <select
                    className='border rounded p-2'
                    value={filterCriteria.bloodGroup}
                    onChange={(e) => setFilterCriteria({ ...filterCriteria, bloodGroup: e.target.value })}
                >
                    <option value=''>All Blood Groups</option>
                    <option value='A+'>A+</option>
                    <option value='A-'>A-</option>
                    <option value='B+'>B+</option>
                    <option value='B-'>B-</option>
                    <option value='AB+'>AB+</option>
                    <option value='AB-'>AB-</option>
                    <option value='O+'>O+</option>
                    <option value='O-'>O-</option>
                </select>

                <select
                    className='border rounded p-2'
                    value={filterCriteria.district}
                    onChange={(e) => setFilterCriteria({ ...filterCriteria, district: e.target.value })}
                >
                    <option value=''>All Districts</option>
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

                <button
                    onClick={() => setFilterCriteria({ bloodGroup: '', district: '' })}
                    className='bg-red-600 hover:bg-red-900 text-white font-bold py-2 px-4 rounded-lg'>
                    Clear Filters
                </button>
            </div>



            {/* Donor list container */}
            <div className='container w-1/2 min-h-screen mx-auto py-8 bg-gray-100 rounded-lg'>
                <div className='flex justify-center items-center'>
                    <h2 className='w-60 text-2xl text-center font-bold mb-4 bg-gradient-to-r from-red-800 via-red-600 to-red-500 p-1 rounded-full text-white'>
                        Donors List
                    </h2>
                </div>
                {filteredUsers.map((user, index) => (
                    <div className='flex justify-center' key={index}>
                        <div className=' w-full bg-white rounded-xl shadow p-4 m-5'>
                            <h3 className='text-xl font-semibold mb-2'>{user.name}</h3>
                            <p >Blood Group: {user.bloodGroup}</p>
                            <p >Location: {user.city}, {user.district}</p>
                            <p >
                                Status: {user.isActive ? 'Active' : 'Inactive'}
                            </p>
                            <div className='flex justify-end  space-x-2'>
                                <button className=' bg-green-600 hover:bg-green-900 text-white font-bold py-2 px-4 rounded-lg'>
                                    Chat
                                </button>
                                <button className='bg-green-600 hover:bg-green-900 text-white font-bold py-2 px-4 rounded-lg'>
                                    Call
                                </button>
                            </div>
                        </div>
                    </div>
                ))}

            </div>
        </div>
    );

}

export default DonorList