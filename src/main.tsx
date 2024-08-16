import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'
import Homepage from './pages/Homepage.tsx'
import Signuppage from './pages/Signuppage.tsx'
import Signinpage from './pages/Loginpage.tsx'
import OtpVerification from './components/OtpVarification.tsx'
import { persistor, store } from './redux/store.ts'
import { PersistGate } from 'redux-persist/integration/react'
import { Provider } from 'react-redux'
import Profilepage from './pages/Profilepage.tsx'



const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App />}>
      <Route index={true} path='/' element={<Homepage />} />
      <Route index={true} path='/register' element={<Signuppage />} />
      <Route index={true} path='/login' element={<Signinpage />} />
      <Route index={true} path='/otp_verify' element={<OtpVerification />} />
      <Route index={true} path='/home' element={<Homepage />} />
      <Route index={true} path='/profile' element={ <Profilepage />} />
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
