import { useEffect, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { FaBell, FaTimes, FaUser } from "react-icons/fa";
import { useDispatch, useSelector } from 'react-redux';
import { RiLogoutBoxLine } from "react-icons/ri";
import { signoutSuccess } from '../../../redux/userSlice';
import axios from 'axios';



interface UserData {
  name: string;
  role: string;
  age: number;
  bloodGroup: string;
  email: string;
  phone: string;
  city: string;
  district: string;
  isActive: boolean;
  lastDonated: number;
  nextDonation: number;
}

const activeClassName = "selected navlink";
const activeStyleCallback = ({ isActive }: { isActive: boolean }): string => (
  isActive ? activeClassName : "navlink"
);

const NavLinks = () => {
  const navigate = useNavigate();
  const { currentUser } = useSelector((state: any) => state.user);
  const [showOptions, setShowOptions] = useState<boolean>(false);
  const [userData, setUserData] = useState<UserData | null>(null);
  const [showNotification, setShowNotification] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchUserData = async () => {
      if (currentUser && currentUser._id) {  
        try {
          const response = await axios.get(`/api/users/get_user/${currentUser._id}`);
          setUserData(response.data);
        } catch (error) {
          console.error('Error fetching user data', error);
        }
      }
    };
    fetchUserData();
  }, [currentUser]);

  const isDonationApproaching = () => {
    if (!userData?.nextDonation) {
      return false;
    }

    const currentDate = new Date().getTime();
    const nextDonationDate = new Date(userData.nextDonation).getTime();
    const daysDifference = Math.ceil((nextDonationDate - currentDate) / (1000 * 60 * 60 * 24));
    return daysDifference <= 7;
  };

  const handleLogOut = () => {
    dispatch(signoutSuccess());
    navigate("/login");
  };

  return (
    <div className="flex justify-center font-semibold text-xl space-x-20 ">
      <NavLink to="/home" className={activeStyleCallback}>Home</NavLink>
      <NavLink to="/about" className={activeStyleCallback}>About</NavLink>
      <NavLink to="/search_donor" className={activeStyleCallback}>Find Blood</NavLink>
      {
        !currentUser ? (
          <NavLink to="/register" className={activeStyleCallback}>Register</NavLink>
        ) : (
          <div className="flex flex-col items-center relative">
            <div className="relative">
              <FaUser className='text-2xl cursor-pointer hover:text-red-500' onClick={() => setShowOptions(!showOptions)} />
              {isDonationApproaching() && (
                <button
                  onClick={() => setShowNotification(!showNotification)}
                  className='absolute top-0 right-0 transform translate-x-3 -translate-y-3 text-red focus:outline-none'
                >
                  <FaBell className='text-xl text-red-500' />
                </button>
              )}
            </div>
            {showOptions && (
              <div className="flex flex-col justify-center w-40 absolute top-8 right-0 bg-white shadow-lg rounded-lg p-5">
              <button
              className="absolute top-2 right-2 text-gray-600 hover:text-red-500 focus:outline-none"
              onClick={() => setShowOptions(false)} 
            >
              <FaTimes className="text-lg" />
            </button>
                <ul className="space-y-4">
                  <li className="text-center font-semibold text-lg cursor-pointer hover:text-red-500">{currentUser.name}</li>
                  <li className="text-center cursor-pointer hover:text-red-500">
                    <NavLink to="/profile" className="block w-full h-full">Profile</NavLink>
                  </li>
                  <li>
                    <div className="flex hover:text-red-500 gap-2 justify-center items-center cursor-pointer">
                      <RiLogoutBoxLine className="text-xl" />
                      <p className="text-sm" onClick={handleLogOut}>Logout</p>
                    </div>
                  </li>
                </ul>
              </div>
            )}
            {showNotification && (
              <div className='absolute right-0 top-12 mt-2 w-64 bg-white border border-gray-300 rounded-lg shadow-lg z-10'>
                <button
              className="absolute top-2 right-2 text-gray-600 hover:text-red-500 focus:outline-none"
              onClick={() => setShowNotification(false)} 
            >
              <FaTimes className="text-lg" />
            </button>
                <h3 className='p-4 text-gray-700 text-sm font-medium'>Next Donation Reminder</h3>
                <p className='p-4 text-sm text-gray-600'>
                  Your next donation date is on {userData ? new Date(userData.nextDonation).toLocaleDateString() : 'N/A'}.
                </p>
              </div>
            )}
          </div>
        )
      }
    </div>
  );
};

function Nav() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <nav className='flex w-full justify-between items-center p-4'>
        <div className='hidden md:flex w-full justify-end space-x-4'>
          <NavLinks />
        </div>
        <div className='md:hidden flex justify-end w-full'>
          <button onClick={toggleNavbar} className="text-2xl">
            {isOpen ? <X /> : <Menu />}
          </button>
        </div>
      </nav>
      {isOpen && (
        <div className='flex flex-col items-center w-full space-y-4 md:hidden'>
          <NavLinks />
        </div>
      )}
    </>
  );
}

export default Nav;
