import React from 'react'
import {
    BrowserRouter,
    Routes,
    Route,
    Link,
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
import PhotoGallary from './Components/LandingPage/PhotoGallary/PhotoGallary';



function Navs() {
  const AdminProtectedRoutes=()=>{
    return <Outlet/>
    // return <Navigate to='/'/>
  }

  const PremiumUserProtectedRoutes=()=>{
    return <Outlet/>
    // return <Navigate to='/'/>
  }

  return (

    <BrowserRouter>
    
     <Routes>

        <Route path='/' element={<NavBar><br/><br/><br/><LandingPage/></NavBar>}/>

        <Route path='/gallery'element={<NavBar><br/><br/><br/><PhotoGallary/></NavBar>} />


        <Route path='/admin/auth' element={<NavBar><br/><br/><br/><LogIn type='Admin'/></NavBar>}/>

        <Route path='/premiumUser/auth' element={<NavBar><br/><br/><br/><LogIn type='PremiumUser'/></NavBar>}/>

        <Route element={<AdminProtectedRoutes/>}>

          <Route path='/admin/profile' element={<NavBar><br/><br/><br/><br/><AdminProfile/></NavBar>}/>
          <Route path='/admin/account' element={<NavBar><br/><br/><br/><AdminAccount/></NavBar>}/>
          <Route path='/admin/dashboard' element={<NavBar><br/><br/><br/><AdminDashboard/></NavBar>}/>

        <Route path='/admin/profile' element={<NavBar><br/><br/><br/><AdminProfile/></NavBar>}/>
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