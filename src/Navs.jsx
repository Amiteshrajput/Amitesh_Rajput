import React from 'react'
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Link,
    BrowserRouter
} from 'react-router-dom';
import Admin from './Components/Admin/Profile/Admin';
import LogIn from './Auth/LogIn';
import PremiumUser from './Components/PremiumUser/PremiumUser';
import LandingPage from './Components/LandingPage/LandingPage';
import NavBar from './Components/Navbar';



function Navs() {
  return (
    <BrowserRouter>
     <Routes>
        <Route path='/' element={<NavBar><LandingPage/></NavBar>}/>
        {/* <Route element= */}
        <Route path='/admin' element={<NavBar><LogIn /><Admin /></NavBar>}/>
        <Route path='/premiumUser' element={<NavBar><LogIn/><PremiumUser/></NavBar>}/>
     </Routes>
    </BrowserRouter>
  )
}

export default Navs