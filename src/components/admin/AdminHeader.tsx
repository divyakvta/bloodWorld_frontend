import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faUsers, faUserFriends, faImages, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';

function AdminHeader() {
    const navigate = useNavigate()

    const handleLogout = ()=>{
        try {
            navigate('/admin_login')
        } catch (error) {
            console.log(error)
        }
    }

  return (
    <aside className="w-full md:w-1/4 lg:w-1/5 bg-gradient-to-r from-red-700 via-red-600 to-red-500 text-white text-lg font-medium flex flex-col justify-between">
    <div>
      <div className="flex items-center justify-center p-10">
        <img src="logo.png" alt="Logo" className="w-12 h-12 rounded-full" />
      </div>
      <nav className="flex flex-col p-10 space-y-4 ">
        <a href="/admin" className="flex items-center space-x-2 hover:bg-red-600 p-2 rounded">
          <FontAwesomeIcon icon={faHome} />
          <span>Dashboard</span>
        </a>
        <a href="/admin/donors_list" className="flex items-center space-x-2 hover:bg-red-600 p-2 rounded">
          <FontAwesomeIcon icon={faUsers} />
          <span>Donors</span>
        </a>
        <a href="/admin/recipients_list" className="flex items-center space-x-2 hover:bg-red-600 p-2 rounded">
          <FontAwesomeIcon icon={faUserFriends} />
          <span>Recipients</span>
        </a>
        <a href="#" className="flex items-center space-x-2 hover:bg-red-600 p-2 rounded">
          <FontAwesomeIcon icon={faImages} />
          <span>Posters</span>
        </a>
      </nav>
    </div>
    <div className="p-10">
      <button onClick={handleLogout} className="flex items-center space-x-2 hover:bg-red-600 p-2 rounded">
        <FontAwesomeIcon icon={faSignOutAlt} />
        <span>Log out</span>
      </button>
    </div>
  </aside>
);
}

export default AdminHeader;