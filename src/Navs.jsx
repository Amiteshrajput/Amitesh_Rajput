import React from 'react'
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Link,
    BrowserRouter
} from 'react-router-dom';
import App from './App';
import Admin from './Components/Admin/Admin';
import LogIn from './Auth/LogIn';
import PremiumUser from './Components/PremiumUser/PremiumUser';



function Navs() {
  return (
    <BrowserRouter>
     <Routes>
        <Route path='/' element={<App/>}/>
        <Route path='/admin' element={<><LogIn/><Admin/></>}/>
        <Route path='/premiumUser' element={<><LogIn/><PremiumUser/></>}/>
     </Routes>
    </BrowserRouter>
  )
}

export default Navs