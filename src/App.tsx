
import { Toaster } from 'react-hot-toast'
import { Outlet } from 'react-router-dom'


function App() {
  return (
    <div className='App'>
      <Toaster />
      <Outlet />
      
      </div>
  )
}

export default App