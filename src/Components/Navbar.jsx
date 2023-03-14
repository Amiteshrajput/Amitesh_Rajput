import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import {Link} from 'react-router-dom'
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../Contexts/UserContext';
import { useContext } from 'react';


const pages = [{page:'About',path:'/#about'},
 {page:'TESTIMONIALS',path:'/#testimonialss'},
{page: 'Achievements',path:'/achievements'},
{page:'Opportunity',path:'/#plan'},
{page:'Contact',path:'/#contact'},];

const adminPages = [{page:'Profile',path:'/admin/profile'}, 
// {page:'Account',path:'/admin/account'},
//  {page:'Dashboard',path:'/admin/dashboard'}
];

function NavBar({children}) {
   
  // let logged=JSON.parse(sessionStorage.getItem('isLogged'))
  // logged=logged?logged:false
  const [state,dispatch]=useContext(UserContext)
  //  const [loggedIn,setLoggedIn] = React.useState(false);
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const navigate=useNavigate()

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <>
    <AppBar position="fixed" style={{maxHeight:"80px",padding:"10px"}}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.1rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
           AMITESH RAJPUT
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { sm: 'block',xs:'block', md: 'none' },
              }}
            >
            
            {pages.map((page) => ( 
              <Button
                href={page.path}
                key={page.page}
                onClick={()=>{handleCloseNavMenu();}}
                sx={{ my: 2, color: 'blackgit', display: 'block' }}
              >
           {page.page} 
              </Button>
            ))}

            </Menu>
          </Box>
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            AMITESH RAJPUT
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => ( 
              <Button
                href={page.path}
                key={page.page}
                onClick={()=>{handleCloseNavMenu();}}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
           {page.page} 
              </Button>
            ))}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Amitesh Account">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Amitesh" src="https://scontent.flko10-1.fna.fbcdn.net/v/t1.6435-9/119685349_2686778961542435_3168716933277104531_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=174925&_nc_ohc=8B4qlmYlFHIAX9hvaJK&_nc_oc=AQkRInhhJTvlCs7814YL7lvG5HNrEwU9GMKfMGpj3nm641_W0URFi5YHIHmv9q_fLOI&_nc_ht=scontent.flko10-1.fna&oh=00_AfAcwYQyYkHNP06WAtOmijL-70atzQRnBYg5pVgbwjwvbQ&oe=63EB21BD" />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {adminPages.map((item) => (
                <MenuItem key={item.page} onClick={()=>navigate(item.path)}>
                  <Typography textAlign="center">{item.page}</Typography>
                </MenuItem>
              ))}
              
              <MenuItem>
                {state.admin?.loggedIn?
                <Button onClick={()=>{

                  setTimeout(()=>{
                    setTimeout(()=>{
                      setTimeout(()=>{
                        sessionStorage.removeItem('admin');
                      },0)
                      navigate(`/`)
                    },1000)
                    dispatch({type:'SET_ADMIN',payload:{loggedIn:false}});
                  },0)

                }}>Logout</Button>:
                <Button onClick={()=>navigate("/admin/auth")} variant='contained'>Login</Button>}
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
    {children}
    </>
  );
  
}
export default NavBar;