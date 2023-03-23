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
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../Contexts/UserContext';
import { useContext } from 'react';
import amiteshpic from "./LandingPage/assets/amitesh.jpg"


const pages = [{page:'About',path:'/#about'},
 {page:'TESTIMONIALS',path:'/#testimonials'},
{page: 'Achievements',path:'/achievements'},
{page:'Opportunity',path:'/#plan'},
{page:'Contact',path:'/#contact'},];

const adminPages = [{page:'Profile',path:'/admin/profile'}, 

];

function NavBar({children}) {
   
  
  const [state,dispatch]=useContext(UserContext)
  
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
                <Avatar alt="Amitesh" src={amiteshpic } />
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