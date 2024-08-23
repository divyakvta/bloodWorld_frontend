
import { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { Menu, X } from 'lucide-react'
import { FaUser } from "react-icons/fa";
import { useDispatch, useSelector } from 'react-redux';
import { RiLogoutBoxLine } from "react-icons/ri";
import { signoutSuccess } from '../../redux/userSlice';




const activeClassName = "selected navlink";
const activeStyleCallback = ({ isActive }: { isActive: boolean }): string => (
  isActive ? activeClassName : "navlink"
);

const NavLinks = () => {
  const navigate = useNavigate()
  const { currentUser } = useSelector((state: any) => state.user);
  const [showoption, setShowOptions] = useState<boolean>(false);
  const dispatch = useDispatch();

  const handleLogOut = () => {
    dispatch(signoutSuccess());
    navigate("/login")

  }

  
  return (
    <>
      <NavLink to="/home" className={activeStyleCallback}>Home</NavLink>
      <NavLink to="/about" className={activeStyleCallback}>About</NavLink>
      <NavLink to="/search_donor" className={activeStyleCallback}>Find Blood</NavLink>
      {
        !currentUser ? <NavLink to="/register" className={activeStyleCallback}>Register</NavLink> : <div className="flex flex-col justify-center items-center relative">
          <FaUser className='text-2xl mr-8 cursor-pointer  hover:text-red-500' onClick={() => setShowOptions(!showoption)} />

          {
            showoption &&
            <div className="flex flex-col justify-center w-50 h-50 absolute top-6 right-7 bg-white shadow-lg rounded-lg p-5">
              <ul className="space-y-4">
                <li className="text-center font-semibold text-lg cursor-pointer hover:text-red-500">{currentUser.name}</li>
                <li className="text-center cursor-pointer hover:text-red-500">
                  <a href="/profile" className="block w-full h-full">Profile</a>
                </li>
                <li>
                  <div className="flex hover:text-red-500  gap-2 justify-center items-center cursor-pointer">
                    <RiLogoutBoxLine className="text-xl" />
                    <p className="text-sm" onClick={handleLogOut}>Logout</p>
                  </div>
                </li>
              </ul>
            </div>
          }
        </div>
      }
    </>
  )
}



function Nav() {
  const [isOpen, setIsOpen] = useState(false)

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <nav className='flex w-1/3 justify-end'>
        <div className='hidden w-full justify-between font-bold uppercase md:flex'>
          <NavLinks />
        </div>
        <div className='md:hidden'>
          <button onClick={toggleNavbar}>{isOpen ? <X /> : <Menu />}
          </button>
        </div>
      </nav>
      {isOpen && (
        <div className='flex basis-full flex-col items-center'>
          <NavLinks />
        </div>
      )}
    </>
  )
}

export default Nav