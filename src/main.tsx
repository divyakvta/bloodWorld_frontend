import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'
import Homepage from './pages/Homepage.tsx'
import Signuppage from './pages/Signuppage.tsx'
import OtpVerification from './components/user/OtpVarification.tsx'
import { persistor, store } from './redux/store.ts'
import { PersistGate } from 'redux-persist/integration/react'
import { Provider } from 'react-redux'
import Profilepage from './pages/Profilepage.tsx'
import EditProfile from './components/user/EditProfile.tsx'
import DonorList from './components/user/DonorList.tsx'
import AdminDashboard from './pages/AdminDashboard.tsx'
import Login from './components/user/Login.tsx'
import DonorListPage from './pages/DonorListPage.tsx'
import AdminLogin from './components/admin/AdminLogin.tsx'
import RecipientListPage from './pages/RecipientListPage.tsx'
import PosterPage from './pages/PosterPage.tsx'
import AboutPage from './pages/AboutPage.tsx'
import Schedule from './components/user/Schedule.tsx'

import Response from './components/user/Response.tsx'
import Chat from './components/user/Chat.tsx'




const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App />}>
      <Route index={true} path='/' element={<Homepage />} />
      <Route index={true} path='/register' element={<Signuppage />} />
      <Route index={true} path='/login' element={<Login />} />
      <Route index={true} path='/about' element={<AboutPage />} />
      <Route index={true} path='/otp_verify' element={<OtpVerification />} />
      <Route index={true} path='/home' element={<Homepage />} />
      <Route index={true} path='/profile' element={ <Profilepage />} />
      <Route index={true} path='/editProfile' element={ <EditProfile />}/>
      <Route index={true} path='/search_donor' element={ <DonorList />}/>
      <Route index={true} path='/schedule-donation/:userId' element={ <Schedule />}/>
      <Route index={true} path='/chat/:userId' element={ <Chat />}/>
      <Route path="/schedule-response" element={<Response />} />

      {/* Admin Routes */}
      <Route index={true} path='/admin' element={<AdminLogin />} />
      <Route index={true} path='/admin_dash' element={<AdminDashboard />} />
      <Route index={true} path='/admin/donors_list' element={<DonorListPage />} />
      <Route index={true} path='/admin/recipients_list' element={<RecipientListPage />} />
      <Route index={true} path='/admin/poster' element={<PosterPage />} />
    </Route>
    
  )
)

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <PersistGate persistor={persistor}>
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    </PersistGate>
  </React.StrictMode>,
)
