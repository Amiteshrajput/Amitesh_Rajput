import React from 'react'
import {
    BrowserRouter,
    Routes,
    Route,
    Outlet,
    Navigate
} from 'react-router-dom';
import LogIn from './Auth/LogIn';
import PremiumUser from './Components/PremiumUser/PremiumUser';
import LandingPage from './Components/LandingPage/LandingPage';
import NavBar from './Components/Navbar';
import AdminProfile from './Components/Admin/Profile/Admin';
import AdminAccount from './Components/Admin/Account/AdminAccount';
import AdminDashboard from './Components/Admin/Dashboard/AdminDashboard';
import Contact from './Components/LandingPage/contact/Contact';
import Intro from './Components/LandingPage/intro/Intro';
import { UserContext } from './Contexts/UserContext';
import { useContext } from 'react';
import Achievements from './Components/LandingPage/Achievements/Achievements';
import PLANS from './Components/LandingPage/PLANS/PLANS';



function Navs() {
  const [state,dispatch]=useContext(UserContext)
  // const admin=JSON.parse(sessionStorage.getItem('admin'))
  const premiumUser=JSON.parse(localStorage.getItem('premiumUser'))

  const AdminProtectedRoutes=()=>{
    if(state.admin?.uid){
      console.log('hio',state.admin)
      return <Outlet/>
    }
    else{
      return <Navigate to='/admin/auth'/>
    }
    // return <Navigate to='/'/>
  }

  const PremiumUserProtectedRoutes=()=>{
    if(premiumUser){
      return <Outlet/>
    }
    else{
      return <Navigate to='/premiumUser/auth'/>
    }
    // return <Navigate to='/'/>
  }

  return (

    <BrowserRouter>
    
     <Routes>

        <Route path='/' element={<NavBar><br/><br/><br/><LandingPage/></NavBar>}/>
        <Route path='/plan' element={<NavBar><br/><br/><br/><PLANS/></NavBar>}/>

        <Route path='/admin/auth' element={<NavBar><br/><br/><br/><LogIn type='admin'/></NavBar>}/>

        <Route path='/premiumUser/auth' element={<NavBar><br/><br/><br/><LogIn type='premiumUser'/></NavBar>}/>

        <Route path='/achievements' element={<NavBar><br/><br/><br/><Achievements/></NavBar>}/>

        <Route element={<AdminProtectedRoutes/>}>

          <Route path='/admin/profile' element={<NavBar><br/><br/><br/><br/><AdminProfile/></NavBar>}/>
          <Route path='/admin/account' element={<NavBar><br/><br/><br/><AdminAccount/></NavBar>}/>
          <Route path='/admin/dashboard' element={<NavBar><br/><br/><br/><AdminDashboard/></NavBar>}/>

        </Route>

        <Route element={<PremiumUserProtectedRoutes/>}>
          <Route path='/premiumUser' element={<NavBar><br/><br/><br/><PremiumUser/></NavBar>}/>
        </Route>

     </Routes>
    </BrowserRouter>
  )
}
export default Navs