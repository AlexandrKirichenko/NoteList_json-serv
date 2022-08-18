import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import LoginIcon from '@mui/icons-material/Login';
import MenuIcon from '@mui/icons-material/Menu';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import Switch from '@mui/material/Switch';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';

export default function Header() {
  const [auth, setAuth] = React.useState(true);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAuth(event.target.checked);
  };

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar sx={{ bgcolor: 'primary.light' }}>
          {auth && (
            <div>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem onClick={handleClose}>Profile</MenuItem>
                <MenuItem onClick={handleClose}>My account</MenuItem>
              </Menu>
            </div>
          )}
          <Typography variant="h4" component="h4" sx={{ flexGrow: 1, alignItems: 'center' }}>
            Notes
          </Typography>
          {auth && (
            <FormGroup>
              <FormControlLabel
                control={<Switch checked={auth} onChange={handleChange} aria-label="login switch" />}
                label={
                  auth ? (
                    <Grid item>
                      <Link href="/" variant="body2">
                        Logout
                      </Link>
                    </Grid>
                  ) : (
                    'Login'
                  )
                }
              />
            </FormGroup>)
          }
        </Toolbar>
      </AppBar>
    </Box>
  );
}
//
// const Header = () => {
//   const [auth, setAuth] = React.useState(true);
//   const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
//
//   const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     setAuth(event.target.checked);
//   };
//
//   const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
//     setAnchorEl(event.currentTarget);
//   };
//
//   const handleClose = () => {
//     setAnchorEl(null);
//   };
//
//   return (
//     <Box sx={{ flexGrow: 1 }}>
//       <FormGroup>
//         <FormControlLabel
//           control={
//             <Switch
//               checked={auth}
//               onChange={handleChange}
//               aria-label="login switch"
//             />
//           }
//           label={auth ? 'Logout' : 'Login'}
//         />
//       </FormGroup>
//       <AppBar position="static">
//         <Toolbar>
//           <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
//             News
//           </Typography>
//           <IconButton
//             size="large"
//             edge="start"
//             color="inherit"
//             aria-label="menu"
//           >
//             <LoginIcon />
//           </IconButton>
//         </Toolbar>
//       </AppBar>
//     </Box>
//   );
// };
//
// export default Header;
